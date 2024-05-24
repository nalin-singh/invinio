import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from ".";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
