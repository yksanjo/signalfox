import Link from 'next/link'
import { FiCheck } from 'react-icons/fi'

const tiers = [
  {
    name: 'Starter',
    price: '$99',
    period: '/month',
    description: 'Perfect for individual sales reps',
    features: [
      'Track up to 50 companies',
      'Email alerts',
      'Basic signal types',
      '7-day data history',
      'Community support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$299',
    period: '/year',
    description: 'Best value - save 75% vs ZoomInfo',
    features: [
      'Track up to 500 companies',
      'Email + Slack alerts',
      'All signal types',
      '30-day data history',
      'Priority support',
      'API access',
      'Team collaboration',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$499',
    period: '/month',
    description: 'For sales teams & agencies',
    features: [
      'Unlimited company tracking',
      'All alert channels',
      'Advanced analytics',
      '90-day data history',
      'Dedicated support',
      'Full API access',
      'Custom integrations',
      'SSO & security features',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            ZoomInfo costs $15,000+/year. We start at $99/month.
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
                tier.highlighted
                  ? 'ring-2 ring-primary-500 transform scale-105'
                  : 'bg-white'
              }`}
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                <p className="mt-4 text-gray-500">{tier.description}</p>
                <div className="mt-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-extrabold text-gray-900">{tier.price}</span>
                    <span className="ml-1 text-xl font-semibold text-gray-500">{tier.period}</span>
                  </div>
                  <Link
                    href={tier.name === 'Team' ? '/contact' : '/signup'}
                    className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                      tier.highlighted
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <FiCheck className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                      <span className="text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Need a custom plan? <Link href="/contact" className="text-primary-600 hover:text-primary-500">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  )
}