import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Fake chat generator by SANN404 FORUM GROUP',
  description: 'fake chat generator lengkap version',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-50 min-h-screen" suppressHydrationWarning>{children}</body>
    </html>
  );
}
