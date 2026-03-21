import { useState, useEffect } from "react"
import { caseStudiesData } from "@/data/site-content"
import { CaseStudy } from "@/lib/schemas"

export function parseMetric(metric: string) {
  const match = metric.match(/^([\d\.]+)([\+kKmMbB%x\$]*)\s+(.*)$/)
  if (match) {
    return { value: parseFloat(match[1]), suffix: match[2], label: match[3], original: match[0] }
  }
  return { value: 0, suffix: "", label: metric, original: metric }
}

export function useWorkPortfolio() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null)

  const industries = ["All", ...Array.from(new Set(caseStudiesData.map((c) => c.industry)))]

  const filteredStudies = activeFilter === "All" 
    ? caseStudiesData 
    : caseStudiesData.filter((c) => c.industry === activeFilter)

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [selectedProject])

  const handleNextProject = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (!selectedProject) return
    const currentIndex = filteredStudies.findIndex(s => s.title === selectedProject.title)
    const nextIndex = (currentIndex + 1) % filteredStudies.length
    setSelectedProject(filteredStudies[nextIndex])
  }

  return {
    activeFilter,
    setActiveFilter,
    selectedProject,
    setSelectedProject,
    industries,
    filteredStudies,
    handleNextProject
  }
}
