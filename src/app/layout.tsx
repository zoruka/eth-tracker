import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Main } from '@/components/layout/main';
import { site } from '@/config/site';
import { Footer } from '@/components/layout/footer';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: site.name,
  metadataBase: new URL(site.url),
  description: site.description,
  keywords: [
    'ethereum',
    'eth',
    'blockchain',
    'cryptocurrency',
    'balance',
    'transactions',
    'history',
    'account',
  ],

  authors: [
    {
      name: 'zoruka',
      url: 'https://zoruka.xyz',
    },
  ],
  creator: 'zoruka',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    title: site.name,
    description: site.description,
    siteName: site.name,
  },

  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    images: [],
    creator: '@_zoruka',
  },

  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <body className={inter.className}>
        <Navbar />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}
