export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 pt-16 grid grid-cols-1 xl:grid-cols-[minmax(320px,380px)_minmax(640px,1fr)_minmax(320px,380px)]">
      {children}
    </div>
  )
}

