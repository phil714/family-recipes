-- AlterEnum
ALTER TYPE "AccessRole" ADD VALUE 'VIEWER';

-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 day';
