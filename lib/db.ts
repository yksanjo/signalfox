// Mock database client for demo
// In production, use Prisma with PostgreSQL

export const prisma = {
  signal: {
    findMany: async () => [],
    create: async (data: any) => data,
    count: async () => 0,
  },
  company: {
    findFirst: async () => null,
    create: async (data: any) => data,
  },
  user: {
    findMany: async () => [],
  },
  subscription: {
    create: async (data: any) => data,
    update: async (data: any) => data,
  },
  $disconnect: async () => {},
}