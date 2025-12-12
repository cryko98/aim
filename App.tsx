import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChatInterface from './components/ChatInterface';
import TweetEmbed from './components/TweetEmbed';
import { Flag, ShieldCheck, Scale } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; color: string }> = ({ icon, title, desc, color }) => (
  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-slate-600 transition-all hover:bg-slate-900/80 group">
    <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-tech font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black text-white selection:bg-red-900 selection:text-white">
      
      <Navbar />
      
      <main className="relative">
        <Hero />
        
        {/* Chat Section */}
        <div className="relative py-8">
           <div className="absolute inset-0 bg-blue-600/5 skew-y-3 pointer-events-none"></div>
           <ChatInterface />
        </div>

        {/* Features / Mission */}
        <section id="mission" className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-tech font-bold mb-4">THE MISSION</h2>
            <div className="h-1 w-20 bg-red-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Flag className="text-red-500" />}
              color="bg-red-500"
              title="Patriotic Analysis"
              desc="Our AI is calibrated with American values. Get market insights through the lens of freedom and economic dominance."
            />
            <FeatureCard 
              icon={<Scale className="text-white" />}
              color="bg-white"
              title="Legal Intelligence"
              desc="Real-time scanning of SEC filings, CFTC announcements, and Washington legislative updates regarding crypto."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-blue-500" />}
              color="bg-blue-500"
              title="Secure Operations"
              desc="Built on Solana for lightning-fast execution. The most efficient chain for the most efficient nation."
            />
          </div>
        </section>

        {/* Social Proof */}
        <TweetEmbed />

        {/* Footer */}
        <footer className="bg-black border-t border-slate-900 py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="font-tech text-2xl font-bold mb-6 text-slate-200">
              AMERICAN<span className="text-red-600">INTEL</span> MODEL ($AIM)
            </h2>
            <div className="flex justify-center gap-6 mb-8">
               <a href="https://x.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">X.com</a>
               <a href="#" className="text-slate-400 hover:text-white transition-colors">Telegram</a>
               <a href="#" className="text-slate-400 hover:text-white transition-colors">DexScreener</a>
            </div>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              $AIM is a memecoin for entertainment purposes only. Not financial advice. We are not affiliated with any US government agency, though we think they are pretty cool when they support crypto.
            </p>
            <p className="text-slate-700 text-xs mt-4">
              © {new Date().getFullYear()} American Intelligence Model. All Rights Reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;