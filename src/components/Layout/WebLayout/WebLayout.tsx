import { ReactNode } from 'react';
import WebHeader from './../WebHeader/WebHeader';
import WebFooter from './../WebFooter/WebFooter';

interface LayoutProps {
  children: ReactNode;
}

export default function WebLayout({ children }: LayoutProps) {
  return (
    <div>
      <WebHeader />
      <main>{children}</main>
      <WebFooter />
    </div>
  );
}
