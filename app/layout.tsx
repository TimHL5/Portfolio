import type { Metadata } from 'next';
import { PERSONAL } from '@/lib/constants';
import './globals.css';

export const metadata: Metadata = {
  title: `${PERSONAL.name} — ${PERSONAL.tagline}`,
  description: PERSONAL.bio,
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: `${PERSONAL.name} — ${PERSONAL.tagline}`,
    description: PERSONAL.bio,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-charcoal text-offwhite font-sans">
        {children}
      </body>
    </html>
  );
}
