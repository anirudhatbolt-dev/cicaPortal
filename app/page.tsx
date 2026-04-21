'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <header className="bg-[#1a3a5c] py-4 px-8 flex items-center gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-[#1a3a5c] font-black text-sm">C</span>
          </div>
          <span className="text-white font-bold text-xl tracking-wide">CICA</span>
        </div>
        <span className="text-slate-300 text-sm ml-2 border-l border-slate-500 pl-3">
          Insurance Portal
        </span>
      </header>

      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-lg border border-slate-200 rounded-sm overflow-hidden">
            <div className="bg-[#1a3a5c] px-8 py-5">
              <h1 className="text-white font-semibold text-lg tracking-wide">
                Agent Portal Login
              </h1>
              <p className="text-slate-300 text-sm mt-1">
                Please enter your credentials to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-sm">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3a5c] focus:ring-1 focus:ring-[#1a3a5c] transition-colors"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3a5c] focus:ring-1 focus:ring-[#1a3a5c] transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a3a5c] hover:bg-[#15304e] text-white font-semibold py-2.5 px-4 rounded-sm text-sm tracking-wide transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? 'Signing in...' : 'Login'}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            &copy; {new Date().getFullYear()} CICA Insurance. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
