import { ReactNode } from 'react';
import AdHeader from '../AdHeader/AdHeader';
import AdFooter from '../AdFooter/AdFooter';

interface LayoutProps {
  children: ReactNode;
}

export default function AdLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <AdHeader />
      <main className="flex-1 container mx-auto p-4">{children}</main>
      <AdFooter />
    </div>
  );
}
