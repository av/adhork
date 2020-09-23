import * as ads from "./ads";
import { NextApiRequest } from "next";
import { Ad } from "./ads";
import config from "./config";

describe("shouldRedirect", () => {
  it("should return false for incomplete requests", () => {
    const nonPassingRequests = [
      {
        headers: { accept: "text/html" },
      },
      {
        headers: { "user-agent": "basically browser" },
      },
      {
        headers: {},
      },
    ];

    nonPassingRequests.forEach((req) => {
      expect(ads.shouldRedirect(req as NextApiRequest)).toBe(false);
    });
  });

  it("should return true for matching requests", () => {
    const passingRequests = [
      { headers: { accept: "text/html", "user-agent": "Chrome, for sure" } },
      {
        headers: {
          accept: "text/html,application/json",
          "user-agent": "Maybe a Fox of flames",
        },
      },
    ];

    passingRequests.forEach((req) => {
      expect(ads.shouldRedirect(req as NextApiRequest)).toBe(true);
    });
  });
});

describe("maskUrl", () => {
  it("should not modify passed object", () => {
    const originalAd = {};
    const updatedAd = ads.maskUrl(originalAd as Ad);
    expect(updatedAd).not.toBe(originalAd);
  });

  it("should update given ad url", () => {
    const id = Math.random().toString(16).replace(".", "");
    const ad = { id, url: "https://example.com" };
    const maskedAd = ads.maskUrl(ad as Ad);

    expect(maskedAd.url).not.toBe(ad.url);
    expect(maskedAd.url).toContain(id);
  });
});

describe("buildAdUrl", () => {
  it("should construct a URL for serving ad redirection", () => {
    const id = Math.random().toString(16).replace(".", "");

    expect(ads.buildAdUrl(id)).toContain(id);
    expect(ads.buildAdUrl(id)).toContain(config.self.apiUrl);
  });
});
