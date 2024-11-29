import * as Sentry from "@sentry/nuxt";

const config = useRuntimeConfig();

Sentry.init({
  dsn: config.public.sentry_dsn,
  enabled: config.env === "production",
  environment: config.env as string,
  
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 0.5,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,
  
  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,
  
  // If you don't want to use Session Replay, just remove the line below:
  integrations: [
    Sentry.replayIntegration()
  ],
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: true,
});
