CREATE TABLE "public"."ad_loads"("ad" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("ad","created_at") );
