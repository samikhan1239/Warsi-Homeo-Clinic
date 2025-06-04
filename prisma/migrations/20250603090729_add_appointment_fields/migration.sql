/*
  Warnings:

  - You are about to drop the column `precautions` on the `Disease` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Disease` table. All the data in the column will be lost.
  - You are about to drop the `_StudentCourses` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Disease` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_StudentCourses" DROP CONSTRAINT "_StudentCourses_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudentCourses" DROP CONSTRAINT "_StudentCourses_B_fkey";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "doctorId" INTEGER,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "reason" TEXT,
ADD COLUMN     "time" TEXT;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Disease" DROP COLUMN "precautions",
DROP COLUMN "videoUrl",
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "_StudentCourses";

-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
