"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Member {
  name: string
  role: string
  company: string
  progress: number
  applications: number
  interviews: number
  productsLaunched: number
  avatar: string
  initials: string
  linkedin: string
  github: string
  twitter: string
}

interface MemberContextType {
  members: Member[]
  updateMember: (memberName: string, field: keyof Member, value: string | number) => void
}

const MemberContext = createContext<MemberContextType | undefined>(undefined)

const initialMembers: Member[] = [
  {
    name: "Cole",
    role: "Product Analyst",
    company: "Intellify",
    progress: 20,
    applications: 8,
    interviews: 3,
    productsLaunched: 2,
    avatar: "/professional-headshot-cole.png",
    initials: "CBP",
    linkedin: "https://www.linkedin.com/in/colebeevor-potts/",
    github: "",
    twitter: "",
  },
  {
    name: "Harry",
    role: "Product Analyst",
    company: "Intellify",
    progress: 45,
    applications: 6,
    interviews: 2,
    productsLaunched: 1,
    avatar: "/professional-headshot-harry.png",
    initials: "HM",
    linkedin: "https://www.linkedin.com/in/hmckin/",
    github: "",
    twitter: "https://x.com/butimjust_harry",
  },
  {
    name: "Connor",
    role: "SDE I",
    company: "Bell Canada",
    progress: 30,
    applications: 12,
    interviews: 1,
    productsLaunched: 3,
    avatar: "/professional-headshot-connor.png",
    initials: "CJ",
    linkedin: "www.linkedin.com/in/connorgarrettjones",
    github: "https://github.com/jonesconnor",
    twitter: "https://x.com/jonesconnorg",
  },
]

export function MemberProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<Member[]>(initialMembers)

  const updateMember = (memberName: string, field: keyof Member, value: string | number) => {
    setMembers(prev => 
      prev.map(member => 
        member.name === memberName 
          ? { ...member, [field]: value }
          : member
      )
    )
  }

  return (
    <MemberContext.Provider value={{ members, updateMember }}>
      {children}
    </MemberContext.Provider>
  )
}

export function useMemberContext() {
  const context = useContext(MemberContext)
  if (context === undefined) {
    throw new Error('useMemberContext must be used within a MemberProvider')
  }
  return context
}