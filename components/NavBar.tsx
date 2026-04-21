'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, LogOut } from 'lucide-react';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItemProps {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
  isActive?: boolean;
}

function NavItem({ label, href, dropdown, isActive }: NavItemProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (dropdown) {
    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex items-center gap-1 px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
            isActive
              ? 'text-white border-b-2 border-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          {label}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div className="absolute left-0 top-full mt-0.5 bg-white border border-slate-200 shadow-lg rounded-sm min-w-[200px] z-50">
            {dropdown.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1a3a5c] transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={href ?? '#'}
      className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
        isActive
          ? 'text-white border-b-2 border-white'
          : 'text-slate-300 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  }

  return (
    <header className="bg-[#1a3a5c] shadow-md">
      <div className="flex items-center h-14 px-6">
        <div className="flex items-center gap-2 mr-8">
          <div className="w-7 h-7 bg-white rounded flex items-center justify-center shrink-0">
            <span className="text-[#1a3a5c] font-black text-xs">C</span>
          </div>
          <span className="text-white font-bold text-base tracking-wide">CICA</span>
        </div>

        <nav className="flex items-center gap-1 flex-1">
          <NavItem
            label="DASHBOARD"
            href="/dashboard"
            isActive={pathname === '/dashboard'}
          />
          <NavItem
            label="CUSTOMERS"
            href="/customers"
            isActive={pathname === '/customers'}
          />
          <NavItem
            label="POLICY PAYMENT"
            href="/policy-payment"
            isActive={pathname === '/policy-payment'}
          />
          <NavItem
            label="REPORTS"
            isActive={pathname === '/potential-lapse-report'}
            dropdown={[
              { label: 'Renewal Premium Report', href: '/potential-lapse-report' },
            ]}
          />
          <NavItem
            label="APPLICATIONS"
            isActive={pathname.startsWith('/applications')}
            dropdown={[
              { label: 'New Application', href: '/applications/new' },
              { label: 'Pending Applications', href: '/applications/pending' },
            ]}
          />
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-slate-300 hover:text-white text-sm transition-colors ml-4"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
}
