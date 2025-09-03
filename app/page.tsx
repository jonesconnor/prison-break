import { Header } from "@/components/header"
import { CollectiveProgress } from "@/components/collective-progress"
import { MemberProfiles } from "@/components/member-profiles"
import { ProductShowcase } from "@/components/product-showcase"
import { DonationSection } from "@/components/donation-section"
import { MemberProvider } from "@/lib/member-context"

export default function HomePage() {
  return (
    <MemberProvider>
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 space-y-12">
          <CollectiveProgress />
          <MemberProfiles />
          <ProductShowcase />
          <DonationSection />
        </div>
      </main>
    </MemberProvider>
  )
}
