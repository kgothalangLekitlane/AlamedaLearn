'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  href: string;
  title: string;
  icon: LucideIcon;
}

interface SidebarNavContentProps {
  navItems: NavItem[];
  isMobile?: boolean; // To adjust styles if needed for mobile sheet
  onLinkClick?: () => void; // Optional: Callback for when a link is clicked, e.g. to close mobile sheet
}

export default function SidebarNavContent({ navItems, isMobile = false, onLinkClick }: SidebarNavContentProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex flex-col gap-2 px-4 py-2', isMobile ? '' : 'mt-4')}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onLinkClick}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent',
            pathname === item.href && 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground',
            isMobile ? 'text-base' : 'text-sm'
          )}
        >
          <item.icon className="h-5 w-5" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
