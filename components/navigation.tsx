"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { HamburgerMenuIcon, Cross1Icon, HeartFilledIcon, SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useBookmarks } from "@/lib/bookmarks-context";
import { useTheme } from "next-themes";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Directory", href: "#directory" },
  { label: "Spotlight", href: "#spotlight" },
  { label: "Events", href: "#events" },
  { label: "Forums", href: "#forums" },
  { label: "Submit", href: "#submit" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { bookmarks } = useBookmarks();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 px-4",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border border-border/50 rounded-full shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="flex items-center gap-2 py-2 px-2">
          <span className="font-serif text-xl text-foreground px-3 hidden sm:block tracking-tight">
            <span className="font-medium">ATL</span> <span className="italic font-normal">Hub</span>
          </span>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-full hover:bg-foreground/10"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-foreground/70 hover:text-foreground transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
            </button>
          )}

          {/* Saved Resources Link */}
          <Link href="/saved" className="relative p-2 text-foreground/70 hover:text-foreground transition-colors">
            <HeartFilledIcon className="size-5" />
            {bookmarks.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {bookmarks.length}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <Cross1Icon className="size-5" />
            ) : (
              <HamburgerMenuIcon className="size-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-40 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl p-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="px-4 py-3 text-left text-foreground/80 hover:text-foreground hover:bg-foreground/10 rounded-xl transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
