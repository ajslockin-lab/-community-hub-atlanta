"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  resources,
  categoryLabels,
  categoryColors,
  type ResourceCategory,
  type Resource,
} from "@/lib/resources-data";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon, ExternalLinkIcon, ClockIcon, HomeIcon } from "@radix-ui/react-icons";
import { inputVariants } from "./ui/input";
import { Button } from "./ui/button";

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative backdrop-blur-xl bg-primary/10 border border-border/30 rounded-2xl p-5 hover:bg-primary/20 transition-all duration-300"
    >
      <div className="flex flex-col gap-3">
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

export const ResourceDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | "all">("all");

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
    <section id="directory" className="py-16 px-sides">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl italic text-foreground mb-4">
            Resource Directory
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Search and filter through community resources to find the support you need.
            Our directory is regularly updated with verified local organizations.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative max-w-xl mx-auto w-full">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-foreground/50" />
            <input
              type="text"
              placeholder="Search resources by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(inputVariants(), "pl-12 w-full")}
              aria-label="Search resources"
            />
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

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>

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
      </div>
    </section>
  );
};
