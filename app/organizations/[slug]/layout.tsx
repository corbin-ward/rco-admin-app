'use client'

import { notFound, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getOrganizationBySlug } from "@/lib/data/organizations"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"

export default function OrganizationLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const organization = getOrganizationBySlug(params.slug)
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("information")

  useEffect(() => {
    const path = pathname.split('/').pop()
    setActiveTab(path === params.slug ? "information" : path || "information")
  }, [pathname, params.slug])

  if (!organization) {
    notFound()
  }

  const tabs = [
    { name: "Information", value: "information", href: `/organizations/${params.slug}` },
    { name: "Officers", value: "officers", href: `/organizations/${params.slug}/officers` },
    { name: "Roster", value: "roster", href: `/organizations/${params.slug}/roster` },
    { name: "Documents", value: "documents", href: `/organizations/${params.slug}/documents` },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8">
        <Image
          src={organization.banner}
          alt={`${organization.name} banner`}
          width={1000}
          height={300}
          className="w-full h-[200px] object-cover rounded-t-lg"
        />
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
        <div className="absolute bottom-4 left-4 flex items-end">
          <Image
            src={organization.icon}
            alt={organization.name}
            width={100}
            height={100}
            className="rounded-full border-4 border-white mr-4"
          />
          <div className="text-white">
            <h1 className="text-3xl font-bold">{organization.name}</h1>
            <p className="text-xl">{organization.type}</p>
            <p>Founded: {organization.foundingDate.getFullYear()} | Members: {organization.memberCount}</p>
          </div>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-0">
          <Tabs value={activeTab} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value} 
                  onClick={() => setActiveTab(tab.value)}
                  asChild
                >
                  <Link href={tab.href}>{tab.name}</Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {children}
    </div>
  )
}

