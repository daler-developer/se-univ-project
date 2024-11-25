CREATE TABLE IF NOT EXISTS "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256),
	"password" varchar(256),
	"profilePicture" varchar(256),
	"description" varchar(256),
	"location" varchar(256),
	"phone" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_product_purchases" (
	"id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"company_id" integer NOT NULL,
	"status" varchar(256),
	"created_at" timestamp DEFAULT now(),
	"delivery_service_id" integer,
	CONSTRAINT "company_product_purchases_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "delivery_services" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256),
	"logoUrl" varchar(256),
	"password" varchar(256),
	"phone" varchar(256),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" varchar(256),
	"stars" integer,
	"product_id" integer,
	"company_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"image" varchar(256),
	"created_at" varchar(256),
	"company_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_product_purchases" ADD CONSTRAINT "company_product_purchases_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_product_purchases" ADD CONSTRAINT "company_product_purchases_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
