
'use client'; 

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BookOpenCheck } from 'lucide-react';
import type { NavItem } from '@/components/SidebarNavContent';
import SidebarNavContent from '@/components/SidebarNavContent'; 
import { useAuth } from '@/contexts/AuthContext'; // New
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

interface AppHeaderProps {
  baseNavItems: NavItem[]; // Changed from navItems
}

export default function AppHeader({ baseNavItems }: AppHeaderProps) {
  const { isLoggedIn, user, logout, isLoading } = useAuth(); // New

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center space-x-2 mr-auto">
          <BookOpenCheck className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">AlamedaLearn</span>
        </Link>
        
        <div className="flex items-center gap-3">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </>
          ) : isLoggedIn ? (
            <>
              {user && <span className="text-sm hidden sm:inline">Welcome, {user.name.split(' ')[0]}</span>}
              <Button variant="outline" onClick={logout} size="sm">Logout</Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
        
        <div className="md:hidden ml-2"> {/* Ensure mobile menu trigger is on the right */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="p-4 border-b">
                 <Link href="/" className="flex items-center space-x-2 mb-4">
                    <BookOpenCheck className="h-7 w-7 text-primary" />
                    <span className="text-lg font-bold text-primary">AlamedaLearn</span>
                  </Link>
              </div>
              <SidebarNavContent baseNavItems={baseNavItems} isMobile={true} />
              {/* Mobile specific auth buttons */}
              <div className="p-4 mt-auto border-t">
                {isLoading ? (
                  <Skeleton className="h-8 w-full" />
                ) : isLoggedIn ? (
                  <Button variant="outline" onClick={logout} className="w-full">Logout</Button>
                ) : (
                  <div className="space-y-2">
                    <Button asChild className="w-full">
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full">
                      <Link href="/login">Login</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

