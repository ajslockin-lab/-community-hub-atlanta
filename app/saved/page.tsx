"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  resources,
  categoryLabels,
  categoryColors,
  type Resource,
} from "@/lib/resources-data";
import { cn } from "@/lib/utils";
import { 
  ExternalLinkIcon, 
  ClockIcon, 
  HomeIcon, 
  HeartFilledIcon, 
  ArrowLeftIcon,
  TrashIcon 
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/lib/bookmarks-context";

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const SavedResourceCard = ({ resource }: { resource: Resource }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toggleBookmark } = useBookmarks();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, x: -100 }}
      transition={{ duration: 0.2 }}
      className="group relative backdrop-blur-xl bg-primary/10 border border-border/30 rounded-2xl p-5 hover:bg-primary/20 transition-all duration-300"
    >
      {/* Remove Button */}
      <button
        onClick={() => toggleBookmark(resource.id)}
        className="absolute top-4 right-4 p-2 rounded-full text-rose-400 bg-rose-500/20 hover:bg-rose-500/30 transition-all duration-200"
        aria-label="Remove from saved"
      >
        <TrashIcon className="size-5" />
      </button>

      <div className="flex flex-col gap-3 pr-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <span
              className={cn(
                "inline-block text-xs font-medium px-2 py-1 rounded-full border mb-2",
                categoryColors[resource.category]
              )}
            >
              {categoryLabels[resource.category]}
            </span>
            <h3 className="text-lg font-semibold text-foreground">{resource.name}</h3>
          </div>
          {resource.featured && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30">
              Featured
            </span>
          )}
        </div>

        <p className={cn("text-sm text-foreground/70 leading-relaxed", !isExpanded && "line-clamp-2")}>
          {resource.description}
        </p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-foreground/50 hover:text-foreground transition-colors self-start"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>

        <div className="flex flex-col gap-2 text-sm text-foreground/70">
          <div className="flex items-center gap-2">
            <HomeIcon className="size-4 flex-shrink-0" />
            <span className="truncate">{resource.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon />
            <a href={`tel:${resource.phone}`} className="hover:text-foreground transition-colors">
              {resource.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="size-4 flex-shrink-0" />
            <span>{resource.hours}</span>
          </div>
        </div>

        <a
          href={resource.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors mt-2"
        >
          Visit Website
          <ExternalLinkIcon className="size-4" />
        </a>
      </div>
    </motion.div>
  );
};

export default function SavedResourcesPage() {
  const { bookmarks } = useBookmarks();

  const savedResources = resources.filter((r) => bookmarks.includes(r.id));

  return (
    <main className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-sides py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeftIcon className="size-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-foreground tracking-tight">
              <span className="italic">My</span> Saved Resources
            </h1>
            <p className="text-foreground/70 mt-1">
              {savedResources.length} resource{savedResources.length !== 1 ? "s" : ""} saved
            </p>
          </div>
        </div>

        {/* Saved Resources Grid */}
        {savedResources.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {savedResources.map((resource) => (
                <SavedResourceCard key={resource.id} resource={resource} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <HeartFilledIcon className="size-8 text-foreground/30" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">No saved resources yet</h2>
            <p className="text-foreground/60 mb-6 max-w-md mx-auto">
              Browse the resource directory and click the heart icon to save resources for quick access later.
            </p>
            <Link href="/#directory">
              <Button>
                Browse Resources
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
}
