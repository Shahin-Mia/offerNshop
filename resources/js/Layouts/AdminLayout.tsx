import React, { ReactNode } from 'react';
import Sidebar from '@/Components/Sidebar';
import TopBar from '@/Components/TopBar';

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title = 'Dashboard' }: AdminLayoutProps) {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
                <TopBar title={title} />

                <main className="p-6 mt-16 flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
