-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "color" TEXT NOT NULL DEFAULT '#E2E8F0';

-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 day';
