/*
  Warnings:

  - A unique constraint covering the columns `[pseudo,projetId]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Participant_pseudo_key";

-- CreateIndex
CREATE UNIQUE INDEX "Participant_pseudo_projetId_key" ON "Participant"("pseudo", "projetId");
