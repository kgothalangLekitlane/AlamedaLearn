
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, BookCopy, BrainCircuit, CreditCard, Settings, UserCircle, ClipboardList } from 'lucide-react'; 
import { useAuth } from '@/contexts/AuthContext'; 

export interface NavItem {
  href: string;
  title: string;
  icon: string; 
}

interface SidebarNavContentProps {
  baseNavItems: NavItem[];
  isMobile?: boolean; 
  onLinkClick?: () => void; 
}

const iconComponents: { [key: string]: LucideIcon } = {
  LayoutDashboard,
  BookCopy,
  BrainCircuit,
  CreditCard,
  Settings,
  UserCircle, 
  ClipboardList, 
};

export default function SidebarNavContent({ baseNavItems, isMobile = false, onLinkClick }: SidebarNavContentProps) {
  const pathname = usePathname();
  const { isLoggedIn, user } = useAuth(); 

  let navItems = [...baseNavItems]; // Start with base items

  // Update "Courses" to "Subjects" if it exists in baseNavItems
  navItems = navItems.map(item => 
    item.title === 'Courses' ? { ...item, title: 'Subjects', href: '/subjects' } : item
  );
  
  // Add profile link if logged in
  if (isLoggedIn && user) {
    // Ensure profile link is not duplicated if already present from baseNavItems
    if (!navItems.find(item => item.href === '/profile')) {
      navItems.push({ href: '/profile', title: 'My Profile', icon: 'UserCircle' });
    }
  }


  return (
    <nav className={cn('flex flex-col gap-2 px-4 py-2', isMobile ? '' : 'mt-4')}>
      {navItems.map((item) => {
        const IconComponent = iconComponents[item.icon];
        return (
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
            {IconComponent && <IconComponent className="h-5 w-5" />}
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
