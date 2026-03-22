import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AiStrategyBot } from '@/components/sections/AiStrategyBot';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#574CFA',
};

export const metadata: Metadata = {
  // REQUIRED: Fixes the metadataBase warning on Netlify build
  metadataBase: new URL('https://tekguyz.com'),
  title: 'TEKGUYZ | Architecting the Advantage',
  description: 'We engineer high-performance AI workflows and digital systems for teams that refuse to lose.',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth relative">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300 flex flex-col min-h-screen relative`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-grow relative">
            {children}
          </main>
          <Footer />
          <AiStrategyBot />
        </ThemeProvider>
      </body>
    </html>
  );
}