import { Service, CaseStudy, ProcessPhase } from '@/lib/schemas';

export const servicesData: Service[] = [
  {
    title: "AI Intelligence Systems",
    pitch: "Your data knows things you don't.",
    reality: "Strategic Intelligence Engines using Gemini API.",
    capabilities: ["Smart Vision", "Predictive Forecasting", "Text Analysis"],
    techStack: ["Gemini Pro", "Python", "FastAPI"],
  },
  {
    title: "Custom Digital Platforms",
    pitch: "Software that fits you.",
    reality: "Enterprise-grade web and mobile applications.",
    capabilities: ["High-performance Dashboards", "Complex API Orchestration"],
    techStack: ["React", "TypeScript", "Next.js"],
  },
  {
    title: "Workflow Automation",
    pitch: "End the era of manual work fatigue.",
    reality: "Connecting disconnected systems into automated pipelines.",
    capabilities: ["Real-time Data Sync", "Self-healing Scripts"],
    techStack: ["Zapier", "Make", "Stripe API"],
  }
];

export const caseStudiesData: CaseStudy[] = [
  {
    title: "VeriClear",
    industry: "Enterprise Call Centers",
    problem: "QA teams drowning in call volume.",
    solution: "Real-Time Agentic AI System listening to live audio streams.",
    impactMetrics: ["90% reduction in QA time", "35% performance boost"],
    techStack: ["Python", "FastAPI", "Gemini API", "React"],
  },
  {
    title: "Crispy Bacon",
    industry: "Professional Services",
    problem: "Meeting fatigue and scattered notes.",
    solution: "Custom-built Internal Knowledge Base AI.",
    impactMetrics: ["5 hours saved weekly", "Zero lost context"],
    techStack: ["RAG", "PostgreSQL", "Next.js"],
  }
];

export const processData: ProcessPhase[] = [
  {
    phaseTitle: "Phase 1: Intelligence",
    duration: "1 Week",
    focus: "Discovery & ROI Quantification",
    deliverables: ["System Audit", "Savings Projection", "Project Roadmap"],
    outcome: "Definitive Go/No-Go plan with exact costs.",
  },
  {
    phaseTitle: "Phase 2: Execution",
    duration: "6–12 Weeks",
    focus: "Rapid Prototyping & Build",
    deliverables: ["Weekly Demos", "Automated QA (Playwright)", "Team Training"],
    outcome: "High-performance, tested custom system.",
  },
  {
    phaseTitle: "Phase 3: Optimization",
    duration: "Ongoing",
    focus: "We manage the official launch, monitor real-world performance metrics, and fine-tune AI models based on actual usage.",
    deliverables: ["Official Launch", "Performance Tracking", "Continuous AI Tuning", "Strategic Scaling"],
    outcome: "Measurable results with a system that evolves and improves over time.",
  }
];
