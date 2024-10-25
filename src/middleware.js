import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// We need to give the matcher a match for protected routes
//we need to write the match in regex
//You can add as many matches in [] as you want

const isProtectedRoute = createRouteMatcher([
  "/posts(.*)",
  "/createprofile(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
