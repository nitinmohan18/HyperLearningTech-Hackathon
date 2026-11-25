import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { PROPOSAL_LIMITS } from "./constants";

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  mimeType?: string;
  pageCount?: number;
}

/**
 * Validates actual binary contents of uploaded proposal file.
 * Rejects empty files, files > 5MB, files with mismatched headers,
 * and files with > 7 pages/slides.
 */
export async function validateProposalBuffer(buffer: Buffer): Promise<FileValidationResult> {
  if (!buffer || buffer.length === 0) {
    return { valid: false, error: "File is empty" };
  }

  if (buffer.length > PROPOSAL_LIMITS.MAX_FILE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 5 MB limit (${(buffer.length / (1024 * 1024)).toFixed(2)} MB)`,
    };
  }

  // Check file signature / magic numbers
  const isPdf = buffer.length >= 4 && buffer.subarray(0, 4).toString("ascii") === "%PDF";
  const isZip = buffer.length >= 4 && buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04;

  if (isPdf) {
    try {
      const pdfDoc = await PDFDocument.load(buffer, {
        ignoreEncryption: true,
        updateMetadata: false,
      });

      const pageCount = pdfDoc.getPageCount();

      if (pageCount === 0) {
        return { valid: false, error: "PDF has 0 pages or could not be parsed" };
      }

      if (pageCount > PROPOSAL_LIMITS.MAX_PAGES) {
        return {
          valid: false,
          error: `PDF exceeds the maximum limit of ${PROPOSAL_LIMITS.MAX_PAGES} pages (contains ${pageCount} pages)`,
          pageCount,
        };
      }

      return {
        valid: true,
        mimeType: "application/pdf",
        pageCount,
      };
    } catch (err) {
      return {
        valid: false,
        error: "Malformed or corrupted PDF file",
      };
    }
  }

  if (isZip) {
    try {
      const zip = await JSZip.loadAsync(buffer);

      // Verify it's genuinely a PPTX archive
      const pptFolder = zip.folder("ppt");
      const slidesFolder = zip.folder("ppt/slides");

      if (!pptFolder || !slidesFolder) {
        return {
          valid: false,
          error: "Invalid presentation file. Must be a valid PowerPoint (.pptx) deck.",
        };
      }

      // Count slide files matching ppt/slides/slide*.xml
      let slideCount = 0;
      slidesFolder.forEach((relativePath) => {
        if (/^slide\d+\.xml$/i.test(relativePath)) {
          slideCount++;
        }
      });

      if (slideCount === 0) {
        return { valid: false, error: "Presentation contains 0 slides" };
      }

      if (slideCount > PROPOSAL_LIMITS.MAX_PAGES) {
        return {
          valid: false,
          error: `Presentation exceeds the maximum limit of ${PROPOSAL_LIMITS.MAX_PAGES} slides (contains ${slideCount} slides)`,
          pageCount: slideCount,
        };
      }

      return {
        valid: true,
        mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        pageCount: slideCount,
      };
    } catch (err) {
      return {
        valid: false,
        error: "Malformed or corrupted PowerPoint (.pptx) file",
      };
    }
  }

  return {
    valid: false,
    error: "Unsupported file type. Please upload a valid PDF (.pdf) or PowerPoint (.pptx) file.",
  };
}
