import { z } from 'zod';

export const ServiceSchema = z.object({
  title: z.string(),
  pitch: z.string(),
  reality: z.string(),
  capabilities: z.array(z.string()),
  techStack: z.array(z.string()),
  impact: z.string().optional(),
});

export const CaseStudySchema = z.object({
  title: z.string(),
  industry: z.string(),
  problem: z.string(),
  solution: z.string(),
  impactMetrics: z.array(z.string()),
  techStack: z.array(z.string()),
});

export const ProcessPhaseSchema = z.object({
  phaseTitle: z.string(),
  duration: z.string(),
  focus: z.string(),
  deliverables: z.array(z.string()),
  outcome: z.string(),
});

export const RoadmapLeadSchema = z.object({
  mission: z.string().min(1, "Please select a mission."),
  friction: z.array(z.string()).min(1, "Please select at least one friction point."),
  timeline: z.string().min(1, "Please select a timeline."),
  budget: z.string().min(1, "Please select a budget."),
  name: z.string().min(2, "Please provide a valid name (at least 2 characters)."),
  email: z.string().email("Please provide a valid, professional email address."),
  website: z.string().optional(),
});

// Export inferred TypeScript types to act as the Single Source of Truth
export type Service = z.infer<typeof ServiceSchema>;
export type CaseStudy = z.infer<typeof CaseStudySchema>;
export type ProcessPhase = z.infer<typeof ProcessPhaseSchema>;
export type RoadmapLead = z.infer<typeof RoadmapLeadSchema>;
