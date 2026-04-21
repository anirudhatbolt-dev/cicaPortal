'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import { policies } from '@/lib/data';

type FilterKey =
  | 'PAST DUE'
  | '1 MONTH ARREARS'
  | '2 MONTH ARREARS'
  | 'POTENTIAL LAPSE'
  | 'ALL';

const filterButtons: FilterKey[] = [
  'PAST DUE',
  '1 MONTH ARREARS',
  '2 MONTH ARREARS',
  'POTENTIAL LAPSE',
  'ALL',
];

function getDaysSincePTD(ptd: string): number {
  return Math.floor((Date.now() - new Date(ptd).getTime()) / (1000 * 60 * 60 * 24));
}

function getDynamicStatus(daysSincePTD: number): string {
  if (daysSincePTD <= 0) return 'Premium Paying - Current';
  return 'Premium Paying - Arrears';
}

function matchesFilter(daysSincePTD: number, filter: FilterKey): boolean {
  switch (filter) {
    case 'PAST DUE':
      return daysSincePTD >= 1 && daysSincePTD <= 30;
    case '1 MONTH ARREARS':
      return daysSincePTD >= 31 && daysSincePTD <= 60;
    case '2 MONTH ARREARS':
      return daysSincePTD >= 61 && daysSincePTD <= 90;
    case 'POTENTIAL LAPSE':
      return daysSincePTD > 90;
    case 'ALL':
      return true;
  }
}

const statusStyles: Record<string, string> = {
  'Premium Paying - Current': 'bg-green-100 text-green-700',
  'Premium Paying - Arrears': 'bg-orange-100 text-orange-700',
};

export default function RenewalPremiumReport() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('ALL');

  const enriched = policies.map((p) => ({
    ...p,
    daysSincePTD: getDaysSincePTD(p.ptd),
  }));

  const filtered = enriched.filter((p) => matchesFilter(p.daysSincePTD, activeFilter));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavBar />

      <main className="flex-1 px-6 py-7 max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              Renewal Premium Report
            </h1>
            <p className="text-slate-500 text-xs mt-0.5">
              Agent #85 &mdash; Barnes H &mdash; {filtered.length} record
              {filtered.length !== 1 ? 's' : ''} shown
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {filterButtons.map((btn) => (
              <button
                key={btn}
                onClick={() => setActiveFilter(btn)}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wide rounded-sm border transition-all ${
                  activeFilter === btn
                    ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]'
                    : 'bg-white text-slate-600 border-slate-300 hover:border-[#1a3a5c] hover:text-[#1a3a5c]'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[1100px]">
              <thead>
                <tr className="bg-[#1a3a5c] text-white">
                  <th className="text-left px-3 py-3 text-xs font-semibold tracking-wide whitespace-nowrap">
                    Agent #
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold tracking-wide whitespace-nowrap">
                    Agent Name
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold tracking-wide whitespace-nowrap">
                    Policy #
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold tracking-wide whitespace-nowrap">
                    Owner
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold tracking-wide whitespace-nowrap">
                    PTD
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold tracking-wide whitespace-nowrap">
                    Policy Status
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold tracking-wide whitespace-nowrap">
                    Payment Method
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold tracking-wide whitespace-nowrap">
                    Recurring
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold tracking-wide whitespace-nowrap">
                    Next Payment Date
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold tracking-wide whitespace-nowrap">
                    Mode
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-semibold tracking-wide whitespace-nowrap">
                    Mode Premium
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold tracking-wide whitespace-nowrap">
                    Issue Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={12}
                      className="text-center py-12 text-slate-400 text-sm"
                    >
                      No records found for the selected filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, idx) => {
                    const status = getDynamicStatus(row.daysSincePTD);
                    return (
                      <tr
                        key={row.policyNumber}
                        className={`border-b border-slate-100 transition-colors hover:bg-slate-50 ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                        }`}
                      >
                        <td className="px-3 py-2.5 text-slate-700 whitespace-nowrap">
                          {row.agentNumber}
                        </td>
                        <td className="px-3 py-2.5 text-slate-700 whitespace-nowrap">
                          {row.agentName}
                        </td>
                        <td className="px-3 py-2.5 text-[#1a3a5c] font-medium whitespace-nowrap">
                          {row.policyNumber}
                        </td>
                        <td className="px-3 py-2.5 text-slate-700 whitespace-nowrap font-medium">
                          {row.owner}
                        </td>
                        <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">
                          {row.ptd}
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-sm text-xs font-semibold ${
                              statusStyles[status] ?? 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">
                          {row.paymentMethod}
                        </td>
                        <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">
                          {row.recurring}
                        </td>
                        <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">
                          {row.nextPaymentDate}
                        </td>
                        <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">
                          {row.mode}
                        </td>
                        <td className="px-3 py-2.5 text-slate-700 font-medium whitespace-nowrap text-right">
                          {row.modePremium}
                        </td>
                        <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">
                          {row.issueDate}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {filtered.length > 0 && (
            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Showing {filtered.length} of {policies.length} records
              </span>
              <span className="text-xs text-slate-500">
                Filter:{' '}
                <span className="font-semibold text-[#1a3a5c]">{activeFilter}</span>
              </span>
            </div>
          )}
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
