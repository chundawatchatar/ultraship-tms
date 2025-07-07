"use client"

import { useState, useEffect } from "react"
import { Menu, X, Grid3X3, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  isGridView: boolean
  onViewToggle: (isGrid: boolean) => void
}

export function Header({ isGridView, onViewToggle }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const menuItems = [
    {
      title: "Dashboard",
      href: "#",
      submenu: [
        { title: "Overview", href: "#" },
        { title: "Analytics", href: "#" },
        { title: "Reports", href: "#" },
      ],
    },
    {
      title: "Employees",
      href: "#",
      submenu: [
        { title: "All Employees", href: "#" },
        { title: "Departments", href: "#" },
        { title: "Positions", href: "#" },
        { title: "Performance", href: "#" },
      ],
    },
    {
      title: "Projects",
      href: "#",
      submenu: [
        { title: "Active Projects", href: "#" },
        { title: "Completed", href: "#" },
        { title: "Planning", href: "#" },
      ],
    },
    {
      title: "Reports",
      href: "#",
    },
    {
      title: "Settings",
      href: "#",
      submenu: [
        { title: "User Settings", href: "#" },
        { title: "System Config", href: "#" },
      ],
    },
  ]

  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="border-b bg-white shadow-sm relative z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Employee Dashboard</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant={isGridView ? "default" : "outline"} size="sm" onClick={() => onViewToggle(true)}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant={!isGridView ? "default" : "outline"} size="sm" onClick={() => onViewToggle(false)}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Overlay Background */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Menu Content */}
        <nav className="p-4 space-y-2 overflow-y-auto h-full pb-20">
          {menuItems.map((item) => (
            <div key={item.title} className="space-y-1">
              <a
                href={item.href}
                onClick={handleMenuItemClick}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                {item.title}
              </a>
              {item.submenu && (
                <div className="ml-4 space-y-1">
                  {item.submenu.map((subItem) => (
                    <a
                      key={subItem.title}
                      href={subItem.href}
                      onClick={handleMenuItemClick}
                      className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                      {subItem.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
