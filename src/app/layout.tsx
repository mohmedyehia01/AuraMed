import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Medical Dashboard System',
  description: 'Advanced healthcare management platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // التعديل هنا: lang="en" و dir="ltr"
    <html lang="en" dir="ltr">
      <body className="antialiased bg-slate-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}