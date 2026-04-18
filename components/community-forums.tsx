"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";

interface ForumTopic {
  id: string;
  title: string;
  description: string;
  posts: number;
  members: number;
  icon: string;
  color: string;
  barColor: string;
}

const forumTopics: ForumTopic[] = [
  {
    id: "1",
    title: "Neighborhood Watch",
    description: "Connect with neighbors about local safety, crime prevention, and community vigilance.",
    posts: 234,
    members: 1250,
    icon: "shield",
    color: "bg-blue-500/20 border-blue-500/30 text-blue-200",
    barColor: "bg-blue-400",
  },
  {
    id: "2",
    title: "Local Business Support",
    description: "Discuss and promote local Atlanta businesses, share recommendations and reviews.",
    posts: 189,
    members: 890,
    icon: "store",
    color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-200",
    barColor: "bg-emerald-400",
  },
  {
    id: "3",
    title: "Housing & Rentals",
    description: "Find roommates, share housing tips, discuss tenant rights and neighborhood living.",
    posts: 312,
    members: 1580,
    icon: "home",
    color: "bg-amber-500/20 border-amber-500/30 text-amber-200",
    barColor: "bg-amber-400",
  },
  {
    id: "4",
    title: "Parents & Families",
    description: "Connect with other Atlanta parents about schools, childcare, and family activities.",
    posts: 156,
    members: 720,
    icon: "users",
    color: "bg-pink-500/20 border-pink-500/30 text-pink-200",
    barColor: "bg-pink-400",
  },
  {
    id: "5",
    title: "Jobs & Careers",
    description: "Share job openings, career advice, and networking opportunities in metro Atlanta.",
    posts: 278,
    members: 1100,
    icon: "briefcase",
    color: "bg-violet-500/20 border-violet-500/30 text-violet-200",
    barColor: "bg-violet-400",
  },
  {
    id: "6",
    title: "Events & Meetups",
    description: "Organize and discover community gatherings, social events, and volunteer opportunities.",
    posts: 145,
    members: 650,
    icon: "calendar",
    color: "bg-teal-500/20 border-teal-500/30 text-teal-200",
    barColor: "bg-teal-400",
  },
];

const ForumCard = ({ topic }: { topic: ForumTopic }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group backdrop-blur-xl bg-primary/10 border border-border/30 rounded-2xl p-5 hover:bg-primary/20 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className={cn("flex-shrink-0 w-1 self-stretch rounded-full", topic.barColor)} />
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-foreground/90 transition-colors">
            {topic.title}
          </h3>
          <p className="text-sm text-foreground/60 line-clamp-2 mb-3">
            {topic.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/50">
            <span>{topic.posts} posts</span>
            <span>{topic.members} members</span>
          </div>
        </div>

        <ArrowRightIcon className="size-5 text-foreground/30 group-hover:text-foreground/60 transition-colors" />
      </div>
    </motion.div>
  );
};

export const CommunityForums = () => {
  return (
    <section id="forums" className="py-20 lg:py-28 px-sides bg-primary/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-foreground mb-4 tracking-tight">
            <span className="italic">Join</span> the Conversation
          </h2>
          <p className="text-foreground/70 max-w-md mx-auto text-lg">
            Chat with your neighbors. Ask questions. Share what you know.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forumTopics.map((topic) => (
            <ForumCard key={topic.id} topic={topic} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-3 backdrop-blur-xl bg-primary/10 border border-border/30 rounded-full px-6 py-3">
            <span className="text-foreground/70">
              <strong className="text-foreground">6,190+</strong> community members and growing
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
