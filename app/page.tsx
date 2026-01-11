import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      <Hero />
      <Features />
      <Pricing />
      <CTA />
    </div>
  )
}