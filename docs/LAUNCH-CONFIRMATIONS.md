# Outstanding confirmations before launch

`npm run check` on a production build fails until public “to confirm” wording is gone, so this list is enforced, not advisory.

## Permission and approval
1. Anya's agreement to a website at all, and the production domain (`SITE_URL`).
2. Approval of the **AI-extended hero** and the footer disclosure; confirmation that the original portrait is licensed for this use, with any photographer credit.
3. Approval of the wordmark treatment (the pack's studies are not an approved logo) and of the pink/pastel palette and typography.
4. Whether Styled By Anya Inc. branding and the name “Styled By Anya” may be used as shown.

## Facts to verify against anyasarre.com or Anya
5. The **official biography, awards, qualifications and previous corporate roles** (not read; “L.A.'s Best Personal Stylist” and similar awards are deliberately omitted).
6. The **complete television list**: roles, networks and dates. Current items are KTLA 5 plus a 2016 third-party list. Decide which belong in the marquee and whether any are current.
7. Date/title of the **TEDxHiltonHead Women** talk and the **Countdown to Gold** broadcast.
8. Confirmed **services**: personal styling format and process, wardrobe/closet edits, personal shopping, any others. (Preview shows these as labelled drafts; production hides unconfirmed ones.)
9. Whether Anya wants named clients, testimonials or campaign examples shown (none are included).
10. Approval of the **approach copy**, positioning lines and the five partnership formats (proposal wording, not a rate card).

## Contact and forms
11. A **verified email** per route (media, brands, styling) and/or a **form endpoint** (`FORM_ENDPOINT`) that accepts JSON from the production origin, handles CORS, and has spam protection. Nothing has been submitted to any real endpoint.

## Press, logos and video
12. Official **masthead SVG/PNG** assets from publisher-controlled sources, with permission as needed; outlet names are typeset until then. Confirm Anya's involvement for Variety, The Hollywood Reporter, WSJ, LA Confidential, Us Weekly, OK!, Life & Style and Inside Weddings before adding any of them. None were found.
13. Open and confirm the located coverage pages (Courier, LOCAL Life, Ella+Mila, KTLA); their text was seen only via search summaries. Add dates (LOCAL Life, KTLA).
14. A suitable **verified video** (YouTube/Vimeo or hosted) if a viewing action is wanted. Show marks/posters only with accurate titles and verified video destinations.

## Audience figures
15. Re-check Fohr's 280K and the four Reel views on launch day (they move). Prefer Anya's own **Instagram Insights / media kit** for followers, reach and demographics.
16. Decide whether to keep the Entertainment Tonight programme-context figure, and confirm the date and nature of Anya's ET appearances (a 2016 source is the only evidence).

## Technical
17. Put the **preview** behind Cloudflare Access before sharing; switch to `BUILD_MODE=production` with all variables for launch; submit the sitemap; add analytics/consent only if wanted (none is included).
18. Review privacy/terms wording if the form collects personal data.
