import Head from 'next/head';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Launch from '@/components/Launch';
import { Navbar } from '@/components/Layout/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>4337 Guardian GPT by Tangible Lab</title>
        <meta name="description" content="This is my tangible" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <>
        <Hero />
        <Features />
        <Launch />
      </>
      <footer className="text-center py-4">
        <p>© 2023 Tangible Lab. All rights reserved.</p>
      </footer>
    </>
  );
}
