'use client';

import Link from 'next/link';
import { BookOpenCheck } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import SidebarNavContent from '@/components/SidebarNavContent';
import type { NavItem } from '@/components/SidebarNavContent';

interface AppSidebarProps {
  navItems: NavItem[];
}

export default function AppSidebar({ navItems }: AppSidebarProps) {
  return (
    <Sidebar className="border-r hidden md:flex flex-col bg-card shadow-md">
      <SidebarHeader className="p-4 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpenCheck className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">Alameda Lab</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarNavContent navItems={navItems} />
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Alameda Lab</p>
      </SidebarFooter>
    </Sidebar>
  );
}
