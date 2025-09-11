"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressCard } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SectionHeader } from "@/components/ui/section-header"
import { LinkedinIcon } from "lucide-react"
import { XIcon, GithubIcon } from "@/components/ui/Icons"
import { useMemberContext } from "@/lib/member-context"

export function AboutUs() {
  const { members } = useMemberContext()
  return (
    <section className="flex items-start justify-center space-y-12">
      <div className="container mx-auto px-4 space-y-4">
        <SectionHeader>About Us</SectionHeader>
        <p className="text-muted-foreground text-left text-lg">Meet our determined team breaking free from their current roles</p>

      <div className="grid md:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card key={member.name} className="bg-card border-0 shadow-none hover:border hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4">
                <Avatar className="h-auto w-full aspect-square">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <span className="text-sm font-medium text-muted-foreground">{member.contributor}</span>
              </div>
              <div className="border-t border-border"></div>
            </CardHeader>

            <CardContent className="space-y-4 -mt-4">

            <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Escape Progress</span>
                <div className="flex items-center gap-2 flex-1 pl-4">
                   <ProgressCard value={member.progress} className="flex-1" />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Occupation</span>
                <span className="text-sm text-muted-foreground text-right">{member.role}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Core Skills</span>
                <span className="text-sm text-muted-foreground text-right">{member.coreSkills}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Projects</span>
                <span className="text-sm text-muted-foreground text-right">
                  {member.projects.join(", ")}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Weakness</span>
                <span className="text-sm text-muted-foreground text-right">{member.weakness}</span>
              </div>

              <div className="flex justify-center gap-2 pt-2">
                {member.linkedin && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-2 bg-transparent rounded-full"
                    onClick={() => window.open(member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`, '_blank')}
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </Button>
                )}
                {member.github && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-2 bg-transparent rounded-full"
                    onClick={() => window.open(member.github.startsWith('http') ? member.github : `https://${member.github}`, '_blank')}
                  >
                    <GithubIcon className="h-4 w-4" />
                  </Button>
                )}
                {member.twitter && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-2 bg-transparent rounded-full"
                    onClick={() => window.open(member.twitter.startsWith('http') ? member.twitter : `https://${member.twitter}`, '_blank')}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </section>
  )
}

