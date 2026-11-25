"use client";

import { useState, useEffect } from "react";
import { CreditCard, CheckCircle2, XCircle, RefreshCw, Loader2 } from "lucide-react";

export default function PaymentsPage() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/registrations");
      if (!res.ok) throw new Error("Failed to load registrations");
      const data = await res.json();
      setRegistrations(data.registrations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleVerify = async (regId: string) => {
    setActionLoading(regId);
    try {
      const res = await fetch(`/api/admin/payments/${regId}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verifiedBy: "Admin Organiser" }),
      });
      if (!res.ok) throw new Error("Failed to verify payment");
      await fetchPayments();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (regId: string) => {
    setActionLoading(regId);
    try {
      const res = await fetch(`/api/admin/payments/${regId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: "Transaction reference invalid or not found on bank statement" }),
      });
      if (!res.ok) throw new Error("Failed to reject payment");
      await fetchPayments();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = registrations.filter((r) => {
    if (filter === "ALL") return true;
    return r.payment?.status === filter;
  });

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#c89f6d]">
              Financial Telemetry
            </span>
          </div>
          <h1 className="font-serif text-3xl font-normal text-[#f0eae1] mt-1">
            Payment Verification
          </h1>
          <p className="mt-1 text-xs text-[#9e8e7c]">
            Review incoming manual UPI / GPay transaction references against official bank statements.
          </p>
        </div>

        <button
          onClick={fetchPayments}
          className="btn-secondary h-9 text-xs px-4 self-start sm:self-auto"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <select
          className="input sm:w-52 font-mono text-xs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ALL">All Payment Statuses</option>
          <option value="PENDING">Pending Verification</option>
          <option value="VERIFIED">Verified</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <div className="mt-6 rounded-xl border border-sand-border/20 bg-[#120d09]/75 backdrop-blur-md overflow-hidden shadow-card">
        {loading && registrations.length === 0 ? (
          <div className="py-20 text-center text-[#8e7a68]">
            <Loader2 size={24} className="animate-spin mx-auto mb-2" />
            <p className="font-mono text-xs">Loading payments from database...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-[#8e7a68]">
            <CreditCard size={32} className="mx-auto mb-2 text-[#8e7a68]" />
            <p className="font-serif text-lg text-[#f0eae1]">No payment records found</p>
            <p className="text-xs text-[#9e8e7c] mt-1">Payment records are recorded automatically upon registration submission.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-sand-border/20 bg-[#1a120d]/80 text-[#8e7a68] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Reg Number</th>
                  <th className="py-3 px-4">Participant / Team</th>
                  <th className="py-3 px-4">Fee Expected</th>
                  <th className="py-3 px-4">Transaction Ref</th>
                  <th className="py-3 px-4">Verification Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-border/10 text-[#f0eae1]">
                {filtered.map((r) => {
                  const lead = r.participants?.[0];
                  const p = r.payment;
                  const isBusy = actionLoading === r.id;
                  return (
                    <tr key={r.id} className="hover:bg-[#1a130e]/60 transition">
                      <td className="py-3 px-4 font-bold text-[#c89f6d]">
                        {r.registrationNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-serif font-normal text-sm text-[#f0eae1]">
                          {r.teamName || lead?.fullName || "—"}
                        </div>
                        <div className="text-[11px] text-[#8e7a68]">
                          {lead ? lead.email : ""}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#f0eae1]">
                        ₹{r.feePaise / 100}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-xs bg-[#1f150f] px-2 py-1 rounded border border-sand-border/20 text-[#dfc4a2]">
                          {p?.transactionReference || "No reference provided"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                            p?.status === "VERIFIED"
                              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                              : p?.status === "REJECTED"
                              ? "bg-red-950/80 text-red-300 border border-red-500/40"
                              : "bg-amber-950/80 text-amber-300 border border-amber-500/40"
                          }`}
                        >
                          {p?.status || "PENDING"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        {p?.status !== "VERIFIED" && (
                          <button
                            disabled={isBusy}
                            onClick={() => handleVerify(r.id)}
                            className="btn-primary h-7 px-2.5 text-[11px] bg-emerald-700 hover:bg-emerald-600 border-emerald-600"
                          >
                            <CheckCircle2 size={12} /> Verify
                          </button>
                        )}
                        {p?.status !== "REJECTED" && (
                          <button
                            disabled={isBusy}
                            onClick={() => handleReject(r.id)}
                            className="btn-secondary h-7 px-2.5 text-[11px] text-red-300 hover:bg-red-950/40"
                          >
                            <XCircle size={12} /> Reject
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
