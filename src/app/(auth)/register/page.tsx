"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Users,
  ShieldCheck,
  FileText,
  Upload,
  Loader2,
  AlertCircle,
  CheckCircle2,
  QrCode,
  FileDown,
} from "lucide-react";
import { event } from "@/data/event";
import {
  saveLocalDraft,
  getLocalDraft,
  clearLocalDraft,
} from "@/lib/idb-draft";

const steps = [
  { id: 1, title: "Type", label: "Entry Type" },
  { id: 2, title: "Lead", label: "Participant" },
  { id: 3, title: "Squad", label: "Members" },
  { id: 4, title: "Proposal", label: "Project Brief" },
  { id: 5, title: "Review", label: "Summary" },
];

interface MemberDetails {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  githubUsername: string;
}

/** Toggle to `true` to re-enable the internal multi-step registration UI component. */
const ENABLE_INTERNAL_REGISTRATION = false;

export default function RegisterPage() {
  useEffect(() => {
    if (!ENABLE_INTERNAL_REGISTRATION) {
      window.location.replace(event.registrationUrl);
    }
  }, []);

  if (!ENABLE_INTERNAL_REGISTRATION) {
    return (
      <div className="min-h-screen bg-[#0d0a08] px-4 py-24 flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-[#e0b885]/25 bg-[#150e0a]/90 p-7 text-center shadow-2xl">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#e0b885]">
            Official Registration
          </p>
          <h1 className="mt-2 font-serif text-2xl font-normal text-[#f0eae1]">
            Redirecting to Unstop
          </h1>
          <p className="mt-2.5 text-xs leading-relaxed text-[#cfc6ba]">
            Student registrations for Winter Hackathon ’26 are handled on Unstop. If you are not redirected automatically, continue below.
          </p>
          <a
            href={event.registrationUrl}
            className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2"
          >
            Continue to Unstop <ArrowRight size={15} />
          </a>
        </div>
      </div>
    );
  }

  return <InternalRegisterPage />;
}

