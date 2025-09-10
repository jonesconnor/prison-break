import Link from "next/link"

export function Header() {
  const navItems = [
    { name: "contact", href: "#donation" },
    { name: "escape plan", href: "#donation" },
    { name: "projects", href: "#projects" },
    { name: "about us", href: "#about" },
    { name: "home", href: "#hero" },
  ]

 return (
    <header className="absolute left-0 top-0 h-screen w-8 bg-background z-50">
      {/* Navigation */}
      <div className="flex flex-col items-start justify-center h-1/2 translate-y-1/2 pl-6 space-y-24">
        {navItems.map((item, index) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 block"
            style={{
              transform: "rotate(-90deg)",
              whiteSpace: "nowrap",
              transformOrigin: "left center",
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </header>
  )
}
