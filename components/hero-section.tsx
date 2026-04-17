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
        <h1 className="font-serif text-4xl italic text-center sm:text-6xl lg:text-8xl text-foreground text-balance drop-shadow-lg">
          Atlanta Community Hub
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION, ease: EASE_OUT, delay: 0.1 }}
        className="text-base sm:text-lg lg:text-xl leading-relaxed font-medium text-center text-foreground/90 text-pretty max-w-2xl drop-shadow-md bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10"
      >
        Your central platform for finding and accessing local resources, community
        services, and neighborhood connections across metro Atlanta.
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
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mt-8 text-center bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl"
      >
        <div className="flex flex-col gap-1">
          <Counter value={12} suffix="+" className="text-2xl sm:text-3xl font-bold text-foreground drop-shadow-md" />
          <span className="text-sm text-foreground/80 font-medium">Local Resources</span>
        </div>
        <div className="flex flex-col gap-1">
          <Counter value={9} className="text-2xl sm:text-3xl font-bold text-foreground drop-shadow-md" />
          <span className="text-sm text-foreground/80 font-medium">Categories</span>
        </div>
        <div className="flex flex-col gap-1">
          <Counter value={8} suffix="+" className="text-2xl sm:text-3xl font-bold text-foreground drop-shadow-md" />
          <span className="text-sm text-foreground/80 font-medium">Upcoming Events</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl sm:text-3xl font-bold text-foreground drop-shadow-md">24/7</span>
          <span className="text-sm text-foreground/80 font-medium">Access</span>
        </div>
      </motion.div>
    </section>
  );
};
