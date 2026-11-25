/**
 * Registration helpers for HyperLearningTech Winter Hackathon '26.
 * Note: Form draft persistence is handled client-side in IndexedDB (src/lib/idb-draft.ts)
 * to eliminate Neon database latency.
 */

/**
 * Generate human-readable registration number like HLT-W26-7A39B
 */
export function generateRegistrationNumber(): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // exclude ambiguous chars
  let rand = "";
  for (let i = 0; i < 5; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `HLT-W26-${rand}`;
}
