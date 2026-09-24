// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// 1. تعريف نوع متغير Prisma على الكائن العام globalThis
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 2. إذا كانت النسخة موجودة استخدمها، وإلا أنشئ نسخة جديدة
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// 3. لحفظ النسخة في globalThis في بيئة التطوير فقط لمنع إنشاء اتصالات مكررة
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;