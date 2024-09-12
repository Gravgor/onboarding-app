/*
  Warnings:

  - Added the required column `companyId` to the `Onboarding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Onboarding" ADD COLUMN     "companyId" TEXT NOT NULL,
ADD COLUMN     "durationInDays" INTEGER,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE';

-- AddForeignKey
ALTER TABLE "Onboarding" ADD CONSTRAINT "Onboarding_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
