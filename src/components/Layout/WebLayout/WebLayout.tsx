import { ReactNode } from 'react';
import WebHeader from './../WebHeader/WebHeader';
import WebFooter from './../WebFooter/WebFooter';

interface LayoutProps {
  children: ReactNode;
}

export default function WebLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <WebHeader />
      <main className="flex-1 container mx-auto p-4">{children}</main>
      <WebFooter />
    </div>
  );
}
