'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiBell, FiSearch, FiUser, FiLogOut } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface User {
  email: string
  name: string
}

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user is logged in (demo only - check both localStorage and cookies)
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      // Check cookies as fallback
      const cookies = document.cookie.split(';')
      const userCookie = cookies.find(c => c.trim().startsWith('user='))
      if (userCookie) {
        const userData = JSON.parse(userCookie.split('=')[1])
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
      }
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem('user')
    // Clear the cookie
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    setUser(null)
    toast.success('Logged out successfully')
    router.push('/')
  }

  if (!mounted) {
    return (
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg"></div>
                <span className="text-xl font-bold text-gray-900">SignalFox</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">SignalFox</span>
            </Link>
            {user && (
              <div className="hidden md:flex ml-10 space-x-8">
                <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/companies" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                  Companies
                </Link>
                <Link href="/signals" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                  Signals
                </Link>
                <Link href="/pricing" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                  Pricing
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <FiSearch className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <FiBell className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
                    <FiUser className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    title="Logout"
                  >
                    <FiLogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-primary">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}