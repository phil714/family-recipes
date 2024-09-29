-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 day';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "language" TEXT;
