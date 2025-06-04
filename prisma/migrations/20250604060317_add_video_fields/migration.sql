-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "description" TEXT,
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "isFree" BOOLEAN DEFAULT false,
ADD COLUMN     "lectureNumber" INTEGER,
ADD COLUMN     "videoLink" TEXT;
