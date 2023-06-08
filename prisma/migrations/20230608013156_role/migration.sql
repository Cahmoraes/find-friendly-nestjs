-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_orgs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_orgs" ("city", "createdAt", "email", "id", "password_hash", "phone") SELECT "city", "createdAt", "email", "id", "password_hash", "phone" FROM "orgs";
DROP TABLE "orgs";
ALTER TABLE "new_orgs" RENAME TO "orgs";
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");
CREATE UNIQUE INDEX "orgs_phone_key" ON "orgs"("phone");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
