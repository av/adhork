import { GraphQLClient } from "graphql-request";
import config from "./config";

export default new GraphQLClient(`${config.hasura.apiUrl}/v1/graphql`, {
  headers: {
    "x-hasura-admin-secret": config.hasura.apiKey,
  },
});
