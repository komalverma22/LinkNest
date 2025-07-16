-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "imgURL" TEXT NOT NULL,
    "videoURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_imgURL_key" ON "User"("imgURL");

-- CreateIndex
CREATE UNIQUE INDEX "User_videoURL_key" ON "User"("videoURL");
