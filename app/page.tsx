"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Landing from "@/components/Landing";
import Editor from "@/components/Editor";

export default function Home() {
  const [step, setStep] = useState<"landing" | "editor">("landing");

  return (
    <main className="relative min-h-screen overflow-x-hidden flex flex-col items-center bg-hh-green">
      
      {/* Global Header */}
      <header className="w-full py-8 flex justify-center items-center z-50">
        <div className="relative flex items-center justify-center select-none">
          <span className="text-hh-yellow font-yatra text-6xl md:text-8xl tracking-tight mr-4 md:mr-8 transform scale-y-125">HACKER</span>
          <span className="text-hh-pink font-yatra text-5xl md:text-7xl absolute left-1/2 -translate-x-1/2 z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">गोवा</span>
          <span className="text-hh-yellow font-yatra text-6xl md:text-8xl tracking-tight ml-4 md:ml-8 transform scale-y-125">HOUSE</span>
        </div>
      </header>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 flex-grow flex flex-col items-center justify-center pb-12">
        <AnimatePresence mode="wait">
          {step === "landing" && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
              <Landing onStart={() => setStep("editor")} />
            </motion.div>
          )}
          {step === "editor" && (
            <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
              <Editor onBack={() => setStep("landing")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
