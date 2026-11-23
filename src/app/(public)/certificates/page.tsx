"use client";

import { useState } from "react";
import { CheckCircle2, ShieldX, ShieldCheck } from "lucide-react";

export default function CertificatesPage() {
  const [id, setId] = useState("");
  const [state, setState] = useState<"idle" | "valid" | "invalid">("idle");

  const verify = () => {
    setState(id.trim().toUpperCase() === "HLT-W26-DEMO" ? "valid" : "invalid");
  };

  return (
    <div className="bg-cream">
      <div className="container-site section-pad">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e7a68]">
            Verification Portal
          </p>
          <h1 className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#f0eae1]">
            Verify a Certificate
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#9e8e7c] sm:text-lg">
            Every Winter Hackathon ’26 certificate features an authentic cryptographic ID. Test the demo verification system using ID:{" "}
            <strong className="font-mono text-[#c89f6d] font-semibold">HLT-W26-DEMO</strong>.
          </p>
        </div>

        {/* Verification Card */}
        <div className="mt-12 max-w-xl rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-7 sm:p-8 backdrop-blur-xl">
          <label className="block font-serif text-lg font-normal text-[#f0eae1]" htmlFor="certificate">
            Enter Certificate ID
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="certificate"
              className="input font-mono uppercase"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                setState("idle");
              }}
              placeholder="e.g. HLT-W26-DEMO"
            />
            <button
              type="button"
              className="btn-primary sm:w-32"
              onClick={verify}
            >
              Verify
            </button>
          </div>
          <p className="mt-2.5 font-mono text-xs text-[#8e7a68]">
            IDs are case-insensitive and generated post-event.
          </p>
        </div>

        {/* Verified Result */}
        {state === "valid" && (
          <div className="mt-6 max-w-xl rounded-2xl border border-[#c89f6d]/30 bg-[#120d09]/45 p-6 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#c89f6d]/30 bg-[#c89f6d]/10 text-[#c89f6d]">
                <CheckCircle2 size={20} />
              </div>
              <div className="flex-1">
                <span className="font-mono text-xs text-[#c89f6d]">Authentic Credential</span>
                <h3 className="mt-1 font-serif text-2xl font-normal text-[#f0eae1]">
                  Certificate Verified: HLT-W26-DEMO
                </h3>
                <div className="mt-4 space-y-2 font-mono text-xs text-[#9e8e7c]">
                  <div className="flex justify-between border-b border-sand-border/10 pb-1.5">
                    <span className="text-[#8e7a68]">Recipient:</span>
                    <span className="text-[#f0eae1] font-medium">Aarav Sharma</span>
                  </div>
                  <div className="flex justify-between border-b border-sand-border/10 pb-1.5">
                    <span className="text-[#8e7a68]">Award Type:</span>
                    <span className="text-[#f0eae1] font-medium">Top 25 Finalist & Participant</span>
                  </div>
                  <div className="flex justify-between border-b border-sand-border/10 pb-1.5">
                    <span className="text-[#8e7a68]">Project:</span>
                    <span className="text-[#f0eae1] font-medium">SignBridge (Solo)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8e7a68]">Issued:</span>
                    <span className="text-[#f0eae1] font-medium">27 Dec 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invalid Result */}
        {state === "invalid" && (
          <div className="mt-6 max-w-xl rounded-2xl border border-red-500/30 bg-[#1a0e0e]/50 p-6 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
                <ShieldX size={20} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-normal text-[#f0eae1]">
                  Certificate Not Found
                </h3>
                <p className="mt-1 text-sm text-[#9e8e7c]">
                  No matching record exists for the provided ID. Please double-check your code. Try <strong className="font-mono text-[#c89f6d] font-semibold">HLT-W26-DEMO</strong> for demo verification.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
