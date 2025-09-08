import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrophyIcon } from "lucide-react"

export function CollectiveProgress() {
  const escapees = 0
  const totalMembers = 3

  return (
    <Card className="bg-card border-border">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <TrophyIcon className="h-6 w-6 text-accent" />
          Collective Escape Progress
        </CardTitle>
        <p className="text-muted-foreground">Tracking our journey to career freedom</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">
            {escapees}/{totalMembers}
          </div>
          <p className="text-muted-foreground">Members Successfully Escaped</p>
        </div>


        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-semibold text-chart-1">12</div>
            <div className="text-xs text-muted-foreground">Applications Sent</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-semibold text-chart-2">8</div>
            <div className="text-xs text-muted-foreground">Interviews Scheduled</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-semibold text-chart-3">3</div>
            <div className="text-xs text-muted-foreground">Final Rounds</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
