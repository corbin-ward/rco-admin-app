'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import Link from 'next/link'
import { getAllOrganizations } from '@/lib/data/organizations'
import { OrganizationDetails } from '@/lib/types'

export function OrganizationSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<OrganizationDetails[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const organizations = getAllOrganizations()
    const filteredResults = organizations.filter(org => 
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setResults(filteredResults)
    setIsOpen(searchTerm.length > 0 && filteredResults.length > 0)
  }, [searchTerm])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search Organizations"
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          <ul className="py-1">
            {results.map((org) => (
              <li key={org.id}>
                <Link
                  href={`/organizations/${org.slug}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-medium">{org.name}</span>
                  <span className="ml-2 text-sm text-gray-500">({org.code})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

