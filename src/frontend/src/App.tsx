import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";
import { useActor } from "./hooks/useActor";
import { useCallerProfile } from "./hooks/useQueries";

const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ActiveOrder = lazy(() => import("./pages/ActiveOrder"));
const Earnings = lazy(() => import("./pages/Earnings"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Profile = lazy(() => import("./pages/Profile"));
const Insurance = lazy(() => import("./pages/Insurance"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const LanguageScreen = lazy(() => import("./pages/LanguageScreen"));
const HelpSupport = lazy(() => import("./pages/HelpSupport"));
const FeedbackScreen = lazy(() => import("./pages/FeedbackScreen"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-dvh bg-background">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function AuthGuardLayout() {
  const { isFetching } = useActor();
  const { data: profile, isLoading } = useCallerProfile();
  const isLocallyRegistered =
    localStorage.getItem("shopport_registered") === "true";

  if (isFetching || isLoading) return <PageLoader />;
  if (!profile && !isLocallyRegistered) {
    router.navigate({ to: "/auth" });
    return null;
  }
  return <Layout />;
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster position="top-center" theme="dark" />
    </>
  ),
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Auth />
    </Suspense>
  ),
});

const guardedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "guarded",
  component: AuthGuardLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
});

const dashboardRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Dashboard />
    </Suspense>
  ),
});

const orderRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "/order/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ActiveOrder />
    </Suspense>
  ),
});

const earningsRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "/earnings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Earnings />
    </Suspense>
  ),
});

const analyticsRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "/analytics",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Analytics />
    </Suspense>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "/profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Profile />
    </Suspense>
  ),
});

const insuranceRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "/insurance",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Insurance />
    </Suspense>
  ),
});

const editProfileRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "/profile/edit",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <EditProfile />
    </Suspense>
  ),
});

const languageRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "/profile/language",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LanguageScreen />
    </Suspense>
  ),
});

const helpRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "/profile/help",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HelpSupport />
    </Suspense>
  ),
});

const feedbackRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "/profile/feedback",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <FeedbackScreen />
    </Suspense>
  ),
});

const termsRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "/profile/terms",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TermsAndConditions />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  authRoute,
  guardedRoute.addChildren([
    indexRoute,
    dashboardRoute,
    orderRoute,
    earningsRoute,
    analyticsRoute,
    profileRoute,
    insuranceRoute,
    editProfileRoute,
    languageRoute,
    helpRoute,
    feedbackRoute,
    termsRoute,
  ]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
