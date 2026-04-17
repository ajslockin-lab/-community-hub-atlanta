"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { categoryLabels, type ResourceCategory } from "@/lib/resources-data";
import { cn } from "@/lib/utils";
import { inputVariants } from "./ui/input";
import { Button } from "./ui/button";
import { CheckCircledIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const submitResourceSchema = z.object({
  resourceName: z.string().min(2, "Resource name must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  address: z.string().min(5, "Please provide a valid address"),
  phone: z.string().min(10, "Please provide a valid phone number"),
  website: z.string().url("Please provide a valid website URL").or(z.string().length(0)),
  hours: z.string().min(3, "Please provide operating hours"),
  submitterName: z.string().min(2, "Your name must be at least 2 characters"),
  submitterEmail: z.string().email("Please provide a valid email"),
  additionalInfo: z.string().optional(),
});

type SubmitResourceForm = z.infer<typeof submitResourceSchema>;

export const SubmitResource = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<SubmitResourceForm>({
    resolver: zodResolver(submitResourceSchema),
    defaultValues: {
      resourceName: "",
      category: "",
      description: "",
      address: "",
      phone: "",
      website: "",
      hours: "",
      submitterName: "",
      submitterEmail: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: SubmitResourceForm) => {
    // Simulate form submission
    console.log("Resource submission:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    form.reset();
  };

  const categories = Object.entries(categoryLabels) as [ResourceCategory, string][];

  if (isSubmitted) {
    return (
      <section id="submit" className="py-16 px-sides">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="backdrop-blur-xl bg-primary/10 border border-border/30 rounded-3xl p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center">
              <CheckCircledIcon className="size-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Thank You for Your Submission!
            </h3>
            <p className="text-foreground/70 mb-6">
              Your resource suggestion has been received. Our team will review it and add it to
              the directory if it meets our community guidelines.
            </p>
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Submit Another Resource
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="submit" className="py-16 px-sides">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl italic text-foreground mb-4">
            Submit a Resource
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Know of a community resource that should be included in our directory?
            Help us grow this hub by suggesting organizations that serve Atlanta residents.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-primary/10 border border-border/30 rounded-3xl p-6 sm:p-8"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Resource Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border/30 pb-2">
                  Resource Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="resourceName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">Resource Name *</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            className={cn(inputVariants(), "w-full")}
                            placeholder="Organization name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">Category *</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className={cn(inputVariants(), "w-full")}
                          >
                            <option value="">Select a category</option>
                            {categories.map(([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80">Description *</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          rows={4}
                          className={cn(inputVariants(), "w-full resize-none")}
                          placeholder="Describe the services this organization provides..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">Address *</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            className={cn(inputVariants(), "w-full")}
                            placeholder="Street address, City, GA ZIP"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">Phone *</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            type="tel"
                            className={cn(inputVariants(), "w-full")}
                            placeholder="(404) 555-0123"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">Website</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            type="url"
                            className={cn(inputVariants(), "w-full")}
                            placeholder="https://example.org"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">Operating Hours *</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            className={cn(inputVariants(), "w-full")}
                            placeholder="Mon-Fri: 9AM-5PM"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submitter Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border/30 pb-2">
                  Your Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="submitterName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">Your Name *</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            className={cn(inputVariants(), "w-full")}
                            placeholder="Full name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="submitterEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">Your Email *</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            type="email"
                            className={cn(inputVariants(), "w-full")}
                            placeholder="email@example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80">Additional Information</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          rows={3}
                          className={cn(inputVariants(), "w-full resize-none")}
                          placeholder="Any other details you'd like to share..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
                shine
              >
                {form.formState.isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Resource
                    <PaperPlaneIcon className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
};
