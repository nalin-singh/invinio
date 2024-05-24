import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
const isProtectedRoute = createRouteMatcher(["/(.*)"]);
const isUploadthingEndpoint = createRouteMatcher(["/api/uploadthing"]);

export default clerkMiddleware((auth, request) => {
  if (!isUploadthingEndpoint(request)) {
    if (isProtectedRoute(request)) auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
