"use client";

import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";

export default function AdminLogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="mt-4 flex w-full items-center gap-2 rounded-lg border border-red-500/20 bg-red-950/20 px-3 py-2 text-xs font-medium text-red-300 transition-colors hover:bg-red-950/40"
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <LogOut size={14} />}
      Exit Admin Session
    </button>
  );
}
