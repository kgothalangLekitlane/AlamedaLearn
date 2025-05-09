
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';
import type { NavItem } from '@/components/SidebarNavContent';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AuthProvider } from '@/contexts/AuthContext'; // New

export const metadata: Metadata = {
  title: 'AlamedaLearn',
  description: 'Your personalized learning platform for the South African curriculum.',
};

// These are now base nav items, auth-specific items will be added dynamically
const baseNavItems: NavItem[] = [
  { href: '/', title: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/courses', title: 'Courses', icon: 'BookCopy' },
  { href: '/study-planner', title: 'AI Study Planner', icon: 'BrainCircuit' },
  { href: '/surveys', title: 'Surveys', icon: 'ClipboardList' }, // Added Surveys
  { href: '/subscription', title: 'Subscription', icon: 'CreditCard' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider> {/* New Wrapper */}
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar baseNavItems={baseNavItems} />
              <div className="flex flex-1 flex-col">
                <AppHeader baseNavItems={baseNavItems} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-background">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </AuthProvider> {/* New Wrapper */}
        <Toaster />
      </body>
    </html>
  );
}

