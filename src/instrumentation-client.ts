import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://387b22648e0fe23a3e27349dbf4301c9@o4510413882982400.ingest.de.sentry.io/4510413902643280",
  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
