"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [sent,setSent]=useState(false);
  return <div className="container-site grid min-h-[620px] place-items-center py-16"><div className="card w-full max-w-md p-6 sm:p-8"><p className="text-xs uppercase tracking-widest text-cyan">Participant access</p><h1 className="mt-3 text-3xl font-semibold">Welcome back.</h1>{sent?<div className="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm text-emerald-300">Demo login submitted. No account or authentication is connected.</div>:<form className="mt-7 space-y-4" onSubmit={e=>{e.preventDefault();setSent(true)}}><div><label className="mb-2 block text-sm" htmlFor="email">Email</label><input id="email" type="email" required className="input" placeholder="you@example.com"/></div><div><label className="mb-2 block text-sm" htmlFor="password">Password</label><input id="password" type="password" required className="input" placeholder="••••••••"/></div><button className="btn-primary w-full" type="submit">Login</button></form>}<p className="mt-6 text-center text-sm text-slate-400">No account? <Link href="/register" className="text-cyan">Register now</Link></p></div></div>;
}