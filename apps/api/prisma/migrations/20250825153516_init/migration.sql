-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "authType" TEXT NOT NULL,
    "deviceId" TEXT,
    "appleSub" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_deviceId_key" ON "public"."User"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "User_appleSub_key" ON "public"."User"("appleSub");
