"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsIcon, SaveIcon } from "lucide-react"
import { useMemberContext, type Member } from "@/lib/member-context"

export function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { members, updateMember } = useMemberContext()

  const handleSave = () => {
    alert("Progress updated successfully!")
  }

  const handleFieldUpdate = (memberName: string, field: string, value: number) => {
    updateMember(memberName, field as keyof Member, value)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4">
        <Button onClick={() => setIsOpen(true)} className="bg-accent hover:bg-accent/90 shadow-lg" size="lg">
          <SettingsIcon className="h-5 w-5 mr-2" />
          Admin Panel
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Admin Panel
            </CardTitle>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue={members[0]?.name.toLowerCase()} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              {members.map((member) => (
                <TabsTrigger key={member.name} value={member.name.toLowerCase()}>
                  {member.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {members.map((member) => (
              <TabsContent key={member.name} value={member.name.toLowerCase()} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${member.name}-progress`}>Progress (%)</Label>
                    <Input
                      id={`${member.name}-progress`}
                      type="number"
                      min="0"
                      max="100"
                      value={member.progress}
                      onChange={(e) => handleFieldUpdate(member.name, "progress", Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${member.name}-interviews`}>Interviews</Label>
                    <Input
                      id={`${member.name}-interviews`}
                      type="number"
                      min="0"
                      value={member.interviews}
                      onChange={(e) => handleFieldUpdate(member.name, "interviews", Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${member.name}-applications`}>Applications</Label>
                    <Input
                      id={`${member.name}-applications`}
                      type="number"
                      min="0"
                      value={member.applications}
                      onChange={(e) => handleFieldUpdate(member.name, "applications", Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${member.name}-productsLaunched`}>Products Launched</Label>
                    <Input
                      id={`${member.name}-productsLaunched`}
                      type="number"
                      min="0"
                      value={member.productsLaunched}
                      onChange={(e) => handleFieldUpdate(member.name, "productsLaunched", Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              <SaveIcon className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
