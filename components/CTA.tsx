import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

export default function CTA() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to close more deals?</span>
            <span className="block text-primary-600">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Get started for free
                <FiArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200"
              >
                Watch demo
              </Link>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-5 w-5 text-green-400">✓</div>
                <span className="ml-2">No credit card required</span>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-5 w-5 text-green-400">✓</div>
                <span className="ml-2">14-day free trial</span>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-5 w-5 text-green-400">✓</div>
                <span className="ml-2">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">First 100 customers get:</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-primary-500">🎯</div>
                <span className="ml-3 text-gray-700">Lifetime 20% discount</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-primary-500">⚡</div>
                <span className="ml-3 text-gray-700">Priority feature requests</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-primary-500">🤝</div>
                <span className="ml-3 text-gray-700">Direct access to founders</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Join other B2B sales teams from startups like Soundraw, Retool, and Vercel.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}