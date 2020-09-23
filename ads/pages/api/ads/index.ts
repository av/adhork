import { NextApiRequest, NextApiResponse } from "next";
import hasura from "lib/hasura";
import { adsQuery, recordLoadMutation } from "lib/queries/ads";
import { maskUrl } from "lib/ads";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { ads } = await hasura.request(adsQuery);

  ads = await Promise.all(
    (ads = ads.map((ad) =>
      hasura.request(recordLoadMutation, { id: ad.id }).then(() => maskUrl(ad))
    ))
  );

  return res.json(ads);
};
