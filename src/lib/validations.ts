import { z } from "zod";
import { PROPOSAL_LIMITS } from "./constants";

/**
 * Normalise email: lowercase and trim.
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Normalise GitHub username: lowercase, trim, strip leading @.
 */
export function normalizeGithub(username: string): string {
  return username.trim().replace(/^@+/, "").toLowerCase();
}

/**
 * Normalise phone number to standard international format (e.g. +91XXXXXXXXXX for Indian numbers).
 */
export function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, "").trim();
  if (!cleaned) return "";

  // If already starts with +, clean internal non-digits
  if (cleaned.startsWith("+")) {
    const digits = cleaned.slice(1).replace(/\D/g, "");
    return `+${digits}`;
  }

  // If 10 digits starting with 6-9, assume Indian standard mobile
  if (/^[6-9]\d{9}$/.test(cleaned)) {
    return `+91${cleaned}`;
  }

  // If 12 digits starting with 91 and standard mobile
  if (/^91[6-9]\d{9}$/.test(cleaned)) {
    return `+${cleaned}`;
  }

  // If 11 digits starting with 0
  if (/^0[6-9]\d{9}$/.test(cleaned)) {
    return `+91${cleaned.slice(1)}`;
  }

  return `+${cleaned}`;
}

export const GithubUsernameSchema = z
  .string()
  .min(1, "GitHub username is required")
  .max(39, "GitHub username must be at most 39 characters")
  .regex(/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/, "Invalid GitHub username format");

export const PhoneSchema = z
  .string()
  .min(7, "Phone number is too short")
  .max(20, "Phone number is too long")
  .refine((val) => {
    const normalized = normalizePhone(val);
    return /^\+[1-9]\d{6,14}$/.test(normalized);
  }, "Invalid phone number format. Include country code or a valid 10-digit Indian mobile.");

export const EmailSchema = z
  .string()
  .email("Invalid email address")
  .max(254, "Email address is too long");

export const ParticipantInputSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100),
  email: EmailSchema,
  phone: PhoneSchema,
  college: z.string().trim().min(2, "College/Organisation must be at least 2 characters").max(150),
  githubUsername: GithubUsernameSchema,
  role: z.enum(["LEADER", "MEMBER"]).default("MEMBER"),
  sortOrder: z.number().int().min(0).max(4).default(0),
});

export const RegistrationSubmitSchema = z.object({
  type: z.enum(["SOLO", "SQUAD"]),
  teamName: z
    .string()
    .trim()
    .min(2, "Team name must be at least 2 characters")
    .max(80, "Team name must be at most 80 characters"),
  projectTitle: z.string().trim().min(3, "Project title must be at least 3 characters").max(120),
  techStack: z.string().trim().min(2, "Tech stack must be at least 2 characters").max(200),
  problemStatement: z.string().trim().min(10, "Problem statement must be at least 10 characters").max(4000),
  existingCodeDisclosure: z.string().trim().min(1, "Please provide existing code disclosure ('None' if scratch)").max(2500),
  aiUsageDisclosure: z.string().trim().min(1, "Please declare AI usage").max(2500),
  transactionReference: z.string().trim().max(100).optional().nullable(),
  proposalFileId: z.string().uuid().optional().nullable(),
  proposal: z.object({
    storageKey: z
      .string()
      .trim()
      .regex(/^proposals\/uploads\/[a-f0-9]{32,64}\.(pdf|pptx)$/i, "Invalid proposal storage key format"),
    originalName: z.string().trim().min(1).max(255),
  }).optional().nullable(),
  idempotencyKey: z.string().trim().min(8).max(128).optional().nullable(),
  participants: z.array(ParticipantInputSchema),
}).superRefine((data, ctx) => {
  // Validate team name for both Solo and Squad entries
  if (!data.teamName || data.teamName.trim().length < 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["teamName"],
      message: "Team name is required (at least 2 characters)",
    });
  }

  if (data.type === "SOLO") {
    if (data.participants.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["participants"],
        message: "Solo registration must have exactly 1 participant",
      });
    }
  } else {
    if (data.participants.length < 2 || data.participants.length > 4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["participants"],
        message: "Squad registration must have between 2 and 4 participants",
      });
    }
  }

  // Check intra-registration duplicates
  const emails = new Set<string>();
  const phones = new Set<string>();
  const githubs = new Set<string>();

  data.participants.forEach((p, idx) => {
    const normEmail = normalizeEmail(p.email);
    const normPhone = normalizePhone(p.phone);
    const normGithub = normalizeGithub(p.githubUsername);

    if (emails.has(normEmail)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["participants", idx, "email"],
        message: `Email '${p.email}' is duplicated within this registration`,
      });
    }
    emails.add(normEmail);

    if (phones.has(normPhone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["participants", idx, "phone"],
        message: `Phone number is duplicated within this registration`,
      });
    }
    phones.add(normPhone);

    if (githubs.has(normGithub)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["participants", idx, "githubUsername"],
        message: `GitHub username '${p.githubUsername}' is duplicated within this registration`,
      });
    }
    githubs.add(normGithub);
  });
});

export const DraftSaveSchema = z.object({
  type: z.enum(["SOLO", "SQUAD"]).optional(),
  teamName: z.string().trim().max(80).optional().nullable(),
  projectTitle: z.string().trim().max(120).optional().nullable(),
  techStack: z.string().trim().max(200).optional().nullable(),
  problemStatement: z.string().trim().max(4000).optional().nullable(),
  existingCodeDisclosure: z.string().trim().max(2500).optional().nullable(),
  aiUsageDisclosure: z.string().trim().max(2500).optional().nullable(),
  transactionReference: z.string().trim().max(100).optional().nullable(),
  draftStep: z.number().int().min(1).max(5).optional(),
  participants: z.array(
    z.object({
      fullName: z.string().trim().max(100).optional().nullable(),
      email: z.string().trim().max(254).optional().nullable(),
      phone: z.string().trim().max(30).optional().nullable(),
      college: z.string().trim().max(150).optional().nullable(),
      githubUsername: z.string().trim().max(50).optional().nullable(),
      role: z.enum(["LEADER", "MEMBER"]).optional(),
      sortOrder: z.number().int().min(0).max(4).optional(),
    })
  ).optional(),
});

export const AdminLoginSchema = z.object({
  secret: z.string().min(1, "Password is required"),
});

export const AdminPaymentVerifySchema = z.object({
  verifiedBy: z.string().trim().max(100).optional(),
  note: z.string().trim().max(1000).optional(),
});

export const AdminPaymentRejectSchema = z.object({
  note: z.string().trim().max(1000).optional(),
});

export const UploadUrlRequestSchema = z.object({
  filename: z
    .string()
    .trim()
    .min(1, "Filename is required")
    .max(255, "Filename is too long")
    .refine((name) => !name.includes("\0") && !name.includes(".."), "Invalid filename"),
  mimeType: z.string().trim().max(100).optional(),
  sizeBytes: z
    .number()
    .int()
    .positive("File size must be positive")
    .max(PROPOSAL_LIMITS.MAX_FILE_BYTES, "File exceeds 5 MB limit")
    .optional(),
});
