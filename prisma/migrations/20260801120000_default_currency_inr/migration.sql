-- India-first: INR becomes the default display currency for new users.
ALTER TABLE "users" ALTER COLUMN "currency" SET DEFAULT 'INR';

-- Migrate existing users who never changed off the old USD default.
UPDATE "users" SET "currency" = 'INR' WHERE "currency" = 'USD';
