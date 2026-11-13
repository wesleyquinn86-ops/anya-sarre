# Outstanding confirmations before launch

`npm run check` on a production build fails until public “to confirm” wording is gone, so this list is enforced, not advisory.

## Permission and approval
1. Anya's agreement to a website at all, and the production domain (`SITE_URL`).
2. Approval of the **AI-assisted imagery** (hero 01 and the seven other options used; see `docs/ASSETS.md`): Anya's approval of her likeness, jewellery details and the invented scenes/assistants, permission to use the source photographs (with any photographer credit), and the footer disclosure. Remove any option she dislikes; prefer licensed original photography (option 05's reference is only 279×352).
3. Approval of the **Sculpted Masthead wordmark**, palette and Bricolage Grotesque/DM Sans pairing, which are a proposed identity, **not an approved rebrand**.
4. Whether Styled By Anya Inc. branding and the name “Styled By Anya” may be used as shown.

## Facts to verify with Anya
4b. **Timeline and status labels were removed at the site owner's request** (the marquee line and tag, the Media list's era column, the credentials Status column). The site no longer says which TV credits are recent and which are from about 2008–2016; the evidence is in `src/data/tv.json` and `docs/SOURCES.md`. Before launch, confirm with Anya which shows are current so nothing historical reads as current. The brief's original requirement was wording that does not imply every appearance is current.
4a. **The supplied bio** is used as written. Confirm against Anya the claims the archive does not support: the **ShoeDazzle (Chief Accessories Stylist) and YouCeleb (Fashion Director) titles**, the **“Best Fashion Stylist for TV” POSHGLAM award** (and its year), **FIDM teaching and USC guest lectures**, that she has **written for Us Weekly and OK!**, the DVF events, and that she is **currently** on **Entertainment Tonight and Extra**. **Extra** has no logo yet, so it is in the Media list as text and not in the logo marquee: supply an official mark, or approve fetching one.
5. **What is current.** Her credits are evidenced mostly to 2008–2017 (old official-site archive). Only KTLA 5 is evidenced as recent. Confirm current shows, roles and clients, and whether the historical credits should stay in the marquee.
6. The **current official bio, awards and qualifications**. The live site could not be read; “L.A.'s Best Personal Stylist” and similar awards are deliberately omitted.
7. Date/title of the **TEDxHiltonHead Women** talk and the **Countdown to Gold** broadcast.
8. Confirmed **services**: personal styling process, weddings/showers/events (old pages only), wardrobe/closet edits, personal shopping. Preview shows unconfirmed ones as labelled drafts; production hides them.
9. Whether Anya wants named clients, testimonials or campaign examples shown (none are included).
10. Approval of the **approach copy**, positioning lines and the five partnership formats (proposal wording, not a rate card).
11. Whether the Inside Weddings “features” entry should be listed at all (one is about her own wedding).

## Contact and forms
11. A **verified email** per route (media, brands, styling) and/or a **form endpoint** (`FORM_ENDPOINT`) that accepts JSON from the production origin, handles CORS, and has spam protection. Nothing has been submitted to any real endpoint.

## Press, logos and video
11b. **LA Unscripted claims.** The 115+ / 265 / 132 / 80% figures come from Anya's deck (Nexstar footprint, optional national add-on); confirm they are current and that she is happy to publish them. Get a current KTLA/Nexstar ratings figure if a "most-watched" claim is wanted. Confirm the hosts, schedule and "Style Smart" branding, and whether the logos of KTLA 5, LA Unscripted, Style Smart and Nexstar may be shown (they are traced from the deck).
11c. **Contact details.** The email address and text number from Anya's deck live in the gitignored `src/data/contact.private.json` (the repo is public). Confirm she wants both published on the site, then ship them via that file or `CONTACT_EMAIL`. A production build needs one of those or `FORM_ENDPOINT`. No form endpoint is configured.
11a. **Photo rights for the two real photographs** (KTLA 5 Morning News frame; TEDx stage still): who owns them, whether KTLA/TEDx permit this use, and any credit line. They are gitignored and ship only in the private zip; set `STILLS_CLEARED=1` for a production build once cleared.
12. Official **masthead SVG/PNG** assets from publisher-controlled sources (names are typeset until then), and publisher URLs where the coverage exists online. The archive scans are not publisher links.
13. Read the remaining archive pages (OK! ~25 pages, Life & Style, Inside Weddings, Genlux, Gladys, Capitol File, Infatuation, TV Guide, web press) before adding more entries or changing types.
14. **Video rights and suitability.** The four KTLA clips are broadcaster footage; the archive README says Anya's permission does not clear KTLA/CBS rights. Get written clearance, confirm Anya appears in each clip, choose posters that show her, supply **captions and transcripts**, then set `"rights": "cleared"` per clip. Until then production hides them. Also decide whether to host video on Cloudflare (25 MB per-file limit) or a video platform.
15. **Show logos** are used on the site owner's instruction, traced to **single-colour white marks** from the small rasters on Anya's old Watch Anya page (ET shows the older “ET HD” mark; Rachael Ray and VH1 are the roughest traces). Before launch, swap in current official artwork where the networks allow it, and confirm Anya wants Home & Family, VH1 and CBS 2 listed, since the archive gives only their logos (no role or date).

## Audience figures
15. Re-check Fohr's 280K and the four Reel views on launch day (they move). Prefer Anya's own **Instagram Insights / media kit** for followers, reach and demographics.
16. Decide whether to keep the Entertainment Tonight programme-context figure, and confirm the date and nature of Anya's ET appearances (a 2016 source is the only evidence).

## Technical
17. **Make the GitHub repository private.** It is currently **public**, and it contains the AI-assisted imagery and the site source. Videos are kept out of git on purpose. Put the **preview** behind Cloudflare Access before sharing; switch to `BUILD_MODE=production` with all variables for launch; submit the sitemap; add analytics/consent only if wanted (none is included).
18. Review privacy/terms wording if the form collects personal data.
