import * as Sentry from "@sentry/nuxt";
 
Sentry.init({
  spotlight: true,
  dsn: process.env.SENTRY_DSN,
  environment: process.env.ENV,
  enabled: process.env.ENV === "production",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 0.5,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: true,
});
