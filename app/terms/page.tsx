import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | TEKGUYZ',
  description: 'Terms of Service for TEKGUYZ.',
};

export default function TermsPage() {
  return (
    <main className="relative min-h-screen py-32 px-6 md:px-12 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-[100%] pointer-events-none" />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-500/20 blur-[100px] rounded-[100%] pointer-events-none" />

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
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50 drop-shadow-[0_0_15px_rgba(87,76,250,0.3)]">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground font-light">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Document Card */}
        <div className="w-full bg-white/5 dark:bg-zinc-950/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl">
          <div className="prose dark:prose-invert prose-zinc max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-primary prose-a:text-primary prose-a:underline prose-a:decoration-primary/50 hover:prose-a:decoration-primary prose-a:transition-colors">
            
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing our website and using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on TEKGUYZ&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>attempt to decompile or reverse engineer any software contained on TEKGUYZ&apos;s website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
            </ul>

            <h2>3. Disclaimer</h2>
            <p>
              The materials on TEKGUYZ&apos;s website are provided on an &apos;as is&apos; basis. TEKGUYZ makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2>4. Limitations of Liability</h2>
            <p>
              In no event shall TEKGUYZ or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TEKGUYZ&apos;s website, even if TEKGUYZ or a TEKGUYZ authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>

            <h2>5. AI Solutions and Deliverables</h2>
            <p>
              Our AI workflows and digital infrastructure solutions are provided based on the specifications agreed upon in our service contracts. While we strive for the highest accuracy and performance, AI systems are inherently probabilistic. We do not guarantee 100% accuracy or error-free operation of AI models. Clients are responsible for reviewing and validating AI-generated outputs before deploying them in critical environments.
            </p>

            <h2>6. Revisions and Errata</h2>
            <p>
              The materials appearing on TEKGUYZ&apos;s website could include technical, typographical, or photographic errors. TEKGUYZ does not warrant that any of the materials on its website are accurate, complete or current. TEKGUYZ may make changes to the materials contained on its website at any time without notice.
            </p>

            <h2>7. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which TEKGUYZ operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
