// Build-time configuration. Everything launch-specific is an environment variable,
// so the same source produces the private preview and the production build.
//   BUILD_MODE        preview (default) | production
//   SITE_URL          production origin, e.g. https://www.example.com (no trailing slash)
//   FORM_ENDPOINT     URL that accepts enquiry POSTs (JSON). Without it, no form is rendered.
//   CONTACT_EMAIL     verified general enquiry address
//   CONTACT_EMAIL_MEDIA / _BRANDS / _STYLING   optional per-route addresses
const env = process.env;
const mode = env.BUILD_MODE === "production" ? "production" : "preview";
const clean = (v) => (v && v.trim() ? v.trim().replace(/\/+$/, "") : "");

export const config = {
  mode,
  preview: mode === "preview",
  siteUrl: clean(env.SITE_URL),
  formEndpoint: clean(env.FORM_ENDPOINT),
  emails: {
    general: clean(env.CONTACT_EMAIL),
    media: clean(env.CONTACT_EMAIL_MEDIA) || clean(env.CONTACT_EMAIL),
    brands: clean(env.CONTACT_EMAIL_BRANDS) || clean(env.CONTACT_EMAIL),
    styling: clean(env.CONTACT_EMAIL_STYLING) || clean(env.CONTACT_EMAIL),
  },
  proposal: {
    by: "Built By Wes",
    label: "Concept preview",
    date: "November 13, 2026",
  },
};
