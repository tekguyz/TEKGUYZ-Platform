import { Hero } from "@/components/sections/Hero"
import { Solutions } from "@/components/sections/Solutions"
import { Work } from "@/components/sections/Work"
import { Process } from "@/components/sections/Process"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "TEKGUYZ",
    url: "https://tekguyz.com",
    logo: "https://tekguyz.com/icon-512.png",
    description: "Architecting high-performance AI workflows and digital systems.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Boca Raton",
      addressRegion: "FL"
    },
    sameAs: [
      "https://linkedin.com/company/tekguyz",
      "https://twitter.com/tekguyz",
      "https://github.com/tekguyz"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Solutions />
      <Work />
      <Process />
      <Contact />
    </>
  )
}
