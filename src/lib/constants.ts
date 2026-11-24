export const EVENT_DETAILS = {
  name: "HyperLearningTech Winter Hackathon '26",
  dates: "26–27 December 2026",
  duration: "24 Hours",
  registrationDeadline: "25 December 2026",
  soloFeePaise: 9900, // ₹99
  squadFeePaise: 20000, // ₹200
  soloFeeFormatted: "₹99",
  squadFeeFormatted: "₹200",
  minSquadSize: 2,
  maxSquadSize: 4,
} as const;

export const COOKIE_NAMES = {
  DRAFT_TOKEN: "hlt_draft_token",
  ADMIN_SESSION: "hlt_admin_session",
} as const;

export const PROPOSAL_LIMITS = {
  MAX_FILE_BYTES: 5 * 1024 * 1024, // 5MB
  MAX_PAGES: 7,
  ALLOWED_MIME_TYPES: [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
  ALLOWED_EXTENSIONS: [".pdf", ".pptx"],
} as const;

export const RATE_LIMITS = {
  LOGIN_ATTEMPTS: { points: 5, windowSeconds: 15 * 60 }, // 5 attempts per 15 min
  DRAFT_SAVE: { points: 60, windowSeconds: 60 }, // 60 updates per min
  FINAL_SUBMIT: { points: 10, windowSeconds: 60 }, // 10 submit attempts per min
  UPLOAD_REQUEST: { points: 10, windowSeconds: 60 }, // 10 upload urls per min
} as const;
