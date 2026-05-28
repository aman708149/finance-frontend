import DashboardLayout from '@/component/layout/DashboardLayout';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Fintech',
    description: 'Fintech',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
}
