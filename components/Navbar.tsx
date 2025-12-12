import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-red-600 relative z-10 shadow-[0_0_10px_rgba(220,38,38,0.5)]">
               <img 
                 src="https://pbs.twimg.com/media/G77g1M_agAUIBqb?format=jpg&name=large" 
                 alt="$AIM Logo" 
                 className="h-full w-full object-cover" 
               />
            </div>
            <span className="font-tech text-xl font-bold tracking-wider text-white">
              AMERICAN<span className="text-red-500">INTEL</span> MODEL
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#chat" className="hover:text-red-500 transition-colors px-3 py-2 rounded-md text-sm font-medium">Intel Chat</a>
              <a href="#mission" className="hover:text-blue-500 transition-colors px-3 py-2 rounded-md text-sm font-medium">Mission</a>
              <a href="#intel" className="hover:text-white text-slate-300 transition-colors px-3 py-2 rounded-md text-sm font-medium">The Source</a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white text-black hover:bg-slate-200 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow $AIM
              </a>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#chat" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Intel Chat</a>
            <a href="#mission" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Mission</a>
            <a href="https://x.com" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Twitter / X</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;