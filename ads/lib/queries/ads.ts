import { gql } from "graphql-request";

export const adsQuery = gql`
  query FetchAds {
    ads {
      id
      title
      url
    }
  }
`;

export const adQuery = gql`
  query FetchAd($id: uuid!) {
    ads_by_pk(id: $id) {
      id
      title
      url
    }
  }
`;

export const recordLoadMutation = gql`
  mutation InsertAdLoad($id: uuid!) {
    insert_ad_loads_one(object: { ad: $id }) {
      created_at
    }
  }
`;

export const recordClickMutation = gql`
  mutation InsertAdClick($id: uuid!) {
    insert_ad_clicks_one(object: { ad: $id }) {
      created_at
    }
  }
`;

export const adStatsQuery = gql`
  query FetchAdStats($id: uuid!) {
    ad_stats_daily(args: { day: "today", ad_id: $id }) {
      ad
      loads
      clicks
    }
  }
`;
