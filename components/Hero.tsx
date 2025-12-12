import React, { useState } from 'react';
import { Copy, Check, Star } from 'lucide-react';

const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const CA = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  const handleCopy = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative pt-32 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 text-slate-800/20 text-9xl font-black select-none">USA</div>
        <div className="absolute bottom-20 right-10 text-slate-800/20 text-9xl font-black select-none">AIM</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-500/30 rounded-full px-4 py-1 mb-8 animate-fade-in-up">
          <Star className="h-4 w-4 text-blue-400 fill-blue-400" />
          <span className="text-blue-200 text-sm font-semibold tracking-wide uppercase">Official Solana Department</span>
          <Star className="h-4 w-4 text-red-400 fill-red-400" />
        </div>

        <h1 className="text-5xl md:text-7xl font-tech font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight mb-6 drop-shadow-lg">
          AMERICAN <br className="hidden md:block" />
          <span className="text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.5)]">INTELLIGENCE</span> MODEL
        </h1>

        <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
          The ultimate AI-powered terminal for United States legislative analysis, crypto regulation updates, and patriotic market sentiment.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex flex-col items-center">
                <span className="text-sm text-slate-400 uppercase tracking-widest mb-2 font-semibold">Contract Address ($AIM)</span>
                <button 
                    onClick={handleCopy}
                    className="group relative flex items-center gap-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-blue-500 px-6 py-3 rounded-lg transition-all duration-300"
                >
                    <span className="font-mono text-blue-400 text-sm sm:text-base break-all">{CA}</span>
                    {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-slate-400 group-hover:text-white" />}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;