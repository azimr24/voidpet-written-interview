/*
  Warnings:

  - You are about to drop the column `authType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `deviceId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."User_deviceId_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "authType",
DROP COLUMN "deviceId";
