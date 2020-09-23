import fetch from "isomorphic-unfetch";
import config from "./config";

export type Ad = {
  id: string;
  title: string;
  url: string;
};

export type Ads = Ad[];

export function getAds() {
  return fetch(`${config.ads.apiUrl}/api/ads`).then((r) => r.json());
}
