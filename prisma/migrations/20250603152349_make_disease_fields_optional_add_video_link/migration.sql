-- AlterTable
ALTER TABLE "Disease" ADD COLUMN     "videoLink" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "precautions" DROP NOT NULL,
ALTER COLUMN "remedies" DROP NOT NULL,
ALTER COLUMN "symptoms" DROP NOT NULL;
