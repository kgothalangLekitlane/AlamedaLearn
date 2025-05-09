import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BookOpenCheck } from 'lucide-react';
import type { NavItem } from '@/components/SidebarNavContent'; // Corrected import path
import SidebarNavContent from '@/components/SidebarNavContent'; 

interface AppHeaderProps {
  navItems: NavItem[];
}

export default function AppHeader({ navItems }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpenCheck className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">Alameda Lab</span>
        </Link>

        {/* Desktop Navigation (can be added here if needed, or rely on sidebar) */}
        {/* <nav className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {item.title}
            </Link>
          ))}
        </nav> */}
        
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="p-4">
                 <Link href="/" className="flex items-center space-x-2 mb-4">
                    <BookOpenCheck className="h-7 w-7 text-primary" />
                    <span className="text-lg font-bold text-primary">Alameda Lab</span>
                  </Link>
              </div>
              <SidebarNavContent navItems={navItems} isMobile={true} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
