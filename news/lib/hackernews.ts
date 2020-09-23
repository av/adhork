import fetch from "isomorphic-unfetch";
import config from "./config";

export type NewsItem = {
  id: number;
  type: string;
  time: number;
  text?: string;
  title?: string;
  url?: string;
};

export type News = NewsItem[];

export function getNews() {
  return fetch(`${config.hackernews.apiUrl}/v0/newstories.json`)
    .then((r) => r.json())
    .then((news) => news.slice(0, config.hackernews.count))
    .then((newsItems) =>
      Promise.all(newsItems.map((newsItem) => getNewsItem(newsItem)))
    );
}

export function getNewsItem(id: number) {
  return fetch(`${config.hackernews.apiUrl}/v0/item/${id}.json`).then((r) =>
    r.json()
  );
}
