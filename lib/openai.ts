// Simplified OpenAI client for demo
// In production, use the real OpenAI SDK

// Mock embeddings for demo
export async function generateEmbedding(text: string): Promise<number[]> {
  // Return mock embedding
  return Array(1536).fill(0).map(() => Math.random() - 0.5)
}

// Mock classification for demo
export async function classifySignal(text: string): Promise<{
  type: 'funding' | 'hiring' | 'expansion' | 'news'
  confidence: number
  metadata?: Record<string, any>
}> {
  // Simple keyword-based classification for demo
  const lowerText = text.toLowerCase()
  
  if (lowerText.includes('funding') || lowerText.includes('raised') || lowerText.includes('series')) {
    return {
      type: 'funding',
      confidence: 0.9,
      metadata: { amount: 10000000, stage: 'series_b' }
    }
  } else if (lowerText.includes('hire') || lowerText.includes('cto') || lowerText.includes('executive')) {
    return {
      type: 'hiring',
      confidence: 0.8,
      metadata: { role: 'CTO', department: 'engineering' }
    }
  } else if (lowerText.includes('office') || lowerText.includes('expand') || lowerText.includes('location')) {
    return {
      type: 'expansion',
      confidence: 0.7,
      metadata: { location: 'Austin, TX' }
    }
  } else {
    return {
      type: 'news',
      confidence: 0.6,
      metadata: {}
    }
  }
}

// Mock company info extraction
export async function extractCompanyInfo(text: string): Promise<{
  companyName?: string
  domain?: string
  fundingAmount?: number
  fundingStage?: string
  role?: string
  location?: string
}> {
  // Simple extraction for demo
  const companies = ['Stripe', 'Notion', 'Figma', 'OpenAI', 'Vercel', 'Railway']
  const company = companies.find(c => text.includes(c)) || 'Tech Startup'
  
  return {
    companyName: company,
    domain: company.toLowerCase() + '.com',
    fundingAmount: 10000000,
    fundingStage: 'series_b',
    role: 'CTO',
    location: 'San Francisco, CA'
  }
}