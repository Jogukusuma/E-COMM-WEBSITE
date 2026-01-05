"use client"

import Link from 'next/link'
import { Computer, ShoppingCart, User, Search } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from './ui/button'
import { useCart } from '@/hooks/use-cart'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Input } from './ui/input'
import { Badge } from './ui/badge'

export function Header() {
  const { cartCount } = useCart()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const searchQuery = formData.get('search') as string
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Computer className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block">
            SriComputers
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <form
            onSubmit={handleSearch}
            className="w-full flex-1 md:w-auto md:flex-none"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                name="search"
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 md:w-64 lg:w-96"
              />
            </div>
          </form>
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
