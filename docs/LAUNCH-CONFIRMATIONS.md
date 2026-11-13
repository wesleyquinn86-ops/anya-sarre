# Outstanding confirmations before launch

`npm run check` on a production build fails until public “to confirm” wording is gone, so this list is enforced, not advisory.

## Permission and approval
1. Anya's agreement to a website at all, and the production domain (`SITE_URL`).
2. Approval of the **AI-assisted imagery** (hero 01 and the seven other options used; see `docs/ASSETS.md`): Anya's approval of her likeness, jewellery details and the invented scenes/assistants, permission to use the source photographs (with any photographer credit), and the footer disclosure. Remove any option she dislikes; prefer licensed original photography (option 05's reference is only 279×352).
3. Approval of the **Sculpted Masthead wordmark**, palette and Bricolage Grotesque/DM Sans pairing, which are a proposed identity, **not an approved rebrand**.
4. Whether Styled By Anya Inc. branding and the name “Styled By Anya” may be used as shown.

## Facts to verify with Anya
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
12. Official **masthead SVG/PNG** assets from publisher-controlled sources (names are typeset until then), and publisher URLs where the coverage exists online. The archive scans are not publisher links.
13. Read the remaining archive pages (OK! ~25 pages, Life & Style, Inside Weddings, Genlux, Gladys, Capitol File, Infatuation, TV Guide, web press) before adding more entries or changing types.
14. **Video rights and suitability.** The four KTLA clips are broadcaster footage; the archive README says Anya's permission does not clear KTLA/CBS rights. Get written clearance, confirm Anya appears in each clip, choose posters that show her, supply **captions and transcripts**, then set `"rights": "cleared"` per clip. Until then production hides them. Also decide whether to host video on Cloudflare (25 MB per-file limit) or a video platform.
15. **Show logos** are used on the site owner's instruction, from the small rasters on Anya's old Watch Anya page (ET shows the older “ET HD” mark). Before launch, swap in current official artwork where the networks allow it, and confirm Anya wants Home & Family, VH1 and CBS 2 listed, since the archive gives only their logos (no role or date).

## Audience figures
15. Re-check Fohr's 280K and the four Reel views on launch day (they move). Prefer Anya's own **Instagram Insights / media kit** for followers, reach and demographics.
16. Decide whether to keep the Entertainment Tonight programme-context figure, and confirm the date and nature of Anya's ET appearances (a 2016 source is the only evidence).

## Technical
17. **Make the GitHub repository private.** It is currently **public**, and it contains the AI-assisted imagery and the site source. Videos are kept out of git on purpose. Put the **preview** behind Cloudflare Access before sharing; switch to `BUILD_MODE=production` with all variables for launch; submit the sitemap; add analytics/consent only if wanted (none is included).
18. Review privacy/terms wording if the form collects personal data.
