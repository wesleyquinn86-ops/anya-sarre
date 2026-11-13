// Build-time configuration. Everything launch-specific is an environment variable,
// so the same source produces the private preview and the production build.
//   BUILD_MODE        preview (default) | production
//   SITE_URL          production origin, e.g. https://www.example.com (no trailing slash)
//   FORM_ENDPOINT     URL that accepts enquiry POSTs (JSON). Without it, no form is rendered.
//   CONTACT_EMAIL     verified general enquiry address
//   CONTACT_EMAIL_MEDIA / _BRANDS / _STYLING   optional per-route addresses
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const env = process.env;
const privateContact = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "data/contact.private.json");
// Contact details live in a gitignored file (the repo is public) and are ignored by public-safe builds (SKIP_VIDEO=1).
const siteContact = env.SKIP_VIDEO !== "1" && existsSync(privateContact) ? JSON.parse(readFileSync(privateContact, "utf8")) : {};
const mode = env.BUILD_MODE === "production" ? "production" : "preview";
const clean = (v) => (v && v.trim() ? v.trim().replace(/\/+$/, "") : "");

export const config = {
  mode,
  preview: mode === "preview",
  siteUrl: clean(env.SITE_URL),
  formEndpoint: clean(env.FORM_ENDPOINT),
  // Default: the address from Anya's partner deck (src/data/contact.private.json, not in git). Environment variables override it per route.
  emails: {
    general: clean(env.CONTACT_EMAIL) || siteContact.email || "",
    media: clean(env.CONTACT_EMAIL_MEDIA) || clean(env.CONTACT_EMAIL) || siteContact.email || "",
    brands: clean(env.CONTACT_EMAIL_BRANDS) || clean(env.CONTACT_EMAIL) || siteContact.email || "",
    styling: clean(env.CONTACT_EMAIL_STYLING) || clean(env.CONTACT_EMAIL) || siteContact.email || "",
  },
  proposal: {
    by: "Built By Wes",
    label: "Concept preview",
    date: "November 13, 2026",
  },
};
