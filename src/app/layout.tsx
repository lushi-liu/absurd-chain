import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils'; // We'll create this

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Absurd Chain',
  description: 'A chain of utterly pointless micro-games. How long can you survive the absurdity?',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          'min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 text-white antialiased'
        )}
      >
        {children}
      </body>
    </html>
  );
}
