/**
 * Client-side IndexedDB Draft Storage for HyperLearningTech Winter Hackathon '26
 *
 * Stores registration progress, participant details, and proposal files (Blob/File)
 * directly in the browser's IndexedDB. Completely eliminates server-side autosave requests
 * and Neon database latency during form completion.
 */

export interface DraftProposalFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  blob: Blob;
  pageCount?: number;
}

export interface ClientRegistrationDraft {
  version: 1;
  updatedAt: number;
  type: "Solo" | "Squad";
  step: number;
  formData: {
    fullName: string;
    email: string;
    phone: string;
    college: string;
    github: string;
    teamName: string;
    teamLeader: string;
    member2Name: string;
    member2Email: string;
    member2Phone: string;
    member2College: string;
    member2Github: string;
    member3Name: string;
    member3Email: string;
    member3Phone: string;
    member3College: string;
    member3Github: string;
    member4Name: string;
    member4Email: string;
    member4Phone: string;
    member4College: string;
    member4Github: string;
    projectTitle: string;
    techStack: string;
    problemStatement: string;
    existingCode: string;
    aiUsage: string;
    transactionReference: string;
  };
  proposalFile?: DraftProposalFile | null;
}

const DB_NAME = "hlt_registration_drafts_v1";
const STORE_NAME = "drafts";
const DRAFT_KEY = "active_registration_draft";
const DRAFT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days expiration

function isIndexedDbAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.indexedDB !== "undefined";
}

function openDraftDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!isIndexedDbAvailable()) {
      return reject(new Error("IndexedDB is not available in this environment"));
    }

    const request = window.indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Failed to open IndexedDB"));
  });
}

/**
 * Persist the current draft state locally in IndexedDB.
 * Silently catches and logs failures (e.g. quota or security blocks) to avoid disrupting user input.
 */
export async function saveLocalDraft(draft: Omit<ClientRegistrationDraft, "version" | "updatedAt">): Promise<void> {
  if (!isIndexedDbAvailable()) return;

  try {
    const db = await openDraftDatabase();
    const payload: ClientRegistrationDraft = {
      ...draft,
      version: 1,
      updatedAt: Date.now(),
    };

    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(payload, DRAFT_KEY);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error || new Error("Failed to put draft record"));
      tx.onabort = () => reject(tx.error || new Error("Transaction aborted"));
    });

    db.close();
  } catch (err) {
    console.warn("Unable to save registration draft to IndexedDB:", err);
  }
}

/**
 * Retrieve the saved registration draft from IndexedDB.
 * Discards expired (older than 7 days) or malformed drafts automatically.
 */
export async function getLocalDraft(): Promise<ClientRegistrationDraft | null> {
  if (!isIndexedDbAvailable()) return null;

  try {
    const db = await openDraftDatabase();

    const result = await new Promise<ClientRegistrationDraft | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(DRAFT_KEY);

      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error || new Error("Failed to read draft record"));
    });

    db.close();

    if (!result) return null;

    // Check expiration
    if (result.updatedAt && Date.now() - result.updatedAt > DRAFT_MAX_AGE_MS) {
      await clearLocalDraft();
      return null;
    }

    // Validate minimal structure
    if (!result.formData || typeof result.formData !== "object") {
      await clearLocalDraft();
      return null;
    }

    return result;
  } catch (err) {
    console.warn("Unable to read registration draft from IndexedDB:", err);
    return null;
  }
}

/**
 * Completely remove the local registration draft upon successful submission.
 */
export async function clearLocalDraft(): Promise<void> {
  if (!isIndexedDbAvailable()) return;

  try {
    const db = await openDraftDatabase();

    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(DRAFT_KEY);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error || new Error("Failed to delete draft record"));
    });

    db.close();
  } catch (err) {
    console.warn("Unable to clear registration draft from IndexedDB:", err);
  }
}
