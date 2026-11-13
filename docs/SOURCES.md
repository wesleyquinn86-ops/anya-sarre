# Source notes

Research date: **13 November 2026**. Evidence levels: **Archive scan read** = I opened the page image from Anya's old official-site archive. **Archive listed** = the file exists in the archive (name, source page, dimensions) but its contents were not read. **Search-read** = located and summarized through a web search result only. **Read** = a live page read directly.

## What was and wasn't reachable

* **The live anyasarre.com could not be read** from the build environment (HTTP 406 from the site's Mod_Security rules for non-browser clients; the page reader failed at DNS). I did not work around the bot check.
* **The old official site's archive was supplied instead** (Drive folder, "renamed and organised" by Built By Wes): 474 images with `image-index.csv` (original URL, source page, how each name was decided) and 160 videos with `video-catalog.csv`. It is the old site, mostly 2008–2017. It replaces most of what the live pages would have confirmed about *history*, but **not** what is current, nor awards or the present bio. Everything below says which it is.
* Only a sample of the archive's page scans was read: Variety, The Hollywood Reporter, Los Angeles Confidential, Us Weekly (Feb 2, 2009), Life & Style (Jun 15, 2009), OK! (Jan 10, 2011), the Inside Weddings 10-page feature and the 944 Magazine profile. The rest were not opened.

## Anya's updated bio (supplied 13 Nov 2026, used as written)

The Meet Anya page and the home short bio now use the bio the site owner supplied. Each claim, and what the evidence in hand says:

| Claim in the bio | Corroboration found | Status |
| --- | --- | --- |
| Bay Area; USC; Parsons | 944 Magazine Q&A (USC B.A., communications; Parsons fashion program); Beverly Hills Courier | Corroborated |
| Heads Styled By Anya Inc. | Courier 2024 (the business exists); “heads” not stated elsewhere | Business corroborated |
| Dresses stars for the Oscars, Golden Globes, Emmys | Courier 2024; Variety Oct 24, 2008 profile | Corroborated |
| Red-carpet trend segments on **KTLA, Entertainment Tonight and Extra** | KTLA: strong (clips, Courier). ET: strong but archive-dated c. 2008–2011. **Extra: none** in the archive (only a 2016 third-party mention) | KTLA, ET corroborated; Extra bio-only. “Today” (present tense) for ET and Extra is the bio's claim |
| **Chief Accessories Stylist, ShoeDazzle**; **Fashion Director, YouCeleb** | Archive shows the work (“Must Haves by Anya Sarre Jewelry for ShoeDazzle”; ET segment on ShoeDazzle; YouCeleb “Makeover Monday” columns, 2011) but **not the titles** | Work corroborated; titles bio-only |
| “Best Fashion Stylist for TV”, POSHGLAM Awards | Archive has a PoshGlam web feature on her; the award itself is not shown | Bio-only |
| Has written for Us Weekly and OK! | Archive has Us Weekly and OK! pages in which she is quoted and credited (expert advice, promo); **authorship** is not shown | Appearances corroborated; “written for” bio-only |
| Hosted events for Diane von Furstenberg | Archive has a DVF event invitation image | Weakly corroborated |
| TEDx speaker | LOCAL Life Q+A (TEDxHiltonHead Women) | Corroborated |
| Teaches styling at FIDM; guest lectures at USC | None | Bio-only |

Structured data (JSON-LD) was **not** extended with the unverified claims (award, titles, teaching); it still carries only name, role, location, schools, Instagram and the business.

## Biography and credentials

| Claim shown | Source | Level |
| --- | --- | --- |
| LA-based celebrity fashion stylist, TV expert, brand influencer; Styled By Anya Inc. | Brief; [Beverly Hills Courier, Nov 12 2024](https://beverlyhillscourier.com/2024/11/12/the-stylists-shaping-beverly-hills) | Search-read |
| Credited as **head fashion stylist for Entertainment Tonight, The Insider and ET on MTV**; “celebrity wardrobe expert, makeover maven and television fashion consultant” | **944 Magazine “Woman of Power”** Q&A (undated, probably 2007–2009) | Archive scan read |
| Named as **“E.T. fashion honcho”** | **The Hollywood Reporter, Jul 19, 2010**, “Philanthropy in Hollywood” special report (a mention) | Archive scan read |
| Presents **“Look For Less”** segments on The Insider | Us Weekly Feb 2, 2009 (tune-in promo); Life & Style Jun 15, 2009 (“The Insider stylist Anya Sarre”) | Archive scan read |
| Award-weekend red-carpet styling; clients at the Oscars, Golden Globes, Emmys, Grammys | **Variety, Oct 24, 2008** profile (by Caroline Ryder); Courier 2024 | Archive scan read; search-read |
| USC (B.A., communications); Parsons School of Design fashion program (“graduate degree” per Courier) | 944 Magazine Q&A; Courier | Archive scan read; search-read |
| Bay Area native | Courier 2024 | Search-read |
| Frequent KTLA 5 style expert; hosts/curates “Countdown to Gold…” | Courier 2024; [LOCAL Life Q+A](https://www.locallifesc.com/qa-celebrity-connection-anya-sarre/); KTLA clips in the archive (README dates the batch 2014–2017) | Search-read; archive listed |
| TEDxHiltonHead Women speaker | LOCAL Life Q+A (single source, undated) | Search-read |
| Instagram @anyasarre | Fohr profile | Read |

**Not shown:** “L.A.'s Best Personal Stylist” (CBS Los Angeles) and “Best Television Fashion Stylist” (not confirmed by any evidence seen); any *current* corporate role. Her name appears as “Anya Berger Sarre” in 944 Magazine and Inside Weddings; the site uses “Anya Sarre”. A 10-page Inside Weddings feature is about her own wedding; it is listed only as “features”, with no personal detail.

## Television

From the archive's *Watch Anya* pages (stills, clips and the **row of show logos on that page**). `src/data/tv.json` holds the structured version; the marquee and Media-page ledger show the **official logo** for each show (alt text is the show's name).

| Show | Evidence | Shown as |
| --- | --- | --- |
| KTLA 5 | 31 segment stills, 13 newer `.mp4` clips, Courier 2024 | **Recurring** |
| Entertainment Tonight | ~30 segment stills/clips (incl. Feb 28, 2011 Oscar trends), 944 Magazine, THR 2010 | Historical, c. 2008–2011 |
| The Insider | Look For Less stills, Us Weekly/Life & Style/LA Confidential scans | Historical, c. 2009–2010 |
| The Rachael Ray Show | 2 posters/clips (`rr-3081`, b-roll), undated | Historical, undated |
| Home & Family | Logo on the Watch Anya page only | Historical, undated, role unknown |
| VH1 | Logo on the Watch Anya page only | Historical, undated, role unknown |
| CBS 2 | Logo on the Watch Anya page only | Historical, undated, role unknown |
| KCAL 9 | “Oscar Fashion Predictions” page and clip, undated | Historical, undated |
| Hollywood Today Live | Syndicated national clip; file name dated Apr 22, 2016 | Historical, April 22, 2016 |
| The Hollywood Reporter (China) | “Anya on The Hollywood Reporter in China” page and a 31 s clip | Historical, undated |

**Not shown as television:** *Extra* and *STYLE Network* (only a 2016 third-party profile; absent from the official page); *ShoeDazzle* (a brand tour and jewelry collaboration, logo on the page) and *BabyLeague* (a brand). ShoeDazzle is a candidate **brand-partnership example** (web press “Must Haves by Anya Sarre Jewelry for ShoeDazzle”; an ET segment on it). **Only KTLA 5 is evidenced as recent.** The Home & Family, VH1 and CBS 2 entries rest on the logo row alone, so their roles and dates are unknown. Network labels for Home & Family (Hallmark Channel) and CBS 2 (Los Angeles) are general knowledge, not read from the archive.

## Press (print and web)

Entries link to the scans on Anya's official Press page (publisher URLs are not available for them).

| Outlet | Item | Date | Type shown |
| --- | --- | --- | --- |
| Variety | “To get that ‘pop,’ she shops ’til she drops” | Oct 24, 2008 | **Profile** |
| The Hollywood Reporter | “Philanthropy in Hollywood” special report | Jul 19, 2010 | **Mention** |
| Los Angeles Confidential | “The Looks of Love” (by Cheryl Woodcock) | Undated | **Profile** (interview-style) |
| Us Weekly | “Win a Golden Globe look” | Feb 2, 2009 | **Promotion** (tune-in for her segment) |
| OK! | “Comfy can be cool!” | Jan 10, 2011 | **Expert advice** (also ~25 other OK! pages, 2008–2011, not read) |
| Life & Style | “Figure-flattering accessories” | Jun 15, 2009 | **Expert advice** (also 5 other pages, 2008–2010, not read) |
| Inside Weddings | 10-page feature; “Celebrity Style” pages | 2008–2014 issues | **Features** (role beyond the 10-page feature not read) |
| 944 Magazine | “Woman of Power” | Undated | **Profile** (Q&A) |
| Beverly Hills Courier | “The Stylists Shaping Beverly Hills” | Nov 12, 2024 | Feature (search-read) |
| LOCAL Life; Ella+Mila; KTLA 5 page | Q+A; brand blog; segment page | Undated; 2016; undated | Interview; Brand feature; TV segment (search-read) |

**The Wall Street Journal:** searched, **no coverage found** in the archive or search. Also in the archive and not read: Genlux, Gladys, Capitol File, Infatuation (Summer 2015, listed as contributors and red-carpet pages), TV Guide (Oct 2009), The Costume Designer, Pilates Style, mystyle, SheKnows, StyleList, Examiner, marriage.com and others (web press).

**Mastheads:** authentic publisher masthead SVG/PNG files were not sourced; outlet names are typeset stand-ins.

## Press archive (gallery on the Media page)

All 105 readable scans from the archive's **Press** (62) and **Web Press** (44) folders are shown on `/media/#press-archive`, grouped by publication, with a keyboard-operable lightbox. **16 print publications** (Variety, The Hollywood Reporter, Us Weekly, OK!, Life & Style, TV Guide, Los Angeles Confidential, Inside Weddings, Genlux, Capitol File, Infatuation, 944 Magazine, Gladys, The Costume Designer, Pilates Style, Diamonds & Stars) and **20 online outlets**, plus a "More web features" group whose site names are not legible in the scans (kept in the gallery, left out of "As featured in"). Metadata is in `src/data/press-archive.json`.

* **Names and dates** come from the archive's own file names (`image-index.csv`), which were read from the printed pages. **Headlines** are shown only for the eight I read off the scans; the rest show outlet and date only, because headlines derived from file names lost punctuation. Dates are the issue dates where legible, else a year or season.
* **What the scans prove:** that Anya (or her work) appears on that page, not the kind of role. Only the scans I read are typed on the Media page's "In the press" list (profile, mention, expert advice, promotion). One scan could not be decoded and was left out (Fairweather Faces).
* **"As featured in" (Home)** lists publication titles only, per the site owner's request. Each print or online title links to its archive section; Beverly Hills Courier and LOCAL Life link to their articles. Order is by prominence, not date. Not included: The Wall Street Journal (not found).
* **Rights:** the scans are page images of copyrighted magazines. They live in `assets/private/press/` and `public/press/` (gitignored), ship only in the private zip, and a production build omits them unless `PRESS_CLEARED=1`. The 105-page archive is **not** in the public GitHub repo.

## Videos

Four KTLA 5 clips from the archive's newest batch (`Live From The Emmys`, `Fashion Strikes: Live from the Oscars`, `Oscars Red Carpet Jewelry Trends`, `Shine Like a Star: Live from the Oscars`), compressed to H.264 (37 s–2:09, 17 MB total). The archive README says these are the best-quality clips and **dates them 2014–2017**; air dates are not recorded per clip. **I could not confirm from sampled frames that Anya is on screen in every clip** (the Emmys clip looks like a sponsored-giveaway segment). **They are broadcaster footage:** the archive README itself warns that Anya's permission does not clear KTLA/CBS rights. They are therefore **not in git** (the GitHub repo is public), have no captions or transcripts, and production hides them unless each is marked `"rights": "cleared"`. The other ~110 clips (old `.mov`s at 424×240, ET/Look For Less/Rachael Ray) are too small for the site.

## Services (old site's structure)

*Weddings, Showers & Events* (baby showers, bridal showers, weddings, events), *Styled By Anya* (events icon), *Brand Ambassador*, *Sawyer's World* pages. Event styling is shown as a **draft** service (the pages are about 2010–2013). Wardrobe/closet edits rest on web-press headlines (“Same Closet, New You!”, “Survive Closet Clean-Out Craziness”, c. 2011); personal shopping on the Variety feature only. Both stay drafts until Anya confirms.

## Audience and viewership

Unchanged from the first pass; all figures live in `src/data/metrics.json` and are never combined.

| Metric | Value | Source | Status |
| --- | --- | --- | --- |
| Instagram followers | 280K (page: 280.0K) | [Fohr](https://app.fohr.co/creators/anyasarre), read 13 Nov 2026 | Provisional, third-party |
| Selected Reel views | 16,629 (Nov 10) · 56,031 (Nov 2) · 16,640 (Oct 15) · 17,510 (Oct 10) | Fohr | Provisional; examples only |
| Entertainment Tonight programme-wide viewers | 2.85M | [Paramount release](https://www.paramountpressexpress.com/cbs-media-ventures/shows/entertainment-tonight/releases/?view=111239-entertainment-tonights-oscar-coverage-grows-year-to-year-across-the-country), Mar 14 2025 | As reported by publisher; programme context only |

**Discrepancy with the brief:** the brief recorded Reels at roughly 16,600–42,100; the live Fohr page lists 16,629–56,031 for Oct–Nov Reels. The site follows the live page. **Recorded, not displayed:** Fohr "6.0% viewership / 12.9% engagement" (undefined), Fohr demographics (attribution unclear), reach (listed as 0), segment ratings, unique reach, campaign results.

## Anya's partner deck (supplied 13 Nov 2026) and LA Unscripted

A five-page 2026 partner deck from Anya (a seasonal sponsored-segment package on KTLA 5's *LA Unscripted*, branded **Style Smart**). The site uses its **evergreen** parts only: no seasonal framing, dates, deadlines or prices.

| Used on the site | From the deck | Status |
| --- | --- | --- |
| "Style Smart" segments on KTLA 5's LA Unscripted; KTLA 5 primetime broadcast, KTLA.com livestream, worldwide viewing on the KTLA 5 app, HD segment copy, social amplification, premium production | Pages 1–2, 4 | Anya's own deck |
| **115+ markets, 265 stations, 132 U.S. DMAs, 80% of U.S. TV households** (Nexstar Media Group footprint; national distribution is an optional add-on) | Page 5 | Anya's deck, citing Nexstar; **not independently verified**; shown as the network footprint, never as an audience for one segment |
| "We partner with you to create your segment": brand chooses segment type, representative and key points | Page 4 | Anya's deck |
| **Contact: an email address** | Footer of pages 2–5 | **Verified from Anya's own deck.** Stored in the gitignored `src/data/contact.private.json`, not in git (public repo). **Her phone number is private: it is not stored or shown anywhere** |

**LA Unscripted itself:** KTLA's weeknight lifestyle show, launched September 2020, covering local spots, restaurants and style, streamed on KTLA.com and the KTLA 5 app ([Nexstar, "KTLA to launch LA Unscripted"](https://nexstar.tv/ktla-to-launch-la-unscripted-fall-2020); search-read). Current schedule and hosts were not confirmed.

**Deliberately not used:** the deck's holiday framing and shopping statistics ($1+ trillion U.S. holiday sales, $1,627 average LA spend, 88% deal-seekers, 82% Black Friday–Cyber Monday; uncited third-party figures), the dates and early-booking deadlines, and the **$5K / $10K / $15K package prices** (no prices are published on the site). The Anya "Styled By" seal and the Nexstar mark appear in the deck; the Nexstar mark is used as a partner logo, the seal is not used.

**"One of the most popular channels in LA": not stated.** I found no current ratings figure. KTLA's own older claims (Tribune Media releases, about 2017, citing Nielsen) say its morning and 10 p.m. newscasts were Los Angeles' most-watched among adults; they are too old and too narrow to quote as current. To make a ranking claim, get a current Nielsen figure from KTLA or Nexstar and add it to `src/data/metrics.json`.

## Contact

An email address from Anya's partner deck, stored in the gitignored `src/data/contact.private.json` (ignored by public-safe builds); `CONTACT_EMAIL` overrides. **No phone number is used.** The Talk to Anya page has a form that is built but **not live**: with no `FORM_ENDPOINT` it validates, then states that nothing was sent and offers a pre-filled email. A production build without an endpoint shows an email panel instead of the form.
