-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 day';

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT false;
