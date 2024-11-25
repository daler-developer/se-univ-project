CREATE TABLE IF NOT EXISTS "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" varchar(256),
	"isPinned" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"sender_id" integer,
	"receiver_id" integer
);
