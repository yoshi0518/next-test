CREATE TABLE "test7"."t_contact" (
	"id" serial PRIMARY KEY NOT NULL,
	"entry_class" smallint NOT NULL,
	"name" varchar(100) NOT NULL,
	"zip_code" varchar(10),
	"address" varchar(200),
	"tel" varchar(20),
	"email" varchar(100),
	"service_type" smallint,
	"property_type" smallint,
	"area" varchar(100),
	"contact" text,
	"created_at" timestamp NOT NULL
);
