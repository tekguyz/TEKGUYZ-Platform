import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | TEKGUYZ',
  description: 'Privacy Policy for TEKGUYZ.',
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen py-32 px-6 md:px-12 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-[100%] pointer-events-none" />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/20 blur-[100px] rounded-[100%] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Breadcrumb */}
        <div className="w-full mb-12 flex justify-start">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Mini-Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50 drop-shadow-[0_0_15px_var(--primary)]">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground font-light">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Document Card */}
        <div className="w-full bg-white/5 dark:bg-zinc-950/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl">
          <div className="prose dark:prose-invert prose-zinc max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-primary prose-a:text-primary prose-a:underline prose-a:decoration-primary/50 hover:prose-a:decoration-primary prose-a:transition-colors">
            
            <h2>1. Introduction</h2>
            <p>
              Welcome to TEKGUYZ. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>

            <h2>2. Data We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul>
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            </ul>

            <h2>3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul>
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>

            <h2>4. AI Usage and Data Processing</h2>
            <p>
              As an AI-focused agency, we utilize artificial intelligence to enhance our services. Any data processed through our AI systems is handled with strict confidentiality and in accordance with industry-standard security protocols. We do not use your personal data to train public AI models without your explicit consent.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>

            <h2>6. Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at <a href="mailto:hello@tekguyz.com">hello@tekguyz.com</a>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
