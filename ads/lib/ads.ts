import config from "./config";
import { NextApiRequest } from "next";
import { isAcceptingHTML, hasUserAgent } from "./utils";

export type Ad = {
  id: string;
  title: string;
  url: string;
};

export type AdStatsDocument = {
  ad: string;
  loads: number;
  clicks: number;
};

export type AdStats = {
  ad: Ad;
  stats: AdStatsDocument;
};

export function shouldRedirect(req: NextApiRequest) {
  const criteria = [isAcceptingHTML(req), hasUserAgent(req)];
  return criteria.every(Boolean);
}

export function maskUrl(ad: Ad): Ad {
  return {
    ...ad,
    url: buildAdUrl(ad.id),
  };
}

export function buildAdUrl(id: string) {
  return `${config.self.apiUrl}/api/ads/${id}`;
}
