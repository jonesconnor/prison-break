"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Member {
  name: string
  role: string
  contributor: string
  progress: number
  applications: number
  interviews: number
  productsLaunched: number
  avatar: string
  initials: string
  linkedin: string
  github: string
  twitter: string
  coreSkills: string
  weakness: string
}

interface MemberContextType {
  members: Member[]
  updateMember: (memberName: string, field: keyof Member, value: string | number) => void
}

const MemberContext = createContext<MemberContextType | undefined>(undefined)

const initialMembers: Member[] = [
  {
    name: "Connor Jones",
    role: "Software Developer",
    contributor: "Contributor 001",
    progress: 20,
    applications: 8,
    interviews: 3,
    productsLaunched: 2,
    avatar: "/Connor.png",
    initials: "CJ",
    linkedin: "www.linkedin.com/in/connorgarrettjones",
    github: "https://github.com/jonesconnor",
    twitter: "https://x.com/jonesconnorg",
    coreSkills: "Python, Networking & Cloud Infra",
    weakness: "Persian women",
  },
  {
    name: "Cole Beevor-Potts",
    role: "Product Manager",
    contributor: "Contributor 002",
    progress: 45,
    applications: 6,
    interviews: 2,
    productsLaunched: 1,
    avatar: "/Cole.png",
    initials: "CBP",
    linkedin: "https://www.linkedin.com/in/colebeevor-potts/",
    github: "https://github.com/colebpotts",
    twitter: "https://x.com/beevor79178",
    coreSkills: "User Research, DevOps & Figma",
    weakness: "Fantasy football",
  },
  {
    name: "Harry McKinney",
    role: "Product Analyst",
    contributor: "Contributor 003",
    progress: 30,
    applications: 12,
    interviews: 1,
    productsLaunched: 3,
    avatar: "/Harry.png",
    initials: "HM",
    linkedin: "https://www.linkedin.com/in/hmckin/",
    github: "https://github.com/hmckin",
    twitter: "https://x.com/butimjust_harry",
    coreSkills: "Figma, Next.js & UI/UX",
    weakness: "Neck kisses",
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