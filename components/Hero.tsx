import Link from 'next/link'
import { FiTrendingUp, FiTarget, FiZap } from 'react-icons/fi'

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Never miss a</span>
                <span className="block text-primary-600">B2B sales signal</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Track funding rounds, hiring sprees, and expansion signals from companies you want to sell to. 
                Get alerts before your competitors do.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    href="/signup"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                  >
                    Start Free Trial
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    href="/demo"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
                  >
                    Watch Demo
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-gradient-to-r from-primary-400 to-primary-600 sm:h-72 md:h-96 lg:w-full lg:h-full">
          <div className="h-full w-full flex items-center justify-center p-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FiTrendingUp className="w-6 h-6 text-white" />
                  <div>
                    <p className="text-white font-medium">Series B Closed</p>
                    <p className="text-white/80 text-sm">Stripe - $245M raised</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FiTarget className="w-6 h-6 text-white" />
                  <div>
                    <p className="text-white font-medium">New CTO Hired</p>
                    <p className="text-white/80 text-sm">Notion - Former Google VP</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FiZap className="w-6 h-6 text-white" />
                  <div>
                    <p className="text-white font-medium">Office Expansion</p>
                    <p className="text-white/80 text-sm">Figma - Opening in Austin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}