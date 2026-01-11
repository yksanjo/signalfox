import Link from 'next/link'
import { FiBell, FiSearch, FiUser } from 'react-icons/fi'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">SignalFox</span>
            </Link>
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
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <FiSearch className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <FiBell className="w-5 h-5" />
            </button>
            <Link href="/login" className="btn-primary">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}