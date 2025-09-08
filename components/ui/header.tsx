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
    <header className="absolute left-0 top-0 h-screen w-64 bg-background z-50">
      {/* Logo */}
      <div className="flex flex-col items-start justify-start h-1/5 pt-8 pl-6">
        <div className="text-center">
          <span className="text-4xl font-bold text-foreground">pbw</span>
          <span className="text-xs text-muted-foreground"> prison break wednesdays</span>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex flex-col items-start justify-between h-3/5 py-8 pl-8">
        {navItems.map((item) => (
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
