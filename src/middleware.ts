import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/validator(.*)',
  '/roadmap(.*)',
  '/investors(.*)',
  '/startups(.*)',
  '/founder-dashboard(.*)',
  '/investor-dashboard(.*)',
  '/admin-dashboard(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.[\\w]+$|_next/image|favicon.ico).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
