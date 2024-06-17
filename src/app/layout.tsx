import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Main } from '@/components/layout/main';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eth-Tracker',
  description: 'Track your Ethereum transactions with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Main>{children}</Main>
      </body>
    </html>
  );
}
