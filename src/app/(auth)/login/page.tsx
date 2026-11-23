"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";

export default function LoginPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-cream min-h-[calc(100vh-140px)] flex items-center justify-center py-16">
      <div className="container-site max-w-md">
        <div className="rounded-2xl border border-sand-border/20 bg-[#120d09]/45 p-8 sm:p-10 shadow-card backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8e7a68]">
              Participant Access
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d]">
              <Lock size={15} />
            </div>
          </div>

          <h1 className="mt-4 font-serif text-3xl font-normal text-[#f0eae1] sm:text-4xl">
            Welcome <span className="font-serif italic text-[#c89f6d]">back.</span>
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-[#9e8e7c]">
            Log in to manage your repository verification, hourly checkpoints, and project submission.
          </p>

          {sent ? (
            <div className="mt-6 rounded-xl border border-[#c89f6d]/30 bg-[#1c140d]/80 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 text-[#c89f6d] shrink-0" />
                <div>
                  <p className="font-serif text-base font-normal text-[#f0eae1]">
                    Demo Login Submitted
                  </p>
                  <p className="mt-1 text-xs text-[#9e8e7c]">
                    This is a mock UI session. You can now access your participant dashboard.
                  </p>
                  <Link
                    href="/dashboard"
                    className="btn-primary mt-4 h-9 px-5 text-xs"
                  >
                    Open Dashboard <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div>
                <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="input"
                  placeholder="builder@example.com"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="password">
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="input"
                  placeholder="••••••••••••"
                />
              </div>

              <button className="btn-primary w-full justify-center mt-2" type="submit">
                Log In to Workspace
              </button>
            </form>
          )}

          <div className="mt-8 border-t border-sand-border/15 pt-5 text-center text-xs text-[#9e8e7c]">
            Don’t have a team registration yet?{" "}
            <Link href="/register" className="font-semibold text-[#c89f6d] hover:underline">
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
