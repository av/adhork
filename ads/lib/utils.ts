import { NextApiRequest } from "next";

export function isAcceptingHTML(req: NextApiRequest): boolean {
  const accept = req?.headers?.accept ?? "";
  return accept.includes("text/html");
}

export function hasUserAgent(req: NextApiRequest) {
  const ua = req?.headers?.["user-agent"];
  return !!ua;
}