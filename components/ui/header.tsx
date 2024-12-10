'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { ChevronDown } from 'lucide-react'

const navItems = [
  { name: "Explore", path: "/explore" },
  { name: "Editor", path: "/editor" },
  { name: "Events", path: "/events" },
  { name: "Tasks", path: "/tasks" },
]

function MobileNavItem({ name, path, closeMobileMenu, isActive }) {
  return (
    <NavigationMenuItem className="w-full">
      <NavigationMenuLink asChild>
        <Link
          href={path}
          className={`${navigationMenuTriggerStyle()} ${
            isActive ? "bg-accent" : ""
          } w-full justify-center`}
          onClick={closeMobileMenu}
        >
          {name}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [currentPage, setCurrentPage] = useState("Home")

  useEffect(() => {
    const currentNavItem = navItems.find(item => item.path === pathname)
    setCurrentPage(currentNavItem ? currentNavItem.name : "Home")
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 right-0 flex h-16 shrink-0 items-center justify-between border-b px-4 bg-white z-50">
      <div className="flex-shrink-0">
        <Link href="/">
          <Image
            src="https://i.ibb.co/bRLrD8v/Catlife-Header-2-640x300.png"
            alt="Organization Logo"
            width={80}
            height={80}
            priority
          />
        </Link>
      </div>

      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.path}>
              <NavigationMenuLink asChild>
                <Link href={item.path} className={navigationMenuTriggerStyle()}>
                  {item.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" className="px-2 py-1">
            <span className="mr-2">{currentPage}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="w-full pt-16">
          <SheetTitle className="text-left mb-4">Navigation</SheetTitle>
          <NavigationMenu className="flex flex-col items-center w-full mt-4">
            <NavigationMenuList className="flex-col items-center space-y-2 w-full">
              {navItems.map((item) => (
                <MobileNavItem
                  key={item.path}
                  name={item.name}
                  path={item.path}
                  closeMobileMenu={() => setMobileMenuOpen(false)}
                  isActive={item.path === pathname}
                />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </SheetContent>
      </Sheet>

      <div className="flex-shrink-0">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

