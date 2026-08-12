"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CreditCard, Users, Image as ImageIcon } from "lucide-react";
import { useIdentityStore } from "@/lib/store";

export default function Landing({ onStart }: { onStart: () => void }) {
  const { setFrameId } = useIdentityStore();

  const handleSelect = (id: string) => {
    setFrameId(id);
    onStart();
  };

  return (
    <div className="flex flex-col items-center w-full pb-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center space-y-6 max-w-3xl pt-10 pb-20"
      >
        <a 
          href="https://hhgoa.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-hh-yellow/10 border border-hh-yellow/30 px-4 py-1.5 rounded-full text-sm font-medium text-hh-yellow font-space-mono hover:bg-hh-yellow/20 transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Hacker House Goa 2026</span>
        </a>

        <h1 className="text-6xl md:text-8xl font-bebas tracking-wide leading-[0.9]">
          Frame Your <span className="text-hh-pink">Journey</span>
        </h1>
        
        <p className="text-lg md:text-xl text-hh-cream/80 max-w-xl font-jakarta">
          Create your exclusive Hacker House Goa Builder Identity in seconds. 
          Upload a photo, pick your traits, and join the movement.
        </p>
      </motion.div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        
        {/* Card 1: Builder ID */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[#032A1C] border border-[#06442D] rounded-3xl p-8 flex flex-col h-full relative overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.1)]"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-hh-yellow/20 blur-[50px] rounded-full pointer-events-none"></div>
          
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-space-mono text-hh-yellow border border-hh-yellow/30 bg-hh-yellow/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Official Pass • 1055 x 1491 px
            </span>
            <CreditCard className="text-hh-yellow w-6 h-6" />
          </div>
          
          <h3 className="text-3xl font-yatra text-hh-yellow mb-4">GENERATE BUILDER ID</h3>
          <p className="text-sm text-hh-cream/70 font-jakarta mb-6 flex-grow">
            Create your personalized event pass using the official Goa master template. Add your photo, builder name, team handle, and generate your unique builder serial number.
          </p>
          
          <ul className="text-sm text-hh-cream/80 font-jakarta space-y-2 mb-8">
            <li className="flex items-center"><Sparkles className="w-3 h-3 mr-2 text-hh-yellow"/> Official Master Template</li>
            <li className="flex items-center"><Sparkles className="w-3 h-3 mr-2 text-hh-yellow"/> Custom Photo Compositing</li>
            <li className="flex items-center"><Sparkles className="w-3 h-3 mr-2 text-hh-yellow"/> Unique Serial Number</li>
          </ul>

          <button onClick={() => handleSelect("frame1")} className="w-full py-4 rounded-xl bg-hh-yellow hover:bg-hh-yellow/90 text-hh-green font-bold font-jakarta flex items-center justify-center transition-colors">
            GENERATE BUILDER ID <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </motion.div>

        {/* Card 2: Crew Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[#032A1C] border border-[#06442D] rounded-3xl p-8 flex flex-col h-full relative overflow-hidden shadow-[0_0_40px_rgba(255,0,122,0.15)]"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-hh-pink/20 blur-[50px] rounded-full pointer-events-none"></div>
          
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-space-mono text-hh-pink border border-hh-pink/30 bg-hh-pink/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Squad Badge • 1024 x 1024 px
            </span>
            <Users className="text-hh-pink w-6 h-6" />
          </div>
          
          <h3 className="text-3xl font-yatra text-white mb-4">GENERATE CREW FRAME</h3>
          <p className="text-sm text-hh-cream/70 font-jakarta mb-6 flex-grow">
            Assemble your squad! Custom team frame generator for up to 3 squad members with avatars, role tags, squad motto, and tropical hacker house badges.
          </p>
          
          <ul className="text-sm text-hh-cream/80 font-jakarta space-y-2 mb-8">
            <li className="flex items-center"><Sparkles className="w-3 h-3 mr-2 text-hh-pink"/> Up to 3 Squad Members</li>
            <li className="flex items-center"><Sparkles className="w-3 h-3 mr-2 text-hh-pink"/> Custom Roles & Motto</li>
            <li className="flex items-center"><Sparkles className="w-3 h-3 mr-2 text-hh-pink"/> Official Goa Master Template</li>
          </ul>

          <button onClick={() => handleSelect("frame3")} className="w-full py-4 rounded-xl bg-hh-pink hover:bg-hh-pink/90 text-white font-bold font-jakarta flex items-center justify-center transition-colors">
            GENERATE CREW FRAME <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </motion.div>

        {/* Card 3: Goa Vibes Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-[#032A1C] border border-[#06442D] rounded-3xl p-8 flex flex-col h-full relative overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.1)]"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00F0FF]/20 blur-[50px] rounded-full pointer-events-none"></div>
          
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-space-mono text-[#00F0FF] border border-[#00F0FF]/30 bg-[#00F0FF]/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Social Square • 1080 x 1080 px
            </span>
            <ImageIcon className="text-[#00F0FF] w-6 h-6" />
          </div>
          
          <h3 className="text-3xl font-yatra text-white mb-4">GENERATE GOA FRAME</h3>
          <p className="text-sm text-hh-cream/70 font-jakarta mb-6 flex-grow">
            The classic square PFP frame with neon Beach Club vibes. Perfect for your X (Twitter) profile picture or Instagram post to announce you are coming to Goa.
          </p>
          
          <ul className="text-sm text-hh-cream/80 font-jakarta space-y-2 mb-8">
            <li className="flex items-center"><Sparkles className="w-3 h-3 mr-2 text-[#00F0FF]"/> Neon Beach Club Sign</li>
            <li className="flex items-center"><Sparkles className="w-3 h-3 mr-2 text-[#00F0FF]"/> 1:1 Square Aspect Ratio</li>
            <li className="flex items-center"><Sparkles className="w-3 h-3 mr-2 text-[#00F0FF]"/> Perfect for PFP</li>
          </ul>

          <button onClick={() => handleSelect("frame2")} className="w-full py-4 rounded-xl bg-[#00F0FF] hover:bg-[#00F0FF]/90 text-hh-green font-bold font-jakarta flex items-center justify-center transition-colors">
            GENERATE GOA FRAME <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </motion.div>

      </div>
    </div>
  );
}
