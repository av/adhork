import { NextApiRequest, NextApiResponse } from "next";
import hasura from "lib/hasura";
import { adQuery, recordClickMutation } from "lib/queries/ads";
import { shouldRedirect } from "lib/ads";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  const data = await hasura.request(adQuery, {
    id,
  });
  const ad = data.ads_by_pk;

  if (shouldRedirect(req)) {
    await hasura.request(recordClickMutation, { id: ad.id });
    return res.redirect(ad.url);
  } else {
    return res.json(ad);
  }
};
