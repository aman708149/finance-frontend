"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-900">

            {/* Sidebar */}
            <Sidebar open={sidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">

                {/* Navbar */}
                <Navbar toggleSidebar={toggleSidebar} />

                {/* Page Content */}
                <main className="p-2 flex-1 overflow-auto">
                    {children}
                </main>

            </div>

        </div>
    );
}