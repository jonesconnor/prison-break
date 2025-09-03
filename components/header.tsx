import { Button } from "@/components/ui/button"
import { KeyIcon, MapIcon } from "lucide-react"

export function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <KeyIcon className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Prison Break</h1>
            <MapIcon className="h-8 w-8 text-accent" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Three tech professionals breaking free from their current roles through accountability, collaboration, and
            strategic career planning.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Join Our Mission
            </Button>
            <Button variant="outline" size="lg">
              View Progress
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
