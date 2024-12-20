'use client';
import { Sidebar } from "./Sidebar";

interface ClientPageWrapperProps {
  children: React.ReactNode;
}

export const ClientPageWrapper = ({ children }: ClientPageWrapperProps) => {
  return (
    <main className="relative bg-[#010116] min-h-screen">
      <Sidebar />
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-8">
        {children}
      </div>
    </main>
  );
};

export default ClientPageWrapper;