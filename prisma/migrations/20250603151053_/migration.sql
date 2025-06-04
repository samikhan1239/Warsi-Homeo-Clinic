/*
  Warnings:

  - You are about to drop the column `doctorId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the `Doctor` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `email` on table `Appointment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `Appointment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Appointment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Appointment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reason` on table `Appointment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `time` on table `Appointment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `precautions` to the `Disease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remedies` to the `Disease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symptoms` to the `Disease` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_doctorId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "doctorId",
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "reason" SET NOT NULL,
ALTER COLUMN "time" SET NOT NULL;

-- AlterTable
ALTER TABLE "Disease" ADD COLUMN     "precautions" TEXT NOT NULL,
ADD COLUMN     "remedies" TEXT NOT NULL,
ADD COLUMN     "symptoms" TEXT NOT NULL,
ADD COLUMN     "videoUrl" TEXT;

-- DropTable
DROP TABLE "Doctor";
