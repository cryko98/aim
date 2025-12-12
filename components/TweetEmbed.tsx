import React, { useEffect } from 'react';

const TweetEmbed: React.FC = () => {
  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    return () => {
      // Cleanup if necessary (usually not needed for this script)
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto my-12 relative group" id="intel">
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-black rounded-xl p-4 border border-slate-800">
          <h3 className="text-center font-tech text-xl mb-4 text-slate-300">CONFIRMED INTEL</h3>
          <div className="flex justify-center">
            <blockquote className="twitter-tweet" data-theme="dark">
              <p lang="en" dir="ltr">
                <a href="https://t.co/..." target="_blank"></a>
              </p>
              &mdash; Marc Andreessen (@pmarca) 
              <a href="https://twitter.com/pmarca/status/1865512835343909209?ref_src=twsrc%5Etfw">December 7, 2024</a>
            </blockquote> 
          </div>
      </div>
    </div>
  );
};

export default TweetEmbed;