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
    logo: "https://tekguyz.com/icon.svg",
    image: "https://tekguyz.com/opengraph-image",
    description: "Architecting high-performance AI workflows and digital systems for teams that refuse to lose.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pompano Beach",
      addressRegion: "FL"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Workflow Automation"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Infrastructure Architecture"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Strategic Consulting"
          }
        }
      ]
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
