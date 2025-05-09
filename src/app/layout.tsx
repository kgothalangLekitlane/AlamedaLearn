import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';
import type { NavItem } from '@/components/SidebarNavContent';
import { SidebarProvider } from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: 'Alameda Lab',
  description: 'Your personalized learning platform for the South African curriculum.',
};

const navItems: NavItem[] = [
  { href: '/', title: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/courses', title: 'Courses', icon: 'BookCopy' },
  { href: '/study-planner', title: 'AI Study Planner', icon: 'BrainCircuit' },
  { href: '/subscription', title: 'Subscription', icon: 'CreditCard' },
  // { href: '/settings', title: 'Settings', icon: 'Settings' }, // Example for future
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar navItems={navItems} />
            <div className="flex flex-1 flex-col">
              <AppHeader navItems={navItems} />
              <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-background">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
