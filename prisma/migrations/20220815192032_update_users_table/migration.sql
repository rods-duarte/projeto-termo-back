/*
  Warnings:

  - You are about to drop the column `score` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "score",
ADD COLUMN     "fiveGuess" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fourGuess" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "oneGuess" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sixGuess" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "threeGuess" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "twoGuess" INTEGER NOT NULL DEFAULT 0;
