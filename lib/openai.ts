import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set')
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Generate embeddings for text
export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
    encoding_format: 'float',
  })

  return response.data[0].embedding
}

// Classify signal type
export async function classifySignal(text: string): Promise<{
  type: 'funding' | 'hiring' | 'expansion' | 'news'
  confidence: number
  metadata?: Record<string, any>
}> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `You are a signal classifier for B2B sales intelligence. Classify the following text into one of these categories:
        - funding: Company raised money (Series A, B, C, etc.)
        - hiring: Company is hiring executives or expanding team
        - expansion: Company opening new offices or entering new markets
        - news: Other company news
        
        Return JSON with: type, confidence (0-1), and metadata if relevant (like amount, role, location).`
      },
      {
        role: 'user',
        content: text
      }
    ],
    response_format: { type: 'json_object' }
  })

  const result = JSON.parse(completion.choices[0].message.content || '{}')
  return result
}

// Extract company information from text
export async function extractCompanyInfo(text: string): Promise<{
  companyName?: string
  domain?: string
  fundingAmount?: number
  fundingStage?: string
  role?: string
  location?: string
}> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `Extract company information from the text. Return JSON with any of these fields if found:
        - companyName: Name of the company
        - domain: Company website domain
        - fundingAmount: Amount raised in dollars (as number)
        - fundingStage: Stage of funding (seed, series_a, series_b, series_c, etc.)
        - role: Job role being hired for
        - location: Location of expansion or new office`
      },
      {
        role: 'user',
        content: text
      }
    ],
    response_format: { type: 'json_object' }
  })

  const result = JSON.parse(completion.choices[0].message.content || '{}')
  return result
}