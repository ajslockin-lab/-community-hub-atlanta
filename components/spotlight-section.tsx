"use client";

import { motion } from "framer-motion";
import { resources, categoryLabels, categoryColors } from "@/lib/resources-data";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon, StarFilledIcon } from "@radix-ui/react-icons";

export const SpotlightSection = () => {
  const featuredResources = resources.filter((r) => r.featured);

  return (
    <section id="spotlight" className="py-20 lg:py-28 px-sides bg-primary/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <StarFilledIcon className="size-5 text-amber-400" />
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-foreground tracking-tight">
              <span className="italic">In the</span> Spotlight
            </h2>
            <StarFilledIcon className="size-5 text-amber-400" />
          </div>
          <p className="text-foreground/70 max-w-md mx-auto text-lg">
            Organizations doing incredible work for Atlanta. Hand-picked by our team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50" />
              <div className="relative backdrop-blur-xl bg-primary/10 border-2 border-amber-500/30 rounded-3xl p-6 h-full flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span
                    className={cn(
                      "inline-block text-xs font-medium px-3 py-1 rounded-full border",
                      categoryColors[resource.category]
                    )}
                  >
                    {categoryLabels[resource.category]}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <StarFilledIcon className="size-4" />
                    <span className="text-xs font-medium">Featured</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {resource.name}
                </h3>

                <p className="text-foreground/70 leading-relaxed flex-1 mb-4">
                  {resource.description}
                </p>

                <div className="space-y-2 text-sm text-foreground/60 mb-4">
                  <p>{resource.address}</p>
                  <p>{resource.phone}</p>
                  <p>{resource.hours}</p>
                </div>

                <a
                  href={resource.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-xl text-amber-200 font-medium transition-colors"
                >
                  Learn More
                  <ExternalLinkIcon className="size-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
