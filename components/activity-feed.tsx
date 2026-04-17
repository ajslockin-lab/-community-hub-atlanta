"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons";

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  topic: string;
  time: string;
  avatar: string;
}

const initialActivities: ActivityItem[] = [
  {
    id: "1",
    user: "Marcus T.",
    action: "posted in",
    topic: "Neighborhood Watch",
    time: "2 min ago",
    avatar: "MT",
  },
  {
    id: "2",
    user: "Aaliyah J.",
    action: "replied to",
    topic: "Housing & Rentals",
    time: "5 min ago",
    avatar: "AJ",
  },
  {
    id: "3",
    user: "DeShawn W.",
    action: "started",
    topic: "Local Business Support",
    time: "8 min ago",
    avatar: "DW",
  },
  {
    id: "4",
    user: "Keisha M.",
    action: "posted in",
    topic: "Parents & Families",
    time: "12 min ago",
    avatar: "KM",
  },
  {
    id: "5",
    user: "Terrence B.",
    action: "replied to",
    topic: "Jobs & Careers",
    time: "15 min ago",
    avatar: "TB",
  },
];

const newActivities: ActivityItem[] = [
  {
    id: "6",
    user: "Jasmine R.",
    action: "posted in",
    topic: "Events & Meetups",
    time: "just now",
    avatar: "JR",
  },
  {
    id: "7",
    user: "Andre C.",
    action: "replied to",
    topic: "Neighborhood Watch",
    time: "just now",
    avatar: "AC",
  },
  {
    id: "8",
    user: "Tamika L.",
    action: "started",
    topic: "Housing & Rentals",
    time: "just now",
    avatar: "TL",
  },
];

export const ActivityFeed = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [pulseIndex, setPulseIndex] = useState(-1);

  // Simulate new activity coming in
  useEffect(() => {
    let newActivityIndex = 0;
    
    const interval = setInterval(() => {
      if (newActivityIndex < newActivities.length) {
        const newActivity = {
          ...newActivities[newActivityIndex],
          id: `new-${Date.now()}`,
        };
        
        setActivities((prev) => [newActivity, ...prev.slice(0, 4)]);
        setPulseIndex(0);
        newActivityIndex++;
        
        setTimeout(() => setPulseIndex(-1), 1000);
      } else {
        newActivityIndex = 0;
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="backdrop-blur-xl bg-primary/10 border border-border/30 rounded-2xl p-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative">
          <ChatBubbleIcon className="size-5 text-foreground/70" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        </div>
        <h3 className="font-semibold text-foreground">Live Activity</h3>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              layout
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                height: "auto",
                backgroundColor: pulseIndex === index ? "rgba(16, 185, 129, 0.1)" : "transparent"
              }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 p-2 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-foreground/80 flex-shrink-0">
                {activity.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground/90 truncate">
                  <span className="font-medium">{activity.user}</span>
                  {" "}{activity.action}{" "}
                  <span className="text-accent font-medium">{activity.topic}</span>
                </p>
                <p className="text-xs text-foreground/50">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-center gap-2 text-xs text-foreground/50">
        <PersonIcon className="size-3" />
        <span>42 members online</span>
      </div>
    </div>
  );
};
