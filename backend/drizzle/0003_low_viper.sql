ALTER TABLE "products" ADD COLUMN "deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "purchases_count" integer DEFAULT 0;