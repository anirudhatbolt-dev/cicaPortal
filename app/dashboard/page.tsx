import NavBar from '@/components/NavBar';
import Link from 'next/link';
import { FileText, Users, CreditCard, ChartBar as BarChart2, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavBar />

      <main className="flex-1 px-8 py-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back, Agent 001. Here is your portfolio overview.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-white border border-slate-200 rounded-sm p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Policies
              </span>
              <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#1a3a5c]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800">15</p>
            <p className="text-xs text-slate-400 mt-1">Active portfolio</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-sm p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Past Due
              </span>
              <div className="w-8 h-8 bg-red-50 rounded flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-red-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-red-600">5</p>
            <p className="text-xs text-slate-400 mt-1">Require attention</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-sm p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Potential Lapse
              </span>
              <div className="w-8 h-8 bg-amber-50 rounded flex items-center justify-center">
                <Users className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-amber-600">3</p>
            <p className="text-xs text-slate-400 mt-1">At risk policies</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-sm p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Current
              </span>
              <div className="w-8 h-8 bg-green-50 rounded flex items-center justify-center">
                <BarChart2 className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-green-600">4</p>
            <p className="text-xs text-slate-400 mt-1">Premium paying</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-slate-800">Quick Access</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/reports/renewal-premium"
              className="flex items-center justify-between p-4 border border-slate-200 rounded-sm hover:border-[#1a3a5c] hover:bg-blue-50 transition-all group"
            >
              <div>
                <p className="text-sm font-semibold text-slate-700 group-hover:text-[#1a3a5c]">
                  Renewal Premium Report
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  View all policy renewal data
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1a3a5c] transition-colors" />
            </Link>

            <Link
              href="/customers"
              className="flex items-center justify-between p-4 border border-slate-200 rounded-sm hover:border-[#1a3a5c] hover:bg-blue-50 transition-all group"
            >
              <div>
                <p className="text-sm font-semibold text-slate-700 group-hover:text-[#1a3a5c]">
                  Customers
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage customer records
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1a3a5c] transition-colors" />
            </Link>

            <Link
              href="/policy-payment"
              className="flex items-center justify-between p-4 border border-slate-200 rounded-sm hover:border-[#1a3a5c] hover:bg-blue-50 transition-all group"
            >
              <div>
                <p className="text-sm font-semibold text-slate-700 group-hover:text-[#1a3a5c]">
                  Policy Payment
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Process premium payments
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1a3a5c] transition-colors" />
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-3 px-8 bg-white">
        <p className="text-xs text-slate-400 text-center">
          &copy; {new Date().getFullYear()} CICA Insurance. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
