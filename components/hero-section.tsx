"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDownIcon } from "@radix-ui/react-icons";

const DURATION = 0.3;
const EASE_OUT = "easeOut";

import { Counter } from "@/components/ui/counter";

export const HeroSection = () => {
  const scrollToDirectory = () => {
    document.getElementById("directory")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="flex overflow-hidden relative flex-col gap-4 justify-center items-center pt-10 w-full min-h-[100dvh] pb-footer-safe-area px-sides lg:gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION, ease: EASE_OUT }}
      >
        <h1 className="font-serif text-5xl text-center sm:text-7xl lg:text-9xl text-foreground text-balance drop-shadow-lg tracking-tight">
          <span className="font-medium">Atlanta</span>
          <br />
          <span className="italic font-normal">Community Hub</span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION, ease: EASE_OUT, delay: 0.1 }}
        className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-center text-foreground/90 text-pretty max-w-xl drop-shadow-md"
      >
        Find what you need. Connect with neighbors. 
        <span className="text-foreground/70 block mt-1">Real resources for real people across metro Atlanta.</span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION, ease: EASE_OUT, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 mt-4"
      >
        <Button onClick={scrollToDirectory} shine className="px-8 shadow-xl shadow-primary/20">
          Explore Resources
          <ArrowDownIcon className="ml-2 size-4" />
        </Button>
        <Button
          variant="outline"
          className="px-8 bg-black/40 backdrop-blur-md border-white/20 hover:bg-black/60 text-white shadow-xl"
          onClick={() => document.getElementById("submit")?.scrollIntoView({ behavior: "smooth" })}
        >
          Submit a Resource
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION, ease: EASE_OUT, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-8 text-center"
      >
        <div className="flex flex-col">
          <Counter value={12} suffix="+" className="text-3xl sm:text-4xl font-serif font-semibold text-foreground drop-shadow-md" />
          <span className="text-sm text-foreground/70 mt-1">Resources</span>
        </div>
        <div className="w-px bg-foreground/20 hidden sm:block" />
        <div className="flex flex-col">
          <Counter value={9} className="text-3xl sm:text-4xl font-serif font-semibold text-foreground drop-shadow-md" />
          <span className="text-sm text-foreground/70 mt-1">Categories</span>
        </div>
        <div className="w-px bg-foreground/20 hidden sm:block" />
        <div className="flex flex-col">
          <Counter value={8} suffix="+" className="text-3xl sm:text-4xl font-serif font-semibold text-foreground drop-shadow-md" />
          <span className="text-sm text-foreground/70 mt-1">Events</span>
        </div>
        <div className="w-px bg-foreground/20 hidden sm:block" />
        <div className="flex flex-col">
          <span className="text-3xl sm:text-4xl font-serif font-semibold text-foreground drop-shadow-md">24/7</span>
          <span className="text-sm text-foreground/70 mt-1">Access</span>
        </div>
      </motion.div>
    </section>
  );
};