function InternalRegisterPage() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<"Squad">("Squad");
  const [submittedData, setSubmittedData] = useState<{
    registrationNumber: string;
    type: string;
    feeFormatted: string;
  } | null>(null);

  const [loadingDraft, setLoadingDraft] = useState(true);
  const [savingDraft, setSavingDraft] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Proposal upload state
  const [proposalFile, setProposalFile] = useState<File | null>(null);
  const [proposalFileInfo, setProposalFileInfo] = useState<{
    id?: string;
    originalName: string;
    sizeBytes: number;
    pageCount?: number;
  } | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    github: "",
    teamName: "",
    teamLeader: "",
    // Member 2
    member2Name: "",
    member2Email: "",
    member2Phone: "",
    member2College: "",
    member2Github: "",
    // Member 3 (Optional)
    member3Name: "",
    member3Email: "",
    member3Phone: "",
    member3College: "",
    member3Github: "",
    // Member 4 (Optional)
    member4Name: "",
    member4Email: "",
    member4Phone: "",
    member4College: "",
    member4Github: "",
    // Step 4
    projectTitle: "",
    techStack: "",
    problemStatement: "",
    existingCode: "",
    aiUsage: "",
    // Step 5 payment
    transactionReference: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load active draft from IndexedDB on mount
  useEffect(() => {
    async function loadDraft() {
      try {
        const d = await getLocalDraft();
        if (d) {
          setType("Squad");
          if (d.formData) setFormData((prev) => ({ ...prev, ...d.formData }));
          if (d.step && d.step >= 1 && d.step <= 5) setStep(d.step);

          if (d.proposalFile?.blob) {
            const reconstructed = new File(
              [d.proposalFile.blob],
              d.proposalFile.name,
              {
                type: d.proposalFile.type,
                lastModified: d.proposalFile.lastModified || Date.now(),
              }
            );
            setProposalFile(reconstructed);
            setProposalFileInfo({
              originalName: d.proposalFile.name,
              sizeBytes: d.proposalFile.size,
              pageCount: d.proposalFile.pageCount,
            });
          }
        }
      } catch (err) {
        console.warn("Failed to load local IndexedDB draft:", err);
      } finally {
        setLoadingDraft(false);
      }
    }
    loadDraft();
  }, []);

  // Save draft locally to IndexedDB helper
  const persistLocalDraft = (
    customStep?: number,
    customFile?: File | null
  ) => {
    const fileToPersist = customFile !== undefined ? customFile : proposalFile;
    setSavingDraft(true);
    saveLocalDraft({
      type,
      step: customStep ?? step,
      formData,
      proposalFile: fileToPersist
        ? {
            name: fileToPersist.name,
            size: fileToPersist.size,
            type: fileToPersist.type,
            lastModified: fileToPersist.lastModified,
            blob: fileToPersist,
            pageCount: proposalFileInfo?.pageCount,
          }
        : null,
    }).finally(() => {
      setTimeout(() => setSavingDraft(false), 400);
    });
  };

  // Debounced auto-persist on form changes (purely local, zero network calls)
  useEffect(() => {
    if (loadingDraft) return;
    const timer = setTimeout(() => {
      persistLocalDraft();
    }, 300);
    return () => clearTimeout(timer);
  }, [formData, type, step, proposalFile, loadingDraft]);

  const next = () => {
    setErrorMessage(null);

    // Validation per step
    if (step === 2) {
      if (!formData.fullName.trim()) return setErrorMessage("Please enter your full name.");
      if (!formData.email.trim() || !formData.email.includes("@")) return setErrorMessage("Please enter a valid email address.");
      if (!formData.phone.trim()) return setErrorMessage("Please enter a valid phone number.");
      if (!formData.college.trim()) return setErrorMessage("Please enter your college or organisation.");
      if (!formData.github.trim()) return setErrorMessage("Please enter your GitHub username.");
    }

    if (step === 3) {
      if (!formData.teamName.trim() || formData.teamName.trim().length < 2) {
        return setErrorMessage("Please provide a valid squad name (at least 2 characters).");
      }

      const validateOptionalMember = (
        label: string,
        name: string,
        email: string,
        phone: string,
        github: string
      ) => {
        const hasAny = [name, email, phone, github].some((v) => v.trim().length > 0);
        if (!hasAny) return null;
        if (!name.trim()) return `${label} full name is required.`;
        if (!email.trim() || !email.includes("@")) return `${label} valid email is required.`;
        if (!phone.trim()) return `${label} phone number is required.`;
        if (!github.trim()) return `${label} GitHub username is required.`;
        return null;
      };

      const m2Err = validateOptionalMember("Member 2", formData.member2Name, formData.member2Email, formData.member2Phone, formData.member2Github);
      if (m2Err) return setErrorMessage(m2Err);

      const m3Err = validateOptionalMember("Member 3", formData.member3Name, formData.member3Email, formData.member3Phone, formData.member3Github);
      if (m3Err) return setErrorMessage(m3Err);

      const m4Err = validateOptionalMember("Member 4", formData.member4Name, formData.member4Email, formData.member4Phone, formData.member4Github);
      if (m4Err) return setErrorMessage(m4Err);
    }

    if (step === 4) {
      if (!formData.projectTitle.trim()) return setErrorMessage("Please enter your project title.");
      if (!formData.techStack.trim()) return setErrorMessage("Please specify your planned technology stack.");
      if (!formData.problemStatement.trim() || formData.problemStatement.trim().length < 10) {
        return setErrorMessage("Please provide a brief problem statement (at least 10 characters).");
      }
    }

    const nextStep = Math.min(5, step + 1);
    setStep(nextStep);
    persistLocalDraft(nextStep);
  };

  const back = () => {
    setErrorMessage(null);
    const prevStep = Math.max(1, step - 1);
    setStep(prevStep);
    persistLocalDraft(prevStep);
  };

  // Local proposal file selection (Saved to IndexedDB, uploaded only on final submission)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File exceeds 5 MB limit. Please select a smaller deck or PDF.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "pdf" && ext !== "pptx") {
      setErrorMessage("Unsupported file type. Please upload a PDF (.pdf) or PowerPoint (.pptx) file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setProposalFile(file);
    setProposalFileInfo({
      originalName: file.name,
      sizeBytes: file.size,
    });
    persistLocalDraft(step, file);
  };

  const handleRemoveFile = () => {
    setProposalFile(null);
    setProposalFileInfo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    persistLocalDraft(step, null);
  };

  // Final submission: validates, uploads proposal to B2, and creates records in Neon
  const handleSubmit = async () => {
    setErrorMessage(null);
    setSubmitting(true);

    try {
      let proposalPayload: { storageKey: string; originalName: string } | null = null;

      // 1. Upload proposal deck to Backblaze B2 on final submission only
      if (proposalFile) {
        const resolvedMime = proposalFile.name.toLowerCase().endsWith(".pptx")
          ? "application/vnd.openxmlformats-officedocument.presentationml.presentation"
          : "application/pdf";

        const urlRes = await fetch("/api/registrations/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: proposalFile.name,
            mimeType: resolvedMime,
            sizeBytes: proposalFile.size,
          }),
        });

        const urlData = await urlRes.json();
        if (!urlRes.ok) {
          throw new Error(urlData.error || "Failed to generate storage upload URL.");
        }

        const uploadRes = await fetch(urlData.uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": resolvedMime },
          body: proposalFile,
        });

        if (!uploadRes.ok) {
          throw new Error("Failed to upload proposal deck to private storage. Please try again.");
        }

        proposalPayload = {
          storageKey: urlData.storageKey,
          originalName: proposalFile.name,
        };
      }

      // 2. Assemble participants
      const participantsList: Array<{
        fullName: string;
        email: string;
        phone: string;
        college: string;
        githubUsername: string;
        role: "LEADER" | "MEMBER";
        sortOrder: number;
      }> = [
        {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          college: formData.college.trim(),
          githubUsername: formData.github.trim(),
          role: "LEADER",
          sortOrder: 0,
        },
      ];

      if (formData.member2Github.trim()) {
        participantsList.push({
          fullName: formData.member2Name.trim(),
          email: formData.member2Email.trim(),
          phone: formData.member2Phone.trim(),
          college: (formData.member2College || formData.college).trim(),
          githubUsername: formData.member2Github.trim(),
          role: "MEMBER" as const,
          sortOrder: 1,
        });
      }

      if (formData.member3Github.trim()) {
        participantsList.push({
          fullName: formData.member3Name.trim() || `Member 3`,
          email: formData.member3Email.trim(),
          phone: formData.member3Phone.trim(),
          college: (formData.member3College || formData.college).trim(),
          githubUsername: formData.member3Github.trim(),
          role: "MEMBER" as const,
          sortOrder: 2,
        });
      }

      if (formData.member4Github.trim()) {
        participantsList.push({
          fullName: formData.member4Name.trim() || `Member 4`,
          email: formData.member4Email.trim(),
          phone: formData.member4Phone.trim(),
          college: (formData.member4College || formData.college).trim(),
          githubUsername: formData.member4Github.trim(),
          role: "MEMBER" as const,
          sortOrder: 3,
        });
      }

      // Generate a client idempotency key to prevent double-click duplicates
      const idempotencyKey = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      const payload = {
        type: "SQUAD" as const,
        teamName: formData.teamName.trim(),
        projectTitle: formData.projectTitle.trim() || "Untitled Project",
        techStack: formData.techStack.trim() || "TypeScript, Next.js",
        problemStatement: formData.problemStatement.trim() || "Hackathon project brief",
        existingCodeDisclosure: formData.existingCode.trim() || "None",
        aiUsageDisclosure: formData.aiUsage.trim() || "None",
        transactionReference: formData.transactionReference.trim() || null,
        idempotencyKey,
        proposal: proposalPayload,
        participants: participantsList,
      };

      const res = await fetch("/api/registrations/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit registration");
      }

      // Clear local IndexedDB draft ONLY after verified submission
      await clearLocalDraft();

      setSubmittedData({
        registrationNumber: data.registrationNumber,
        type: `${type} Entry`,
        feeFormatted: data.feeFormatted,
      });
    } catch (err: any) {
      // Preserve local IndexedDB draft on failure so user doesn't lose data
      setErrorMessage(err.message || "Failed to submit registration");
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedData) {
    return (
      <div className="bg-cream min-h-[calc(100vh-140px)] flex items-center justify-center py-20">
        <div className="container-site max-w-lg">
          <div className="rounded-2xl border border-[#c89f6d]/30 bg-[#120d09]/60 p-8 sm:p-10 text-center shadow-card backdrop-blur-xl">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[#c89f6d]/30 bg-[#c89f6d]/10 text-[#c89f6d]">
              <Check size={28} />
            </div>
            <h1 className="mt-6 font-serif text-3xl font-normal text-[#f0eae1] sm:text-4xl">
              Registration Recorded
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#9e8e7c]">
              Your registration application has been successfully logged for{" "}
              <span className="text-[#f0eae1] font-medium">{submittedData.type}</span> at Winter Hackathon ’26.
            </p>

            <div className="mt-6 rounded-xl border border-sand-border/15 bg-[#16100c]/80 p-5 text-left font-mono text-xs space-y-2.5">
              <div className="flex justify-between border-b border-sand-border/10 pb-2">
                <span className="text-[#8e7a68]">Registration ID:</span>
                <span className="text-[#c89f6d] font-bold text-sm tracking-wider">
                  {submittedData.registrationNumber}
                </span>
              </div>
              <div className="flex justify-between border-b border-sand-border/10 pb-2">
                <span className="text-[#8e7a68]">Participation Tier:</span>
                <span className="text-[#f0eae1] font-semibold">{submittedData.feeFormatted}</span>
              </div>
              <div className="flex justify-between border-b border-sand-border/10 pb-2">
                <span className="text-[#8e7a68]">Payment Status:</span>
                <span className="text-amber-400 font-semibold">Pending Verification</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e7a68]">Kickoff Window:</span>
                <span className="text-[#f0eae1] font-semibold">26 Dec 2026, 10:00 PM IST</span>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-950/20 p-4 text-left font-mono text-xs text-amber-200/90 leading-relaxed">
              <p className="font-semibold text-amber-300 mb-1">Next Steps:</p>
              An acknowledgement email has been queued to your registered address. Once our organizing team matches your transaction reference with official bank statements, your participation spot will be marked <strong>CONFIRMED</strong>.
            </div>

            <Link href="/" className="btn-primary mt-6 w-full justify-center">
              Return to Hackathon Home <ArrowRight size={16} />
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
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e7a68]">
              Registration · 1st Edition
            </p>
            {savingDraft && (
              <span className="font-mono text-[10px] text-[#c89f6d] flex items-center gap-1">
                <Loader2 size={10} className="animate-spin" /> Saving draft...
              </span>
            )}
          </div>
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
                onClick={() => {
                  setErrorMessage(null);
                  setStep(s.id);
                  persistLocalDraft(s.id);
                }}
                className="group flex flex-col items-center gap-2 text-left"
              >
                <div
                  className={`h-1.5 w-full rounded-full transition-colors ${isCompleted
                    ? "bg-[#c89f6d]"
                    : isCurrent
                      ? "bg-[#f0eae1]"
                      : "bg-sand-border/20"
                    }`}
                />
                <span
                  className={`hidden font-mono text-[11px] sm:inline uppercase tracking-wider transition ${isCurrent
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

        {errorMessage && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-950/40 p-4 text-xs text-red-200">
            <AlertCircle size={18} className="shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Step Container */}
        <div className="mt-8 rounded-2xl border border-sand-border/15 bg-[#120d09]/45 p-6 backdrop-blur-xl sm:p-10 shadow-card">
          {/* STEP 1: Entry Type */}
          {step === 1 && (
            <div>
              <div className="border-b border-sand-border/15 pb-4">
                <h2 className="font-serif text-2xl font-normal text-[#f0eae1]">
                  Participation Format
                </h2>
                <p className="text-xs text-[#9e8e7c] mt-1">
                  Unified Squad format for 1 to 4 builders at a flat ₹200 entry fee—whether competing alone or as a team.
                </p>
              </div>

              <div className="mt-6">
                {/* Squad Option (Single Unified Format) */}
                <button
                  type="button"
                  onClick={() => setType("Squad")}
                  className="flex w-full flex-col justify-between rounded-xl border border-[#c89f6d]/50 bg-[#1c140d]/80 p-6 text-left shadow-card transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d] text-[#c89f6d] shadow-sm">
                        <Users size={18} />
                      </div>
                      <span className="font-mono text-xs text-[#c89f6d]">Selected</span>
                    </div>
                    <h3 className="mt-4 font-serif text-2xl font-normal text-[#f0eae1]">Squad Entry (1–4 Members)</h3>
                    <p className="mt-1 font-mono text-xs text-[#c89f6d] font-semibold">{event.squadFee} flat entry fee</p>
                    <p className="mt-3 text-xs leading-relaxed text-[#9e8e7c]">
                      Participate individually (1 member) or as a team of up to 4 collaborators for the same flat ₹200 fee. One unified project repository, and every team member receives an individual ranking credential.
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
                  Team Leader Information
                </h2>
                <p className="text-xs text-[#9e8e7c] mt-1">
                  Primary contact for repo collaboration invites and official updates.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="fullName">
                    Full Name *
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
                    Email Address *
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
                    Phone Number *
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
                    College / Organisation *
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
                    GitHub Username *
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
                  Define your squad name and add optional collaborators (1–4 members total). Leave member slots blank if participating alone.
                </p>
              </div>

              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="teamName">
                      Team Name *
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
                      value={formData.fullName || formData.teamLeader}
                      readOnly
                    />
                  </div>
                </div>

                {/* Member 2 Section (Optional) */}
                <div className="rounded-xl border border-sand-border/15 bg-[#140e0a]/40 p-5">
                  <h3 className="font-serif text-base font-normal text-[#f0eae1] flex items-center justify-between">
                    <span>Member 2 (Optional)</span>
                    <span className="font-mono text-[10px] text-[#8e7a68]">Optional</span>
                  </h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]">Full Name</label>
                      <input
                        className="input mt-1.5"
                        placeholder="e.g. Rohan Verma"
                        value={formData.member2Name}
                        onChange={(e) => setFormData({ ...formData, member2Name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]">Email Address</label>
                      <input
                        type="email"
                        className="input mt-1.5"
                        placeholder="e.g. rohan@example.com"
                        value={formData.member2Email}
                        onChange={(e) => setFormData({ ...formData, member2Email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]">Phone Number</label>
                      <input
                        type="tel"
                        className="input mt-1.5"
                        placeholder="e.g. +91 91234 56789"
                        value={formData.member2Phone}
                        onChange={(e) => setFormData({ ...formData, member2Phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]">GitHub Handle</label>
                      <input
                        className="input mt-1.5 font-mono"
                        placeholder="e.g. rohan-dev"
                        value={formData.member2Github}
                        onChange={(e) => setFormData({ ...formData, member2Github: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                  {/* Member 3 Section (Optional) */}
                  <div className="rounded-xl border border-sand-border/15 bg-[#140e0a]/40 p-5">
                    <h3 className="font-serif text-base font-normal text-[#f0eae1] flex items-center justify-between">
                      <span>Member 3 (Optional)</span>
                      <span className="font-mono text-[10px] text-[#8e7a68]">Optional</span>
                    </h3>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]">Full Name</label>
                        <input
                          className="input mt-1.5"
                          placeholder="Full Name"
                          value={formData.member3Name}
                          onChange={(e) => setFormData({ ...formData, member3Name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]">Email Address</label>
                        <input
                          type="email"
                          className="input mt-1.5"
                          placeholder="Email"
                          value={formData.member3Email}
                          onChange={(e) => setFormData({ ...formData, member3Email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]">Phone Number</label>
                        <input
                          type="tel"
                          className="input mt-1.5"
                          placeholder="Phone"
                          value={formData.member3Phone}
                          onChange={(e) => setFormData({ ...formData, member3Phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]">GitHub Handle</label>
                        <input
                          className="input mt-1.5 font-mono"
                          placeholder="GitHub handle"
                          value={formData.member3Github}
                          onChange={(e) => setFormData({ ...formData, member3Github: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

              {/* Member 4 Section (Optional) */}
              <div className="rounded-xl border border-sand-border/15 bg-[#140e0a]/40 p-5">
                <h3 className="font-serif text-base font-normal text-[#f0eae1] flex items-center justify-between">
                  <span>Member 4 (Optional)</span>
                  <span className="font-mono text-[10px] text-[#8e7a68]">Optional</span>
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]">Full Name</label>
                    <input
                      className="input mt-1.5"
                      placeholder="Full Name"
                      value={formData.member4Name}
                      onChange={(e) => setFormData({ ...formData, member4Name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]">Email Address</label>
                    <input
                      type="email"
                      className="input mt-1.5"
                      placeholder="Email"
                      value={formData.member4Email}
                      onChange={(e) => setFormData({ ...formData, member4Email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]">Phone Number</label>
                    <input
                      type="tel"
                      className="input mt-1.5"
                      placeholder="Phone"
                      value={formData.member4Phone}
                      onChange={(e) => setFormData({ ...formData, member4Phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]">GitHub Handle</label>
                    <input
                      className="input mt-1.5 font-mono"
                      placeholder="GitHub handle"
                      value={formData.member4Github}
                      onChange={(e) => setFormData({ ...formData, member4Github: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              </div>
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
                    Project Working Title *
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
                    Planned Technology Stack *
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
                    Problem Statement & Scope *
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

                {/* Proposal File Upload Section */}
                <div className="sm:col-span-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8e7a68]" htmlFor="proposalPdf">
                    Proposal Architecture Deck / PDF (Optional, max 5 MB, max 7 pages)
                  </label>

                  <div className="mt-2 flex flex-col gap-3">
                    <input
                      ref={fileInputRef}
                      id="proposalPdf"
                      type="file"
                      accept=".pdf,.pptx"
                      onChange={handleFileUpload}
                      className="input file:mr-4 file:rounded-full file:border-0 file:bg-sand-border/20 file:px-4 file:py-1 file:font-mono file:text-xs file:text-[#f0eae1] hover:file:bg-sand-border/40"
                    />

                    {proposalFileInfo && (
                      <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 text-xs font-mono">
                        <div className="flex items-center gap-2.5 text-emerald-300">
                          <CheckCircle2 size={16} />
                          <span>
                            <strong>{proposalFileInfo.originalName}</strong> ({(proposalFileInfo.sizeBytes / (1024 * 1024)).toFixed(2)} MB) attached locally.
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="text-xs text-[#9e8e7c] hover:text-rose-400 font-mono transition-colors ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Registration Summary & UPI Payment */}
          {step === 5 && (
            <div>
              <div className="border-b border-sand-border/15 pb-4">
                <h2 className="font-serif text-2xl font-normal text-[#f0eae1]">
                  Review & Confirm Registration
                </h2>
                <p className="text-xs text-[#9e8e7c] mt-1">
                  Verify participation details and complete manual UPI payment reference.
                </p>
              </div>

              {/* Review Summary */}
              <div className="mt-6 divide-y divide-sand-border/15 rounded-xl border border-sand-border/15 bg-[#140e0a]/40 p-6 font-mono text-xs">
                <div className="flex justify-between py-2.5">
                  <span className="text-[#8e7a68]">Entry Format:</span>
                  <span className="font-semibold text-[#f0eae1]">Squad (1–4 Members)</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-[#8e7a68]">Team Name:</span>
                  <span className="font-semibold text-[#f0eae1]">{formData.teamName || "—"}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-[#8e7a68]">Lead Participant:</span>
                  <span className="text-[#f0eae1]">
                    {formData.fullName} ({formData.github})
                  </span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-[#8e7a68]">Project Title:</span>
                  <span className="text-[#f0eae1]">{formData.projectTitle}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-[#8e7a68]">Registration Fee:</span>
                  <span className="font-semibold text-[#c89f6d]">
                    {event.squadFee}
                  </span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-[#8e7a68]">Proposal Deck:</span>
                  <span className="text-[#9e8e7c]">
                    {proposalFileInfo ? `${proposalFileInfo.originalName} (${(proposalFileInfo.sizeBytes / (1024 * 1024)).toFixed(2)} MB)` : "None attached"}
                  </span>
                </div>
              </div>

              {/* Organiser UPI Payment Section */}
              <div className="mt-6 rounded-2xl border border-[#c89f6d]/30 bg-[#160f0b]/80 p-6">
                <div className="flex items-center gap-2 border-b border-sand-border/20 pb-3">
                  <QrCode size={18} className="text-[#c89f6d]" />
                  <h3 className="font-serif text-lg font-normal text-[#f0eae1]">
                    Manual UPI Payment ({event.squadFee})
                  </h3>
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-6 items-center">
                  {/* QR Image Container */}
                  <div className="flex flex-col items-center justify-center p-4 bg-[#1f150f] rounded-xl border border-sand-border/20 text-center">
                    <img
                      src="/images/payment-qr-200.png"
                      alt="Official Payment QR (₹200)"
                      className="h-44 w-44 object-contain rounded-lg bg-white p-2"
                      onError={(e) => {
                        // If image not yet uploaded by organizer, show official instructions card
                        (e.target as HTMLElement).style.display = "none";
                        const fallback = document.getElementById("qr-fallback");
                        if (fallback) fallback.style.display = "block";
                      }}
                    />
                    <div id="qr-fallback" className="hidden py-6">
                      <QrCode size={48} className="mx-auto text-[#c89f6d] mb-2" />
                      <p className="font-serif text-sm text-[#f0eae1]">Official Organiser QR Code</p>
                      <p className="font-mono text-[11px] text-[#9e8e7c] mt-1">
                        Scan via GPay / PhonePe / Paytm / BHIM
                      </p>
                    </div>
                    <span className="mt-2 font-mono text-[11px] text-[#c89f6d]">
                      UPI ID: singhshivraj89969@okaxis
                    </span>
                  </div>

                  {/* Payment Instructions & UTR input */}
                  <div className="space-y-4">
                    <p className="text-xs text-[#9e8e7c] leading-relaxed">
                      1. Scan the official QR code via GPay, PhonePe, Paytm, or any UPI app.<br />
                      2. Transfer the exact amount of <strong className="text-[#f0eae1]">₹200</strong> (incorrect amounts will not be verified).<br />
                      3. Mandatory: Mention your team name in the UPI payment note before paying.<br />
                      4. Submit the 12-digit UPI UTR / Transaction Reference Number below to confirm your slot.

                    </p>

                    <div>
                      <label
                        htmlFor="transactionReference"
                        className="block font-mono text-xs uppercase tracking-wider text-[#8e7a68] mb-1.5"
                      >
                        UPI Transaction Reference / UTR Number *
                      </label>
                      <input
                        id="transactionReference"
                        className="input font-mono text-sm tracking-wider"
                        placeholder="e.g. 432109876543 / UPI-REF-XXX"
                        value={formData.transactionReference}
                        onChange={(e) => setFormData({ ...formData, transactionReference: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Integrity Declaration */}
              <div className="mt-6 rounded-xl border border-sand-border/15 bg-[#140e0a]/40 p-4">
                <label className="flex items-start gap-3 text-xs leading-relaxed text-[#9e8e7c] cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    defaultChecked
                    className="mt-0.5 h-4 w-4 rounded border-sand-border/30 bg-[#120d09] accent-[#c89f6d]"
                  />
                  <span>
                    I confirm that all team members have consented to this registration and that our hackathon submission will represent our original work. I understand that our participation spot is confirmed upon verification of our payment reference.
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
              disabled={step === 1 || submitting}
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
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Final Registration <Check size={16} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
