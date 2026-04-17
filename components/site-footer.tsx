"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = {
  resources: [
    { label: "Food Assistance", href: "#directory" },
    { label: "Housing & Shelter", href: "#directory" },
    { label: "Health Services", href: "#directory" },
    { label: "Employment", href: "#directory" },
  ],
  community: [
    { label: "Events Calendar", href: "#events" },
    { label: "Community Forums", href: "#forums" },
    { label: "Submit Resource", href: "#submit" },
    { label: "Volunteer", href: "#" },
  ],
  about: [
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Accessibility", href: "#" },
  ],
};

export const SiteFooter = () => {
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-12 px-sides border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-serif text-2xl italic text-foreground mb-4">
              ATL Community Hub
            </h3>
            <p className="text-sm text-foreground/60 leading-relaxed mb-4">
              Connecting Atlanta residents with local resources, services, and community
              support. Building a stronger, more connected city together.
            </p>
            <p className="text-sm text-foreground/40">
              Serving metro Atlanta since 2024
            </p>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Community</h4>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Accessibility Statement */}
        <div className="border-t border-border/30 pt-8 mb-8">
          <div className="backdrop-blur-xl bg-primary/5 border border-border/30 rounded-2xl p-4 sm:p-6">
            <h4 className="font-semibold text-foreground mb-2">Accessibility Commitment</h4>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Atlanta Community Hub is committed to ensuring digital accessibility for people
              with disabilities. We continually improve the user experience for everyone and
              apply the relevant accessibility standards. This site is designed to be compatible
              with assistive technologies including screen readers, keyboard navigation, and
              high-contrast modes. If you experience any accessibility barriers, please contact us.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-foreground/40">
          <p>&copy; 2024-2025 Atlanta Community Hub. All rights reserved.</p>
          <p>
            Built with care for Atlanta&apos;s diverse community
          </p>
        </div>
      </div>
    </footer>
  );
};
