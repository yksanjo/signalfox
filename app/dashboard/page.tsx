'use client'

import { useState, useEffect } from 'react'
import { FiFilter, FiDownload, FiBell, FiTrendingUp, FiUsers, FiGlobe } from 'react-icons/fi'

interface Signal {
  id: string
  type: string
  title: string
  description: string
  source: string
  createdAt: string
  company: {
    name: string
    domain: string
  }
}

export default function DashboardPage() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchSignals()
  }, [filter])

  async function fetchSignals() {
    try {
      const response = await fetch(`/api/signals?type=${filter === 'all' ? '' : filter}`)
      const data = await response.json()
      setSignals(data.signals || [])
    } catch (error) {
      console.error('Error fetching signals:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    total: signals.length,
    funding: signals.filter(s => s.type === 'funding').length,
    hiring: signals.filter(s => s.type === 'hiring').length,
    expansion: signals.filter(s => s.type === 'expansion').length,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Track signals from companies you're targeting</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <FiTrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Signals</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <FiTrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Funding Rounds</p>
              <p className="text-2xl font-bold">{stats.funding}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <FiUsers className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Hiring Signals</p>
              <p className="text-2xl font-bold">{stats.hiring}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-100">
              <FiGlobe className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Expansions</p>
              <p className="text-2xl font-bold">{stats.expansion}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                All Signals
              </button>
              <button
                onClick={() => setFilter('funding')}
                className={`px-4 py-2 rounded-lg ${filter === 'funding' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Funding
              </button>
              <button
                onClick={() => setFilter('hiring')}
                className={`px-4 py-2 rounded-lg ${filter === 'hiring' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Hiring
              </button>
              <button
                onClick={() => setFilter('expansion')}
                className={`px-4 py-2 rounded-lg ${filter === 'expansion' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Expansion
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <FiFilter className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <FiDownload className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Signals List */}
        <div className="divide-y">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading signals...</p>
            </div>
          ) : signals.length === 0 ? (
            <div className="p-8 text-center">
              <FiBell className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="mt-4 text-gray-600">No signals yet. Start tracking companies to see signals here.</p>
              <button className="mt-4 btn-primary">
                Add Companies to Track
              </button>
            </div>
          ) : (
            signals.map((signal) => (
              <div key={signal.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        signal.type === 'funding' ? 'bg-green-100 text-green-800' :
                        signal.type === 'hiring' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {signal.type}
                      </span>
                      <span className="text-sm text-gray-500">{signal.source}</span>
                    </div>
                    <h3 className="mt-2 font-medium text-gray-900">{signal.title}</h3>
                    <p className="mt-1 text-gray-600">{signal.description}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-900">{signal.company.name}</span>
                      <span className="text-sm text-gray-500">{new Date(signal.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <FiBell className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Demo Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Demo Mode</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>This is a demo dashboard. In production, you would see real-time signals from companies you're tracking.</p>
              <p className="mt-1">To get started, add companies to track and we'll monitor them for funding, hiring, and expansion signals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}