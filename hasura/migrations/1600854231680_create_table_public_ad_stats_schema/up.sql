CREATE TABLE "public"."ad_stats_schema"("ad" uuid NOT NULL, "clicks" bigint NOT NULL, "loads" bigint NOT NULL, PRIMARY KEY ("ad") ); COMMENT ON TABLE "public"."ad_stats_schema" IS E'Schema-only table for function aggregating ads';