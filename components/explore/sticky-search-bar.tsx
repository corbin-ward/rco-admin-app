'use client'

import { useEffect, useRef, useState } from 'react'
import { OrganizationSearch } from './organization-search'

// Rename to StickySearchBar
export function StickySearchBar() {
  const [isSticky, setIsSticky] = useState(false)
  const searchBarRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const searchBar = searchBarRef.current
    const placeholder = placeholderRef.current
    if (!searchBar || !placeholder) return

    const observer = new IntersectionObserver(
      ([e]) => {
        setIsSticky(e.intersectionRatio < 1)
      },
      { threshold: [1], rootMargin: "-1px 0px 0px 0px" }
    )

    observer.observe(placeholder)

    return () => {
      observer.unobserve(placeholder)
    }
  }, [])

  return (
    <>
      <div ref={placeholderRef} className="h-[56px] -mb-[56px]" />
      <div
        ref={searchBarRef}
        className={`sticky top-[-8px] z-10 bg-background py-2 transition-shadow duration-200 ${
          isSticky ? 'shadow-md' : ''
        }`}
      >
        <OrganizationSearch />
      </div>
    </>
  )
}

