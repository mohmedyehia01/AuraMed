/*
  Warnings:

  - A unique constraint covering the columns `[nationalId]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "nationalId" TEXT,
ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT,
ALTER COLUMN "address" SET DATA TYPE TEXT,
ALTER COLUMN "insuranceNumber" SET DATA TYPE TEXT,
ALTER COLUMN "insuranceProvider" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Patient_nationalId_key" ON "Patient"("nationalId");
