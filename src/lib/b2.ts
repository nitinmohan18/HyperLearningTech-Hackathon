import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Creates and returns an S3Client configured for Backblaze B2.
 * Backblaze B2 provides standard S3 API compatibility with SigV4 authentication.
 */
export function getB2Client(): S3Client {
  const keyId =
    process.env.B2_APPLICATION_KEY_ID ||
    process.env.B2_KEY_ID ||
    process.env.R2_ACCESS_KEY_ID;
  const applicationKey =
    process.env.B2_APPLICATION_KEY ||
    process.env.B2_SECRET_ACCESS_KEY ||
    process.env.R2_SECRET_ACCESS_KEY;

  let endpoint = process.env.B2_ENDPOINT || process.env.R2_ENDPOINT;
  let region = process.env.B2_REGION;

  // If endpoint is not provided, derive it from region
  if (!endpoint && region) {
    endpoint = `https://s3.${region}.backblazeb2.com`;
  } else if (endpoint && !region) {
    // If endpoint is provided (e.g., https://s3.us-east-005.backblazeb2.com), extract region
    const match = endpoint.match(/s3\.([a-z0-9-]+)\.backblazeb2\.com/i);
    if (match) {
      region = match[1];
    }
  }

  // Fallback region if not parsed
  region = region || "us-east-005";

  if (!keyId || !applicationKey || !endpoint) {
    throw new Error(
      "Backblaze B2 is not configured. Missing B2_APPLICATION_KEY_ID, B2_APPLICATION_KEY, or B2_ENDPOINT/B2_REGION."
    );
  }

  return new S3Client({
    region,
    endpoint,
    credentials: {
      accessKeyId: keyId,
      secretAccessKey: applicationKey,
    },
    // Backblaze B2 S3 compatibility: Do not pass custom ACLs unless explicitly supported
  });
}

export function getB2BucketName(): string {
  const bucket = process.env.B2_BUCKET_NAME || process.env.R2_BUCKET_NAME;
  if (!bucket) {
    throw new Error("B2_BUCKET_NAME environment variable is not configured.");
  }
  return bucket;
}

/**
 * Generate a short-lived presigned PUT URL for direct browser upload to Backblaze B2.
 * Note: Backblaze B2 does not require or recommend S3 ACL headers (e.g. x-amz-acl: private).
 * We omit ACL to ensure 100% compatibility across all B2 bucket configurations.
 */
export async function getPresignedUploadUrl(
  storageKey: string,
  mimeType: string,
  expiresInSeconds = 300
): Promise<string> {
  const s3 = getB2Client();
  const bucket = getB2BucketName();

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: storageKey,
    ContentType: mimeType,
  });

  return getSignedUrl(s3, command, { expiresIn: expiresInSeconds });
}

/**
 * Generate a short-lived presigned GET URL for downloading proposals securely.
 * Applies attachment Content-Disposition with the original filename.
 */
export async function getPresignedDownloadUrl(
  storageKey: string,
  filename: string,
  expiresInSeconds = 300
): Promise<string> {
  const s3 = getB2Client();
  const bucket = getB2BucketName();

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: storageKey,
    ResponseContentDisposition: `attachment; filename="${encodeURIComponent(filename)}"`,
  });

  return getSignedUrl(s3, command, { expiresIn: expiresInSeconds });
}

/**
 * Retrieve object metadata from Backblaze B2 to verify file existence and size.
 */
export async function getObjectMetadata(storageKey: string) {
  const s3 = getB2Client();
  const bucket = getB2BucketName();

  const command = new HeadObjectCommand({
    Bucket: bucket,
    Key: storageKey,
  });

  return s3.send(command);
}

/**
 * Download object buffer server-side to validate file signatures and page/slide count.
 */
export async function getObjectBuffer(storageKey: string): Promise<Buffer> {
  const s3 = getB2Client();
  const bucket = getB2BucketName();

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: storageKey,
  });

  const response = await s3.send(command);
  const stream = response.Body;
  if (!stream) {
    throw new Error("Empty body received from storage");
  }

  const chunks: Uint8Array[] = [];
  for await (const chunk of stream as any) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

/**
 * Delete object from Backblaze B2 (e.g. on rejection, replacement, or draft cancellation).
 * Guarded to ensure only files under proposals/ are deleted.
 */
export async function deleteObject(storageKey: string): Promise<void> {
  if (!storageKey || typeof storageKey !== "string" || !storageKey.startsWith("proposals/")) {
    console.warn("deleteObject ignored: storageKey outside proposals/ prefix:", storageKey);
    return;
  }
  try {
    const s3 = getB2Client();
    const bucket = getB2BucketName();
    await s3.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: storageKey,
      })
    );
  } catch (error) {
    console.error("Failed to delete B2 object:", error instanceof Error ? error.message : "unknown");
  }
}

// Aliases for seamless drop-in backwards compatibility with existing codebase
export const getR2Client = getB2Client;
export const getR2BucketName = getB2BucketName;
