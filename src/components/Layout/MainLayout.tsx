import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';
interface MainLayoutProps {
  children?: React.ReactNode;
}
export function MainLayout({
  children
}: MainLayoutProps) {
  return <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-6">{children || <Outlet />}</main>
    </div>;
}