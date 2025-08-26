/*
  Warnings:

  - You are about to drop the column `appleSub` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."User_appleSub_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "appleSub";
