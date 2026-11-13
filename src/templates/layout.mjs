import { config } from "../config.mjs";
import { data, esc, wordmark, button } from "./components.mjs";

const { site } = data;
export const JS_FLAG = 'document.documentElement.classList.add("js")';

function jsonLd(url) {
  const person = {
    "@type": "Person",
    "@id": url ? `${url}/#anya` : undefined,
    name: site.name,
    jobTitle: "Celebrity fashion stylist and television style expert",
    description: site.description,
    homeLocation: { "@type": "Place", name: site.location },
    url: url || undefined,
    sameAs: [site.instagram.url, site.officialSite],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University of Southern California" },
      { "@type": "CollegeOrUniversity", name: "Parsons School of Design" },
    ],
    worksFor: { "@type": "Organization", name: site.business },
  };
  const org = { "@type": "Organization", name: site.business, url: url || undefined, employee: url ? { "@id": `${url}/#anya` } : undefined };
  return JSON.stringify({ "@context": "https://schema.org", "@graph": [person, org] }, (k, v) => (v === undefined ? undefined : v));
}

function header(active) {
  const links = site.nav
    .map((n) => `<li><a href="${n.href}"${n.id === active ? ' aria-current="page"' : ""}>${esc(n.label)}</a></li>`)
    .join("");
  return `<header class="site-header" data-header>
  <div class="wrap site-header__bar">
    <a class="site-header__brand" href="/" aria-label="Anya Sarre — home">${wordmark("primary", "", { label: false })}</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle hidden><span class="nav-toggle__bars" aria-hidden="true"></span><span>Menu</span></button>
    <nav class="site-nav" id="site-nav" aria-label="Primary" data-nav>
      <ul>${links}</ul>
      ${button(site.cta.label, site.cta.href, "solid", ' data-nav-cta')}
    </nav>
  </div>
</header>`;
}

function previewBar() {
  if (!config.preview) return "";
  return `<aside class="preview-bar" aria-label="Proposal status"><p><strong>${config.proposal.label}</strong> · Independent proposal by ${config.proposal.by} for Anya Sarre · Private, unpublished, not endorsed · ${config.proposal.date}</p></aside>`;
}

function footer() {
  const nav = site.nav.map((n) => `<li><a href="${n.href}">${esc(n.label)}</a></li>`).join("");
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="site-footer__top">
      <a class="site-footer__brand" href="/" aria-label="Anya Sarre — home">${wordmark("stacked", "", { label: false })}</a>
      <p class="site-footer__line">${esc(site.tagline)}<br>${esc(site.location)}</p>
      <nav aria-label="Footer"><ul class="site-footer__nav">${nav}</ul></nav>
      <ul class="site-footer__social"><li><a href="${esc(site.instagram.url)}" rel="noopener noreferrer" target="_blank">Instagram ${esc(site.instagram.handle)}<span class="sr-only"> (opens in a new tab)</span></a></li></ul>
    </div>
    <div class="site-footer__legal">
      <p>${esc(site.business)} is Anya Sarre’s styling business.${config.preview ? "" : ""}</p>
      ${
        config.preview
          ? `<p>This is a concept website prepared by ${config.proposal.by} as an unsolicited proposal. It is not live, not approved by Anya Sarre, and not indexed by search engines. Statistics are third-party and provisional; each one shows its source and date.</p>
      <p>Imagery: AI-assisted concept images supplied with the proposal pack. They are reconstructions based on source photographs of Anya, with invented scenes, assistants and details. They are not untouched photographs, documentary stills or evidence of a real shoot, team or client. All imagery needs Anya’s approval before publication. The still-life photographs of products, an award statuette and a microphone are AI-generated illustrations, not real or sponsored products and not an award won by Anya.</p>`
          : `<p>Imagery is AI-assisted: reconstructions based on source photographs, with invented scenes and details.</p>`
      }
    </div>
  </div>
</footer>`;
}

export function layout({ page, ctx }) {
  const { path: pagePath, title, description, active, body, ogTitle, bodyClass = "" } = page;
  const base = config.siteUrl;
  const fullTitle = pagePath === "/" ? `${site.name} — Celebrity Stylist & TV Style Expert, Los Angeles` : `${title} — ${site.name}`;
  const canonical = base ? `${base}${pagePath}` : "";
  const ogImage = `${base}/og.jpg`;
  const robots = config.preview
    ? `<meta name="robots" content="noindex, nofollow, noarchive">\n  <meta name="googlebot" content="noindex, nofollow">`
    : `<meta name="robots" content="index, follow, max-image-preview:large">`;
  return `<!doctype html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description)}">
  ${robots}
  ${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : ""}
  <meta name="theme-color" content="#FFF9F6">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(site.name)}">
  <meta property="og:title" content="${esc(ogTitle || fullTitle)}">
  <meta property="og:description" content="${esc(description)}">
  ${canonical ? `<meta property="og:url" content="${esc(canonical)}">` : ""}
  <meta property="og:image" content="${esc(ogImage)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="The name Anya Sarre in plum lettering beside a black-and-white concept portrait of Anya with a makeup artist and hair stylist.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(ogTitle || fullTitle)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(ogImage)}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="preload" href="/fonts/BricolageGrotesque-Variable.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/DMSans-Variable.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/styles.css?v=${ctx.cssHash}">
  <script>${JS_FLAG}</script>
  ${pagePath === "/" || pagePath === "/meet-anya/" ? `<script type="application/ld+json">${jsonLd(base)}</script>` : ""}
</head>
<body class="${bodyClass}" data-page="${esc(active)}">
  <a class="skip-link" href="#main">Skip to content</a>
  ${previewBar()}
  ${header(active)}
  <main id="main" tabindex="-1">
${body}
  </main>
  ${footer()}
  <script src="/assets/main.js?v=${ctx.jsHash}" defer></script>
</body>
</html>
`;
}
