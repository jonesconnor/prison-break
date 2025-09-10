import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/ui/header"
import Image from "next/image"

export function Hero() {
  const escapees = 0
  const totalMembers = 3
  const progressPercentage = (escapees / totalMembers) * 100

  return (
    <>
      <div className="hidden md:block">
        <Header />
      </div>
      <header className="bg-card h-screen flex items-center justify-center relative">
        {/* Logo */}
        <div className="absolute left-0 top-0 z-50">
          <div className="flex flex-col items-start justify-start h-1/5 pt-8 pl-6">
            <div className="text-center">
              <span className="text-4xl font-bold text-foreground">pbw</span>
              <span className="text-xs text-muted-foreground"> prison break wednesdays</span>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
        <div className="text-center space-y-8 relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-6xl font-bold text-foreground dotgothic16-regular flex items-end justify-center">
              <span className="animate-typing">.PrisonBreak</span>
              <span className="w-0.5 h-12 bg-foreground ml-1 animate-blink" />
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Three tech professionals <span style={{ color: '#E6A500' }}>breaking free</span> from corporate prison, through accountability, collaboration, and
            strategic career planning.
          </p>
          
           <div className="space-y-2 max-w-2xl mx-auto">
            <div className="text-md text-left">
              <span>Monthly Recurring Revenue</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$0</span>
              <span>$10,000</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg">
              Join Our Mission
            </Button>
            <Button variant="outline" size="lg">
              View Progress
            </Button>
          </div>
        </div>
        </div>
        
        {/* Keyboard image positioned behind content, off to the right */}
        <div className="absolute right-0 top-1/4 md:top-1/3 transform -translate-y-1/2 z-0 opacity-70">
          <Image
            src="/keyboard.png"
            alt="Keyboard"
            width={300}
            height={200}
            className="object-contain"
          />
        </div>
      </header>
    </>
  )
}
