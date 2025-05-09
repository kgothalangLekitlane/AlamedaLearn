'use client';

import Link from 'next/link';
import { BookOpenCheck, LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import SidebarNavContent from '@/components/SidebarNavContent';
import type { NavItem } from '@/components/SidebarNavContent';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';


interface AppSidebarProps {
  baseNavItems?: NavItem[];
  navItems?: NavItem[]; // For backward compatibility or potential SSR issues
}

export default function AppSidebar({ baseNavItems: propsBaseNavItems, navItems: propsNavItems }: AppSidebarProps) {
  const { isLoggedIn, logout, isLoading, user } = useAuth();
  const actualBaseNavItems = propsBaseNavItems || propsNavItems || [];

  return (
    <Sidebar className="border-r hidden md:flex flex-col bg-card shadow-md">
      <SidebarHeader className="p-4 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpenCheck className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">AlamedaLearn</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        {/* Pass resolved nav items to SidebarNavContent */}
        <SidebarNavContent baseNavItems={actualBaseNavItems} />
      </SidebarContent>
      <SidebarFooter className="p-4 border-t space-y-2">
        {isLoading ? (
          <Skeleton className="h-8 w-full" />
        ) : isLoggedIn && (
          <Button variant="ghost" onClick={logout} className="w-full justify-start text-muted-foreground hover:text-primary">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        )}
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} AlamedaLearn</p>
      </SidebarFooter>
    </Sidebar>
  );
}
