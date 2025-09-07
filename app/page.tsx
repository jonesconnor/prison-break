import { Hero } from "@/components/hero"
import { CollectiveProgress } from "@/components/collective-progress"
import { AboutUs } from "@/components/about-us"
import { ProductShowcase } from "@/components/product-showcase"
import { DonationSection } from "@/components/donation-section"
import { MemberProvider } from "@/lib/member-context"

export default function HomePage() {
  return (
    <MemberProvider>
      <div id="hero">
        <Hero />
      </div>
      <main className="bg-background">
        <div className="container mx-auto px-4 py-8 space-y-12">
          <div id="about">
            <AboutUs />
          </div>
          <div id="projects">
            <ProductShowcase />
          </div>
          <div id="donation">
            <DonationSection />
          </div>
        </div>
      </main>
    </MemberProvider>
  )
}
