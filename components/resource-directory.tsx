"use client";

import { useState, useMemo, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  resources,
  categoryLabels,
  categoryColors,
  type ResourceCategory,
  type Resource,
} from "@/lib/resources-data";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon, ExternalLinkIcon, ClockIcon, HomeIcon, HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { inputVariants } from "./ui/input";
import { Button } from "./ui/button";
import { useBookmarks } from "@/lib/bookmarks-context";
import { Counter } from "./ui/counter";

// Dynamic import for Leaflet map to avoid SSR issues
const ResourceMap = dynamic(() => import("./resource-map").then((mod) => mod.ResourceMap), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-border/30 bg-primary/10 flex items-center justify-center">
      <div className="text-foreground/50">Loading map...</div>
    </div>
  ),
});

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="7" x="3" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="14" rx="1"/>
    <rect width="7" height="7" x="3" y="14" rx="1"/>
  </svg>
);

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(resource.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="group relative backdrop-blur-xl bg-primary/10 border border-border/30 rounded-2xl p-5 hover:bg-primary/20 transition-all duration-300"
    >
      {/* Bookmark Button */}
      <button
        onClick={() => toggleBookmark(resource.id)}
        className={cn(
          "absolute top-4 right-4 p-2 rounded-full transition-all duration-200",
          bookmarked 
            ? "text-rose-400 bg-rose-500/20 hover:bg-rose-500/30" 
            : "text-foreground/40 hover:text-rose-400 hover:bg-rose-500/10"
        )}
        aria-label={bookmarked ? "Remove from saved" : "Save resource"}
      >
        {bookmarked ? <HeartFilledIcon className="size-5" /> : <HeartIcon className="size-5" />}
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



const ResourceRequestForm = () => {
  const [email, setEmail] = useState("");
  const [resourceName, setResourceName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 mb-4">
          <CheckIcon className="size-6 text-emerald-400" />
        </div>
        <p className="text-foreground font-medium">Thanks for your request!</p>
        <p className="text-foreground/60 text-sm mt-1">We&apos;ll review and add it to our directory.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Resource name or type"
        value={resourceName}
        onChange={(e) => setResourceName(e.target.value)}
        required
        className={cn(inputVariants(), "flex-1")}
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={cn(inputVariants(), "flex-1")}
      />
      <Button type="submit" disabled={isSubmitting} className="shrink-0">
        {isSubmitting ? "Submitting..." : "Request"}
      </Button>
    </form>
  );
};

export const ResourceDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | "all">("all");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories = Object.keys(categoryLabels) as ResourceCategory[];

  return (
    <section id="directory" className="py-20 lg:py-28 px-sides">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-foreground mb-4 tracking-tight">
            <span className="italic">Find</span> Resources
          </h2>
          <p className="text-foreground/70 max-w-lg mx-auto text-lg">
            Browse verified local organizations ready to help. Filter by what you need.
          </p>
          
          {/* Impact Counter */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30"
          >
            <span className="text-emerald-300 font-semibold">
              <Counter value={147} className="inline" />
            </span>
            <span className="text-emerald-200/80 text-sm">Atlantans helped this week</span>
          </motion.div>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex gap-3 max-w-xl mx-auto w-full">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-foreground/50" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(inputVariants(), "pl-12 w-full")}
                aria-label="Search resources"
              />
            </div>
            
            {/* View Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-border/30 bg-primary/10">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "px-3 py-2 transition-colors",
                  viewMode === "grid" ? "bg-primary/30 text-foreground" : "text-foreground/50 hover:text-foreground"
                )}
                aria-label="Grid view"
              >
                <GridIcon />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={cn(
                  "px-3 py-2 transition-colors",
                  viewMode === "map" ? "bg-primary/30 text-foreground" : "text-foreground/50 hover:text-foreground"
                )}
                aria-label="Map view"
              >
                <MapPinIcon />
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className="rounded-full"
            >
              All Resources
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {categoryLabels[category]}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-foreground/50 text-center mb-6">
          Showing {filteredResources.length} of {resources.length} resources
        </p>

        {/* View Content */}
        {viewMode === "map" ? (
          <ResourceMap resources={filteredResources} />
        ) : (
          <>
            {/* Resource Grid with AnimatePresence */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <p className="text-foreground/50">No resources found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </>
        )}

        {/* Resource Request Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 backdrop-blur-xl bg-primary/10 border border-border/30 rounded-2xl p-6 sm:p-8"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-2">
              Can&apos;t find what you need?
            </h3>
            <p className="text-foreground/60 mb-6">
              Request a resource and we&apos;ll work to add it to our directory.
            </p>
            <ResourceRequestForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
