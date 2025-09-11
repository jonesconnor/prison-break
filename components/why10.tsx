"use client"

import { SectionHeader } from "@/components/ui/section-header"

export function Why10() {
  return (
    <section className="space-y-6">
      <SectionHeader>Why $10,000?</SectionHeader>
      
      <div className="space-y-4 text-muted-foreground w-full md:w-1/2">
        <p className="leading-relaxed">
          $10,000 in MRR will keep us afloat. It&apos;s a financial milestone that represents total freedom, 
          covering our basic expenses. $10k would break us out of our 9-5s.
        </p>
        
        <p className="leading-relaxed">
          To get there is a challenge, a push to sharpen our craft, prove the strength of our ideas, 
          and demonstrate what a small, focused team of builders can accomplish. Hitting that number 
          means more than income, it means: autonomy, sustainability, and the freedom to keep creating 
          on our own terms.
        </p>
        
        <p className="leading-relaxed">
          It could also literally keep us afloat. Buying a sailboat, installing Starlink, and 
          continuing to ship projects anywhere. Boys can dream.
        </p>
      </div>
    </section>
  )
}
