"use client";

import { motion } from "framer-motion";
import { events, categoryLabels, categoryColors } from "@/lib/resources-data";
import { cn } from "@/lib/utils";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getMonthDay = (dateString: string) => {
  const date = new Date(dateString);
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }),
    day: date.getDate(),
  };
};

export const EventsCalendar = () => {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <section id="events" className="py-16 px-sides">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl italic text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Stay connected with community events, workshops, and programs happening across Atlanta.
            Mark your calendar and join your neighbors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedEvents.map((event, index) => {
            const { month, day } = getMonthDay(event.date);
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group backdrop-blur-xl bg-primary/10 border border-border/30 rounded-2xl p-5 hover:bg-primary/20 transition-all duration-300"
              >
                <div className="flex gap-4">
                  {/* Date Badge */}
                  <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-foreground/10 rounded-xl border border-border/30">
                    <span className="text-xs font-medium text-foreground/60 uppercase">
                      {month}
                    </span>
                    <span className="text-2xl font-bold text-foreground">{day}</span>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <span
                      className={cn(
                        "inline-block text-xs font-medium px-2 py-1 rounded-full border mb-2",
                        categoryColors[event.category]
                      )}
                    >
                      {categoryLabels[event.category]}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mb-2 truncate">
                      {event.title}
                    </h3>
                    <p className="text-sm text-foreground/70 line-clamp-2 mb-3">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="size-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <LocationIcon />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-sm text-foreground/50">
            <CalendarIcon className="inline-block size-4 mr-1" />
            Events are updated weekly. Check back for new community activities.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
