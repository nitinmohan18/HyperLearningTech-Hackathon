"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, ArrowLeft, Users, User, ShieldCheck, FileText } from "lucide-react";
import { event } from "@/data/event";

const steps = [
  { id: 1, title: "Type", label: "Entry Type" },
  { id: 2, title: "Lead", label: "Participant" },
  { id: 3, title: "Squad", label: "Members" },
  { id: 4, title: "Proposal", label: "Project Brief" },
  { id: 5, title: "Review", label: "Summary" },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<"Solo" | "Squad">("Solo");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    github: "",
    teamName: "",
    teamLeader: "",
    member2: "",
    member3: "",
    member4: "",
    projectTitle: "",
    techStack: "",
    problemStatement: "",
    existingCode: "",
    aiUsage: "",
  });

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  if (success) {
    return (
      <div className="bg-cream min-h-[calc(100vh-140px)] flex items-center justify-center py-20">
        <div className="container-site max-w-lg">
          <div className="rounded-2xl border border-[#c89f6d]/30 bg-[#120d09]/45 p-8 sm:p-10 text-center shadow-card backdrop-blur-xl">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[#c89f6d]/30 bg-[#c89f6d]/10 text-[#c89f6d]">
              <Check size={28} />
            </div>
            <h1 className="mt-6 font-serif text-3xl font-normal text-[#f0eae1] sm:text-4xl">
              Registration Recorded
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#9e8e7c]">
              Your registration for <span className="text-[#f0eae1] font-medium">{type} Entry</span> has been successfully logged for Winter Hackathon ’26.
            </p>

            <div className="mt-6 rounded-xl border border-sand-border/15 bg-[#16100c]/60 p-5 text-left font-mono text-xs space-y-2.5">
              <div className="flex justify-between border-b border-sand-border/10 pb-2">
                <span className="text-[#8e7a68]">Category:</span>
                <span className="text-[#f0eae1] font-semibold">{type} ({type === "Solo" ? event.soloFee : event.squadFee})</span>
              </div>
              <div className="flex justify-between border-b border-sand-border/10 pb-2">
                <span className="text-[#8e7a68]">Kickoff:</span>
                <span className="text-[#c89f6d] font-semibold">26 Dec 2026, 10:00 PM IST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e7a68]">Status:</span>
                <span className="text-[#f0eae1] font-semibold">Awaiting Repository Inspection</span>
              </div>
            </div>

            <p className="mt-4 text-xs text-[#8e7a68]">
              Explore your live participant portal to check off early preparation steps.
            </p>

            <Link href="/dashboard" className="btn-primary mt-6 w-full justify-center">
              Enter Participant Dashboard <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-[calc(100vh-140px)] py-16">
      <div className="container-site max-w-3xl">
        <div className="text-center sm:text-left">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e7a68]">
            Registration · 1st Edition
          </p>
          <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-normal leading-tight text-[#f0eae1]">
            Register for <span className="font-serif italic font-normal text-[#c89f6d]">Winter Hackathon ’26</span>
          </h1>
          <p className="mt-3 text-sm text-[#9e8e7c]">
            Complete the 5-step application to register your project proposal and reserve your build slot.
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div className="mt-8 grid grid-cols-5 gap-2">
          {steps.map((s) => {
            const isCurrent = s.id === step;
            const isCompleted = s.id < step;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                className="group flex flex-col items-center gap-2 text-left"
              >
                <div
                  className={`h-1.5 w-full rounded-full transition-colors ${
                    isCompleted
                      ? "bg-[#c89f6d]"
                      : isCurrent
                      ? "bg-[#f0eae1]"
                      : "bg-sand-border/20"
                  }`}
                />
                <span
                  className={`hidden font-mono text-[11px] sm:inline uppercase tracking-wider transition ${
                    isCurrent
                      ? "text-[#f0eae1] font-semibold"
                      : isCompleted
                      ? "text-[#c89f6d]"
                      : "text-[#8e7a68]"
                  }`}
                >
                  {s.id}. {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Step Container */}
        <div className="mt-8 rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-6 backdrop-blur-xl sm:p-10 shadow-card">
          {/* STEP 1: Entry Type */}
          {step === 1 && (
            <div>
              <div className="border-b border-sand-border/15 pb-4">
                <h2 className="font-serif text-2xl font-normal text-[#f0eae1]">
                  Choose Participation Format
                </h2>
                <p className="text-xs text-[#9e8e7c] mt-1">
                  Select whether you are competing as a solo developer or as a squad.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* Solo Option */}
                <button
                  type="button"
                  onClick={() => setType("Solo")}
                  className={`flex flex-col justify-between rounded-xl border p-6 text-left transition-all ${
                    type === "Solo"
                      ? "border-[#c89f6d]/50 bg-[#1c140d]/80 shadow-card"
                      : "border-sand-border/15 bg-[#140e0a]/40 hover:border-sand-border/30 hover:bg-[#18110b]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d] text-[#c89f6d] shadow-sm">
                        <User size={18} />
                      </div>
                      {type === "Solo" && (
                        <span className="font-mono text-xs text-[#c89f6d]">Selected</span>
                      )}
                    </div>
                    <h3 className="mt-4 font-serif text-2xl font-normal text-[#f0eae1]">Solo Entry</h3>
                    <p className="mt-1 font-mono text-xs text-[#c89f6d] font-semibold">{event.soloFee} fee</p>
                    <p className="mt-3 text-xs leading-relaxed text-[#9e8e7c]">
                      One independent builder. Eligible for overall cash prizes, special category awards, and individual certification.
                    </p>
                  </div>
                </button>

                {/* Squad Option */}
                <button
                  type="button"
                  onClick={() => setType("Squad")}
                  className={`flex flex-col justify-between rounded-xl border p-6 text-left transition-all ${
                    type === "Squad"
                      ? "border-[#c89f6d]/50 bg-[#1c140d]/80 shadow-card"
                      : "border-sand-border/15 bg-[#140e0a]/40 hover:border-sand-border/30 hover:bg-[#18110b]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d] text-[#c89f6d] shadow-sm">
                        <Users size={18} />
                      </div>
                      {type === "Squad" && (
                        <span className="font-mono text-xs text-[#c89f6d]">Selected</span>
                      )}
                    </div>
                    <h3 className="mt-4 font-serif text-2xl font-normal text-[#f0eae1]">Squad Entry</h3>
                    <p className="mt-1 font-mono text-xs text-[#c89f6d] font-semibold">{event.squadFee} flat team fee</p>
                    <p className="mt-3 text-xs leading-relaxed text-[#9e8e7c]">
                      2 to 4 collaborators. One unified project repository. Every team member receives an individual ranking credential.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Lead Participant Details */}
          {step === 2 && (
            <div>
              <div className="border-b border-sand-border/15 pb-4">
                <h2 className="font-serif text-2xl font-normal text-[#f0eae1]">
                  {type === "Solo" ? "Builder Information" : "Team Leader Information"}
                </h2>
                <p className="text-xs text-[#9e8e7c] mt-1">
                  Primary contact for repo collaboration invites and official updates.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    className="input mt-1.5"
                    placeholder="e.g. Aarav Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="input mt-1.5"
                    placeholder="e.g. aarav@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="input mt-1.5"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="college">
                    College / Organisation
                  </label>
                  <input
                    id="college"
                    className="input mt-1.5"
                    placeholder="e.g. IIT Bombay / Independent"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="github">
                    GitHub Username
                  </label>
                  <input
                    id="github"
                    className="input mt-1.5 font-mono"
                    placeholder="e.g. aarav-dev (Will own the private hackathon repository)"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Squad Details */}
          {step === 3 && (
            <div>
              <div className="border-b border-sand-border/15 pb-4">
                <h2 className="font-serif text-2xl font-normal text-[#f0eae1]">
                  Squad Configuration
                </h2>
                <p className="text-xs text-[#9e8e7c] mt-1">
                  Define squad name and github handles for team collaborators.
                </p>
              </div>

              {type === "Solo" ? (
                <div className="mt-6 rounded-xl border border-sand-border/15 bg-[#140e0a]/40 p-8 text-center">
                  <User size={32} className="mx-auto text-[#8e7a68]" />
                  <h3 className="mt-3 font-serif text-xl font-normal text-[#f0eae1]">
                    Solo Entry Active
                  </h3>
                  <p className="mt-1 text-xs text-[#9e8e7c] max-w-sm mx-auto">
                    Squad details are not required for solo participation. You can proceed directly to your project proposal.
                  </p>
                </div>
              ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="teamName">
                      Team Name
                    </label>
                    <input
                      id="teamName"
                      className="input mt-1.5"
                      placeholder="e.g. Team Null"
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="teamLeader">
                      Team Leader Name
                    </label>
                    <input
                      id="teamLeader"
                      className="input mt-1.5"
                      placeholder="Lead coordinator"
                      value={formData.teamLeader}
                      onChange={(e) => setFormData({ ...formData, teamLeader: e.target.value })}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="member2">
                      Member 2 GitHub Username (Required)
                    </label>
                    <input
                      id="member2"
                      className="input mt-1.5 font-mono"
                      placeholder="GitHub handle"
                      value={formData.member2}
                      onChange={(e) => setFormData({ ...formData, member2: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="member3">
                      Member 3 GitHub (Optional)
                    </label>
                    <input
                      id="member3"
                      className="input mt-1.5 font-mono"
                      placeholder="Optional handle"
                      value={formData.member3}
                      onChange={(e) => setFormData({ ...formData, member3: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="member4">
                      Member 4 GitHub (Optional)
                    </label>
                    <input
                      id="member4"
                      className="input mt-1.5 font-mono"
                      placeholder="Optional handle"
                      value={formData.member4}
                      onChange={(e) => setFormData({ ...formData, member4: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Project Proposal & Disclosures */}
          {step === 4 && (
            <div>
              <div className="border-b border-sand-border/15 pb-4">
                <h2 className="font-serif text-2xl font-normal text-[#f0eae1]">
                  Project Proposal & Mandatory Disclosures
                </h2>
                <p className="text-xs text-[#9e8e7c] mt-1">
                  Describe your intended software solution and declare any pre-existing code or AI usage.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="projectTitle">
                    Project Working Title
                  </label>
                  <input
                    id="projectTitle"
                    className="input mt-1.5"
                    placeholder="e.g. SignBridge"
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="techStack">
                    Planned Technology Stack
                  </label>
                  <input
                    id="techStack"
                    className="input mt-1.5"
                    placeholder="e.g. Next.js, FastAPI, OpenCV"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="problemStatement">
                    Problem Statement & Scope
                  </label>
                  <textarea
                    id="problemStatement"
                    className="input mt-1.5 h-24 py-3 resize-none rounded-xl"
                    placeholder="What problem does your application solve, and what is the intended user journey?"
                    value={formData.problemStatement}
                    onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="existingCode">
                    Existing Code / Boilerplate Disclosure
                  </label>
                  <textarea
                    id="existingCode"
                    className="input mt-1.5 h-20 py-3 resize-none rounded-xl"
                    placeholder="Declare any starter templates, libraries, or pre-written modules. State 'None' if starting from scratch."
                    value={formData.existingCode}
                    onChange={(e) => setFormData({ ...formData, existingCode: e.target.value })}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="aiUsage">
                    AI Tool Usage Disclosure
                  </label>
                  <textarea
                    id="aiUsage"
                    className="input mt-1.5 h-20 py-3 resize-none rounded-xl"
                    placeholder="Disclose planned AI assistance (e.g. GitHub Copilot, ChatGPT, Claude) and for what aspects."
                    value={formData.aiUsage}
                    onChange={(e) => setFormData({ ...formData, aiUsage: e.target.value })}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="proposalPdf">
                    Proposal Architecture Deck / PDF (Optional)
                  </label>
                  <input
                    id="proposalPdf"
                    type="file"
                    accept=".pdf"
                    className="input mt-1.5 file:mr-4 file:rounded-full file:border-0 file:bg-sand-border/20 file:px-4 file:py-1 file:font-mono file:text-xs file:text-[#f0eae1] hover:file:bg-sand-border/40"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Registration Summary */}
          {step === 5 && (
            <div>
              <div className="border-b border-sand-border/15 pb-4">
                <h2 className="font-serif text-2xl font-normal text-[#f0eae1]">
                  Review & Confirm Registration
                </h2>
                <p className="text-xs text-[#9e8e7c] mt-1">
                  Verify participation details and accept hackathon integrity declarations.
                </p>
              </div>

              <div className="mt-6 divide-y divide-sand-border/15 rounded-xl border border-sand-border/15 bg-[#140e0a]/40 p-6 font-mono text-xs">
                <div className="flex justify-between py-2.5">
                  <span className="text-[#8e7a68]">Entry Format:</span>
                  <span className="font-semibold text-[#f0eae1]">{type}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-[#8e7a68]">Registration Fee:</span>
                  <span className="font-semibold text-[#c89f6d]">{type === "Solo" ? event.soloFee : event.squadFee}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-[#8e7a68]">Build Window:</span>
                  <span className="text-[#f0eae1] font-semibold">26 Dec 10:00 PM – 27 Dec 10:00 PM IST</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-[#8e7a68]">Payment Mode:</span>
                  <span className="text-[#9e8e7c]">Demo Mode — No payment gateway required</span>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-sand-border/15 bg-[#140e0a]/40 p-4">
                <label className="flex items-start gap-3 text-xs leading-relaxed text-[#9e8e7c] cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    defaultChecked
                    className="mt-0.5 h-4 w-4 rounded border-sand-border/30 bg-[#120d09] accent-[#c89f6d]"
                  />
                  <span>
                    I confirm that the code committed during Winter Hackathon ’26 will represent our own original work. I agree to maintain an inspectable git log, invite the official inspection collaborator account, and accept all competition rules.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="mt-10 flex items-center justify-between border-t border-sand-border/15 pt-6">
            <button
              type="button"
              className="btn-secondary"
              onClick={back}
              disabled={step === 1}
            >
              <ArrowLeft size={16} /> Back
            </button>

            {step < 5 ? (
              <button
                type="button"
                className="btn-primary"
                onClick={next}
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary"
                onClick={() => setSuccess(true)}
              >
                Submit Demo Registration <Check size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
