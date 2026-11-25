"use client";

import { useState } from "react";
import { Lock, ShieldAlert, ArrowRight, Loader2 } from "lucide-react";
import Logo from "@/components/layout/Logo";

export default function AdminLoginForm({ onLoginSuccess }: { onLoginSuccess?: () => void }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        window.location.reload();
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0907] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-sand-border/25 bg-[#140e0a]/80 p-8 shadow-card backdrop-blur-xl">
        <div className="flex justify-center mb-6">
          <Logo size="default" />
        </div>

        <div className="flex items-center justify-between border-b border-sand-border/20 pb-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#c89f6d]">
              Security Gate
            </span>
            <h1 className="font-serif text-2xl font-normal text-[#f0eae1] mt-0.5">
              Organiser Console
            </h1>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-sand-border/30 bg-[#1f150f] text-[#c89f6d]">
            <Lock size={18} />
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-[#9e8e7c]">
          Restricted access for Winter Hackathon ’26 organising committee members. Requires master administrative authorization.
        </p>

        {error && (
          <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-300">
            <ShieldAlert size={16} className="shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="admin-password"
              className="block font-mono text-xs uppercase tracking-wider text-[#8e7a68] mb-1.5"
            >
              Master Admin Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter ADMIN_SECRET"
              className="input font-mono text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="btn-primary w-full justify-center h-10 text-xs mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Verifying Credentials...
              </>
            ) : (
              <>
                Access Hackathon Console <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center font-mono text-[11px] text-[#8e7a68]">
          All operations are cryptographically signed and logged.
        </p>
      </div>
    </div>
  );
}
