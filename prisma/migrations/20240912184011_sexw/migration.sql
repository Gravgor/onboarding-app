/*
  Warnings:

  - Added the required column `description` to the `OnboardingTemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `TemplateTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OnboardingTemplate" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TemplateTask" ADD COLUMN     "category" TEXT NOT NULL;
