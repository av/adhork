CREATE OR REPLACE FUNCTION public.ad_stats_daily(ad_id uuid, day timestamp without time zone) 
RETURNS SETOF ad_stats_schema AS $$ 
WITH range AS (
  SELECT
    date_trunc('day', day) as day_start,
    date_trunc('day', day) + INTERVAL '1 day' as day_end
)

SELECT
  ad_id as ad,
  (
    SELECT
      COUNT(*)
    FROM
      ad_loads as l
    WHERE
      l.ad = ad_id
      AND l.created_at >= range.day_start
      AND l.created_at < range.day_end
  ) as loads,
  (
    SELECT
      COUNT(*)
    FROM
      ad_clicks as c
    WHERE
      c.ad = ad_id
      AND c.created_at >= range.day_start
      AND c.created_at < range.day_end
  ) as clicks
FROM
  range 
$$ LANGUAGE sql STABLE;
