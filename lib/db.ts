import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Helper functions for common operations
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      subscription: true,
      companies: true,
      signals: {
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
    },
  })
}

export async function createUser(email: string, name?: string) {
  return prisma.user.create({
    data: {
      email,
      name,
    },
  })
}

export async function getSignalsForUser(userId: string, filters?: { type?: string }) {
  return prisma.signal.findMany({
    where: {
      userId,
      ...(filters?.type && { type: filters.type }),
    },
    include: {
      company: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })
}

export async function createSignal(data: {
  type: string
  title: string
  description?: string
  source: string
  url?: string
  companyId: string
  userId: string
  metadata?: any
}) {
  return prisma.signal.create({
    data,
    include: {
      company: true,
    },
  })
}

export async function getCompanyByDomain(domain: string) {
  return prisma.company.findUnique({
    where: { domain },
  })
}

export async function createCompany(data: {
  name: string
  domain: string
  userId: string
  crunchbaseId?: string
  linkedinUrl?: string
  industry?: string
  employeeCount?: number
  fundingStage?: string
}) {
  return prisma.company.create({
    data,
  })
}