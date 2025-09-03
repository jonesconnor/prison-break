"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkedinIcon, GithubIcon, TwitterIcon, BriefcaseIcon } from "lucide-react"
import { useMemberContext } from "@/lib/member-context"

export function MemberProfiles() {
  const { members } = useMemberContext()
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">The Escapees</h2>
        <p className="text-muted-foreground">Meet our determined team breaking free from their current roles</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card key={member.name} className="bg-card border-border hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{member.name}</CardTitle>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <BriefcaseIcon className="h-4 w-4" />
                <span className="text-sm">
                  {member.role} @ {member.company}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Escape Progress</span>
                  <span>{member.progress}%</span>
                </div>
                <Progress value={member.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-lg font-semibold text-primary">{member.interviews}</div>
                  <div className="text-xs text-muted-foreground">Interviews</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-semibold text-accent">{member.productsLaunched}</div>
                  <div className="text-xs text-muted-foreground">Products Launched</div>
                </div>
              </div>

              <div className="flex justify-center gap-2 pt-2">
                {member.linkedin && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="p-2 bg-transparent"
                    onClick={() => window.open(member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`, '_blank')}
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </Button>
                )}
                {member.github && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="p-2 bg-transparent"
                    onClick={() => window.open(member.github.startsWith('http') ? member.github : `https://${member.github}`, '_blank')}
                  >
                    <GithubIcon className="h-4 w-4" />
                  </Button>
                )}
                {member.twitter && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="p-2 bg-transparent"
                    onClick={() => window.open(member.twitter.startsWith('http') ? member.twitter : `https://${member.twitter}`, '_blank')}
                  >
                    <TwitterIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
