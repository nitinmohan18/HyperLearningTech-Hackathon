"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Users,
  CheckCircle2,
  XCircle,
  FileDown,
  Mail,
  RefreshCw,
  ExternalLink,
  Loader2,
  ChevronRight,
  X,
  CreditCard,
} from "lucide-react";

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterType, setFilterType] = useState("ALL");
  const [selectedReg, setSelectedReg] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (filterStatus !== "ALL") params.set("status", filterStatus);
      if (filterType !== "ALL") params.set("type", filterType);

      const res = await fetch(`/api/admin/registrations?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load registrations");
      const data = await res.json();
      setRegistrations(data.registrations || []);

      if (selectedReg) {
        const updated = data.registrations.find((r: any) => r.id === selectedReg.id);
        if (updated) setSelectedReg(updated);
      }
    } catch (err: any) {
      console.error(err);
      setMessage({ text: err.message || "Failed to load registrations", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [search, filterStatus, filterType, selectedReg]);

  useEffect(() => {
    fetchRegistrations();
  }, [filterStatus, filterType]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRegistrations();
  };

  const handleVerifyPayment = async (regId: string) => {
    setActionLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/payments/${regId}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verifiedBy: "Admin Organiser" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to verify payment");
      setMessage({ text: "Payment successfully verified!", type: "success" });
      await fetchRegistrations();
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectPayment = async (regId: string) => {
    setActionLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/payments/${regId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: "Transaction reference invalid or not found on bank statement" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reject payment");
      setMessage({ text: "Payment rejected.", type: "success" });
      await fetchRegistrations();
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmSpot = async (regId: string) => {
    setActionLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/registrations/${regId}/confirm`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to confirm registration");
      setMessage({ text: "Spot confirmed! Confirmation email queued for delivery.", type: "success" });
      await fetchRegistrations();
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelRegistration = async (regId: string) => {
    if (!confirm("Are you sure you want to cancel this registration?")) return;
    setActionLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/registrations/${regId}/reject`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to cancel registration");
      setMessage({ text: "Registration cancelled.", type: "success" });
      await fetchRegistrations();
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDownloadProposal = async (regId: string) => {
    try {
      const res = await fetch(`/api/admin/proposals/${regId}/download`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to get download URL");
      window.open(data.downloadUrl, "_blank");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleRetryEmail = async (emailId: string) => {
    try {
      const res = await fetch(`/api/admin/emails/${emailId}/retry`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to retry email");
      alert("Email delivery retried successfully!");
      await fetchRegistrations();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#c89f6d]">
              Live Participant Roster
            </span>
          </div>
          <h1 className="font-serif text-3xl font-normal text-[#f0eae1] mt-1">
            Registration Management
          </h1>
          <p className="mt-1 text-xs text-[#9e8e7c]">
            Inspect live applicant rosters, cross-verify UPI payments, and issue official spot confirmations.
          </p>
        </div>

        <button
          onClick={() => fetchRegistrations()}
          className="btn-secondary h-9 text-xs px-4 self-start sm:self-auto"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh Records
        </button>
      </div>

      {message && (
        <div
          className={`mt-4 rounded-xl border p-4 text-xs flex justify-between items-center ${
            message.type === "success"
              ? "border-emerald-500/30 bg-emerald-950/30 text-emerald-200"
              : "border-red-500/30 bg-red-950/30 text-red-200"
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-sand-muted hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Filters and Search Bar */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:max-w-xs">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8e7a68]" />
          <input
            className="input pl-10 text-xs font-mono"
            placeholder="Search reg ID, team, name, email, github..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <select
          className="input sm:w-44 font-mono text-xs"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="ALL">All Statuses</option>
          <option value="SUBMITTED">Submitted (Pending)</option>
          <option value="CONFIRMED">Spot Confirmed</option>
          <option value="PAYMENT_REJECTED">Payment Rejected</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <select
          className="input sm:w-44 font-mono text-xs"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="ALL">All Entry Formats</option>
          <option value="SOLO">Solo (Legacy)</option>
          <option value="SQUAD">Squad (₹200)</option>
        </select>
      </div>

      {/* Registrations Table */}
      <div className="mt-6 rounded-xl border border-sand-border/20 bg-[#120d09]/75 backdrop-blur-md overflow-hidden shadow-card">
        {loading && registrations.length === 0 ? (
          <div className="py-20 text-center text-[#8e7a68]">
            <Loader2 size={24} className="animate-spin mx-auto mb-2" />
            <p className="font-mono text-xs">Loading registrations from database...</p>
          </div>
        ) : registrations.length === 0 ? (
          <div className="py-16 text-center text-[#8e7a68]">
            <Users size={32} className="mx-auto mb-2 text-[#8e7a68]" />
            <p className="font-serif text-lg text-[#f0eae1]">No matching registrations found</p>
            <p className="text-xs text-[#9e8e7c] mt-1">Registrations will appear here upon submission.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-sand-border/20 bg-[#1a120d]/80 text-[#8e7a68] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Reg Number</th>
                  <th className="py-3 px-4">Participant / Team</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Project Title</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-border/10 text-[#f0eae1]">
                {registrations.map((r) => {
                  const lead = r.participants?.[0];
                  return (
                    <tr
                      key={r.id}
                      className="hover:bg-[#1a130e]/60 transition cursor-pointer"
                      onClick={() => setSelectedReg(r)}
                    >
                      <td className="py-3 px-4 font-bold text-[#c89f6d]">
                        {r.registrationNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-serif font-normal text-sm text-[#f0eae1]">
                          {r.teamName || lead?.fullName || "—"}
                        </div>
                        <div className="text-[11px] text-[#8e7a68]">
                          {lead ? `${lead.fullName} (${lead.email})` : "No participants"}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="rounded-full bg-[#201610] border border-sand-border/30 px-2.5 py-0.5 text-[10px] text-[#dfc4a2]">
                          {r.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-[180px] truncate text-[#9e8e7c]">
                        {r.projectTitle || "—"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            r.payment?.status === "VERIFIED"
                              ? "bg-emerald-950/70 border border-emerald-500/30 text-emerald-300"
                              : r.payment?.status === "REJECTED"
                              ? "bg-red-950/70 border border-red-500/30 text-red-300"
                              : "bg-amber-950/70 border border-amber-500/30 text-amber-300"
                          }`}
                        >
                          {r.payment?.status || "PENDING"}
                        </span>
                        {r.payment?.transactionReference && (
                          <div className="text-[10px] text-[#8e7a68] truncate max-w-[120px] mt-0.5">
                            Ref: {r.payment.transactionReference}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            r.status === "CONFIRMED"
                              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                              : r.status === "SUBMITTED"
                              ? "bg-amber-950/80 text-amber-300 border border-amber-500/40"
                              : "bg-neutral-900 text-neutral-400 border border-neutral-700"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReg(r);
                          }}
                          className="btn-secondary h-7 px-3 text-[11px]"
                        >
                          Inspect <ChevronRight size={12} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Selected Registration Detailed Modal / Drawer */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl border border-sand-border/30 bg-[#120d09] p-6 sm:p-8 shadow-card max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-sand-border/20 pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#c89f6d]">
                  Registration Details
                </span>
                <h2 className="font-serif text-2xl font-normal text-[#f0eae1] mt-0.5">
                  {selectedReg.registrationNumber} · {selectedReg.teamName || selectedReg.participants?.[0]?.fullName}
                </h2>
                <p className="text-xs text-[#9e8e7c] mt-1">
                  Format: <span className="text-[#f0eae1] font-semibold">{selectedReg.type}</span> · Fee: ₹{selectedReg.feePaise / 100}
                </p>
              </div>
              <button
                onClick={() => setSelectedReg(null)}
                className="rounded-lg p-1.5 text-[#8e7a68] hover:bg-sand-border/20 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#18110b] p-3 rounded-xl border border-sand-border/15 font-mono text-xs">
              <div>
                <span className="text-[#8e7a68] text-[10px] uppercase">Spot Status:</span>
                <p className="font-semibold text-[#f0eae1]">{selectedReg.status}</p>
              </div>
              <div>
                <span className="text-[#8e7a68] text-[10px] uppercase">Payment Status:</span>
                <p className="font-semibold text-[#c89f6d]">{selectedReg.payment?.status || "PENDING"}</p>
              </div>
              <div>
                <span className="text-[#8e7a68] text-[10px] uppercase">Submitted:</span>
                <p className="text-[#f0eae1]">
                  {selectedReg.submittedAt ? new Date(selectedReg.submittedAt).toLocaleDateString() : "—"}
                </p>
              </div>
              <div>
                <span className="text-[#8e7a68] text-[10px] uppercase">Payment Ref:</span>
                <p className="text-[#f0eae1] truncate">{selectedReg.payment?.transactionReference || "None"}</p>
              </div>
            </div>

            {/* Participant Roster */}
            <div className="mt-6">
              <h3 className="font-serif text-base font-normal text-[#f0eae1] border-b border-sand-border/15 pb-2">
                Participant Roster ({selectedReg.participants?.length || 0})
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {selectedReg.participants?.map((p: any, i: number) => (
                  <div
                    key={p.id}
                    className="rounded-xl border border-sand-border/20 bg-[#160f0a] p-4 font-mono text-xs space-y-1.5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-serif font-normal text-sm text-[#f0eae1]">
                        #{i + 1} {p.fullName}
                      </span>
                      <span className="rounded bg-[#2a1c12] text-[#c89f6d] px-2 py-0.5 text-[10px]">
                        {p.role}
                      </span>
                    </div>
                    <div className="text-[#9e8e7c]">Email: <span className="text-[#f0eae1]">{p.email}</span></div>
                    <div className="text-[#9e8e7c]">Phone: <span className="text-[#f0eae1]">{p.phone}</span></div>
                    <div className="text-[#9e8e7c]">College: <span className="text-[#f0eae1]">{p.college}</span></div>
                    <div className="text-[#9e8e7c] flex items-center gap-1.5 pt-1">
                      GitHub:{" "}
                      <a
                        href={`https://github.com/${p.githubUsername}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#c89f6d] hover:underline flex items-center gap-1"
                      >
                        @{p.githubUsername} <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Proposal & Deck */}
            <div className="mt-6">
              <h3 className="font-serif text-base font-normal text-[#f0eae1] border-b border-sand-border/15 pb-2">
                Project Information
              </h3>
              <div className="mt-3 space-y-3 font-mono text-xs">
                <div>
                  <span className="text-[#8e7a68] uppercase text-[10px]">Project Title:</span>
                  <p className="text-[#f0eae1] font-serif text-base mt-0.5">{selectedReg.projectTitle}</p>
                </div>
                <div>
                  <span className="text-[#8e7a68] uppercase text-[10px]">Technology Stack:</span>
                  <p className="text-[#dfc4a2] mt-0.5">{selectedReg.techStack}</p>
                </div>
                <div>
                  <span className="text-[#8e7a68] uppercase text-[10px]">Problem Statement:</span>
                  <p className="text-[#9e8e7c] mt-0.5 leading-relaxed bg-[#160f0a] p-3 rounded-lg border border-sand-border/10">
                    {selectedReg.problemStatement}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[#8e7a68] uppercase text-[10px]">Existing Code Disclosure:</span>
                    <p className="text-[#9e8e7c] mt-0.5 bg-[#160f0a] p-2 rounded-lg border border-sand-border/10">
                      {selectedReg.existingCodeDisclosure}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#8e7a68] uppercase text-[10px]">AI Usage Disclosure:</span>
                    <p className="text-[#9e8e7c] mt-0.5 bg-[#160f0a] p-2 rounded-lg border border-sand-border/10">
                      {selectedReg.aiUsageDisclosure}
                    </p>
                  </div>
                </div>

                {/* Attached Proposal File */}
                {selectedReg.proposalFile && (
                  <div className="mt-3 flex items-center justify-between rounded-xl border border-[#c89f6d]/30 bg-[#1c140d]/70 p-3">
                    <div className="flex items-center gap-3">
                      <FileDown size={20} className="text-[#c89f6d]" />
                      <div>
                        <p className="font-semibold text-[#f0eae1]">{selectedReg.proposalFile.originalName}</p>
                        <p className="text-[10px] text-[#8e7a68]">
                          {(selectedReg.proposalFile.sizeBytes / (1024 * 1024)).toFixed(2)} MB · {selectedReg.proposalFile.pageCount} pages/slides
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadProposal(selectedReg.id)}
                      className="btn-primary h-8 px-3 text-xs"
                    >
                      Download Signed URL
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Email Outbox Telemetry */}
            {selectedReg.emailOutbox && selectedReg.emailOutbox.length > 0 && (
              <div className="mt-6">
                <h3 className="font-serif text-base font-normal text-[#f0eae1] border-b border-sand-border/15 pb-2">
                  Email Delivery Logs ({selectedReg.emailOutbox.length})
                </h3>
                <div className="mt-3 divide-y divide-sand-border/10 rounded-xl border border-sand-border/15 bg-[#160f0a] p-3 font-mono text-xs">
                  {selectedReg.emailOutbox.map((em: any) => (
                    <div key={em.id} className="py-2 flex items-center justify-between">
                      <div>
                        <span className="text-[#c89f6d] font-semibold">{em.emailType}</span>
                        <div className="text-[10px] text-[#8e7a68]">{em.recipient}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] ${
                            em.status === "SENT"
                              ? "bg-emerald-950 text-emerald-300"
                              : "bg-red-950 text-red-300"
                          }`}
                        >
                          {em.status}
                        </span>
                        {em.status === "FAILED" && (
                          <button
                            onClick={() => handleRetryEmail(em.id)}
                            className="btn-secondary h-6 px-2 text-[10px]"
                          >
                            Retry
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Administrative Action Buttons */}
            <div className="mt-8 border-t border-sand-border/20 pt-5 flex flex-wrap gap-3 justify-end">
              {selectedReg.payment?.status !== "VERIFIED" && (
                <button
                  disabled={actionLoading}
                  onClick={() => handleVerifyPayment(selectedReg.id)}
                  className="btn-primary h-9 px-4 text-xs bg-emerald-700 hover:bg-emerald-600 border-emerald-600"
                >
                  <CheckCircle2 size={14} /> Verify UPI Payment
                </button>
              )}

              {selectedReg.payment?.status !== "REJECTED" && (
                <button
                  disabled={actionLoading}
                  onClick={() => handleRejectPayment(selectedReg.id)}
                  className="btn-secondary h-9 px-4 text-xs text-red-300 hover:bg-red-950/40"
                >
                  <XCircle size={14} /> Reject Payment
                </button>
              )}

              {selectedReg.status !== "CONFIRMED" && selectedReg.payment?.status === "VERIFIED" && (
                <button
                  disabled={actionLoading}
                  onClick={() => handleConfirmSpot(selectedReg.id)}
                  className="btn-primary h-9 px-4 text-xs"
                >
                  Confirm Participant Spot & Send Email C
                </button>
              )}

              {selectedReg.status !== "CANCELLED" && (
                <button
                  disabled={actionLoading}
                  onClick={() => handleCancelRegistration(selectedReg.id)}
                  className="btn-secondary h-9 px-4 text-xs text-[#8e7a68] hover:text-white"
                >
                  Cancel Registration
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
