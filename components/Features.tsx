import { FiDollarSign, FiUsers, FiGlobe, FiBell, FiTarget, FiZap } from 'react-icons/fi'

const features = [
  {
    name: 'Funding Intelligence',
    description: 'Track Series A, B, C+ rounds in real-time. Know exactly when companies have money to spend.',
    icon: FiDollarSign,
  },
  {
    name: 'Hiring Signals',
    description: 'Monitor executive hires, engineering expansions, and key role openings.',
    icon: FiUsers,
  },
  {
    name: 'Expansion Tracking',
    description: 'Get alerts when companies open new offices or enter new markets.',
    icon: FiGlobe,
  },
  {
    name: 'Real-time Alerts',
    description: 'Email, Slack, or SMS notifications when important signals are detected.',
    icon: FiBell,
  },
  {
    name: 'Target Account Lists',
    description: 'Create and monitor lists of companies you want to sell to.',
    icon: FiTarget,
  },
  {
    name: 'Competitor Insights',
    description: 'See which companies your competitors are targeting and when.',
    icon: FiZap,
  },
]

export default function Features() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to win deals
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Stop guessing and start knowing. Get the intelligence you need to reach out at exactly the right moment.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold">Built for Soundraw BD Team</h3>
            <p className="mt-4 text-lg">
              "We use SignalFox daily to identify companies that just raised funding and are expanding their teams. 
              It's our secret weapon for outbound sales."
            </p>
            <div className="mt-6">
              <p className="font-semibold">— Soundraw Business Development Team</p>
              <p className="text-sm opacity-80">Current customer since 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}