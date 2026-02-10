import type { Metadata } from 'next';
import { PERSONAL } from '@/lib/constants';
import './globals.css';

export const metadata: Metadata = {
  title: `${PERSONAL.name} — ${PERSONAL.tagline}`,
  description: PERSONAL.bio,
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
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --font-instrument-serif: 'Instrument Serif', Georgia, serif;
                --font-general-sans: 'General Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif;
                --font-jetbrains-mono: 'JetBrains Mono', 'Courier New', monospace;
              }
            `,
          }}
        />
      </head>
      <body className="bg-charcoal text-offwhite font-sans">
        {children}
      </body>
    </html>
  );
}
