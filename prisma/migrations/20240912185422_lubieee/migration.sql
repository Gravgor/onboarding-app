/*
  Warnings:

  - Added the required column `type` to the `TemplateComplianceItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TemplateComplianceItem" ADD COLUMN     "type" TEXT NOT NULL;
