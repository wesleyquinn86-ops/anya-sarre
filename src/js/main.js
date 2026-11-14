/* Progressive enhancement only: the site reads and navigates without this file. */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    toggle.hidden = false;
    var wide = window.matchMedia("(min-width: 75em)");
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    setOpen(false);
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && !wide.matches) setOpen(false);
    });
    var onWide = function () { if (wide.matches) setOpen(false); };
    wide.addEventListener ? wide.addEventListener("change", onWide) : wide.addListener(onWide);
  }

  /* ---------- Tickers (auto-scrolling bands). Each one is independent; markup comes from ticker() in components.mjs ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var narrow = window.matchMedia("(max-width: 40em)");

  function initTicker(root) {
    var track = root.querySelector("[data-marquee-track]");
    var source = track && track.querySelector(".marquee__list");
    var btn = root.querySelector("[data-marquee-toggle]");
    var label = root.querySelector("[data-marquee-label]");
    if (!source) return;
    var name = root.getAttribute("data-marquee-name") || "items";
    var baseSpeed = Number(root.getAttribute("data-speed")) || 60; // pixels per second
    var state = { user: false, hover: false, focus: false, force: false };

    var effectivePaused = function () { return state.user || ((state.hover || state.focus) && !state.force); };
    var render = function () {
      root.setAttribute("data-state", effectivePaused() ? "paused" : "running");
      if (btn) {
        // The control reflects the visitor's own choice; hover/focus pausing is temporary and unlabelled.
        label.textContent = state.user ? "Resume" : "Pause";
        btn.setAttribute("aria-label", (state.user ? "Resume" : "Pause") + " scrolling " + name);
        btn.classList.toggle("is-paused", state.user);
      }
    };
    var links = function () { return [].slice.call(source.querySelectorAll("a")); };

    // Build: measure one list, then clone it enough times that the track is always wider than the screen. The loop
    // distance is exactly one list width, so the join is invisible at any viewport size.
    var build = function () {
      [].slice.call(track.querySelectorAll("[data-clone]")).forEach(function (n) { n.remove(); });
      var animate = !reduce.matches;
      root.classList.toggle("is-animated", animate);
      if (btn) btn.hidden = !animate;
      // While moving, links are not keyboard stops (a moving target can't be tabbed to). Mouse and touch still work,
      // and the page offers a static link to the same destination. Static and reduced-motion modes keep normal tab stops.
      links().forEach(function (a) { if (animate) a.setAttribute("tabindex", "-1"); else a.removeAttribute("tabindex"); });
      if (!animate) { track.style.removeProperty("--marquee-duration"); track.style.removeProperty("--marquee-shift"); render(); return; }
      var listW = source.getBoundingClientRect().width;
      if (!listW) return;
      var copies = Math.max(1, Math.ceil(root.clientWidth / listW));
      for (var i = 0; i < copies; i++) {
        var c = source.cloneNode(true);
        c.setAttribute("data-clone", "");
        c.classList.add("marquee__list--copy");
        c.setAttribute("aria-hidden", "true");        // read once: the copies are invisible to assistive tech
        c.removeAttribute("aria-label");
        [].slice.call(c.querySelectorAll("[role]")).forEach(function (n) { n.removeAttribute("role"); n.removeAttribute("aria-label"); });
        [].slice.call(c.querySelectorAll("a")).forEach(function (a) { a.setAttribute("tabindex", "-1"); }); // no duplicate keyboard stops
        track.appendChild(c);
      }
      var speed = baseSpeed * (narrow.matches ? 0.8 : 1);
      track.style.setProperty("--marquee-shift", listW + "px");
      track.style.setProperty("--marquee-duration", Math.max(12, listW / speed).toFixed(1) + "s");
      render();
    };

    root.addEventListener("pointerenter", function (e) { if (e.pointerType !== "touch") { state.hover = true; render(); } });
    root.addEventListener("pointerleave", function () { state.hover = false; state.force = false; render(); });
    root.addEventListener("focusin", function (e) { if (e.target.matches && e.target.matches(":focus-visible")) { state.focus = true; render(); } });
    root.addEventListener("focusout", function () { state.focus = false; state.force = false; render(); });
    if (btn) {
      btn.addEventListener("click", function () {
        if (state.user) { state.user = false; state.force = true; } // resume even while hovered/focused
        else { state.user = true; state.force = false; }
        render();
      });
    }
    // Save work while nobody can see it.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) root.removeAttribute("data-offscreen"); else root.setAttribute("data-offscreen", ""); });
      }, { rootMargin: "200px 0px" }).observe(root);
    }
    var again = function () { build(); };
    var timer;
    window.addEventListener("resize", function () { clearTimeout(timer); timer = setTimeout(again, 150); });
    (reduce.addEventListener ? reduce.addEventListener.bind(reduce, "change", again) : reduce.addListener.bind(reduce, again))();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(again); // type metrics change the list width
    window.addEventListener("load", again);
    build();
  }
  [].slice.call(document.querySelectorAll("[data-marquee]")).forEach(initTicker);

  /* ---------- Home hero: option switch (preview) + scroll parallax (option 2) ---------- */
  var hero = document.querySelector(".hero[data-hero]");
  if (hero) {
    var picks = [].slice.call(document.querySelectorAll("[data-hero-pick]"));
    var pill = document.querySelector("[data-hero-pill]"), dlg = document.querySelector("[data-hero-note]");
    var hint = document.querySelector("[data-hero-hint]"), status = document.querySelector("[data-hero-status]");
    var store = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage may be blocked */ } } };
    var hintTimer;
    var showHint = function () {
      if (!hint) return;
      hint.hidden = false; clearTimeout(hintTimer);
      hintTimer = setTimeout(function () { hint.hidden = true; }, 7000);
    };
    var setHero = function (n, announce) {
      hero.setAttribute("data-hero", n);
      picks.forEach(function (b) { if (pill && pill.contains(b)) b.setAttribute("aria-pressed", String(b.getAttribute("data-hero-pick") === n)); });
      store.set("anya-hero", n);
      if (announce && status) status.textContent = "Showing home page banner option " + n + ".";
      if (hint) { if (n === "2" && announce) showHint(); else hint.hidden = true; }
      layout(); paint();
    };
    if (pill) {
      pill.hidden = false;
      picks.forEach(function (b) { b.addEventListener("click", function () { setHero(b.getAttribute("data-hero-pick"), true); if (dlg && dlg.open && b.hasAttribute("data-note-close")) dlg.close(); }); });
      window.addEventListener("scroll", function () { if (hint && !hint.hidden && window.pageYOffset > 80) hint.hidden = true; }, { passive: true });
      if (dlg && typeof dlg.showModal === "function") {
        var openBtn = pill.querySelector("[data-note-open]");
        if (openBtn) openBtn.addEventListener("click", function () { dlg.showModal(); });
        dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
        dlg.addEventListener("close", function () { store.set("anya-note-seen", "1"); if (openBtn) openBtn.focus(); });
        // The note opens once, a moment after the page loads (so the banner is seen first); the Note button reopens it any time.
        var force = new URLSearchParams(window.location.search).get("note") === "1";
        if (force || !store.get("anya-note-seen")) setTimeout(function () { if (!dlg.open) dlg.showModal(); }, 1100);
      } else {
        var nb = pill.querySelector("[data-note-open]"); if (nb) nb.hidden = true;
      }
    }

    // Parallax: the three layers move at different paces as the page scrolls; a soft pointer drift sits on top.
    var stage = hero.querySelector("[data-parallax]");
    var L = stage ? { bg: stage.querySelector('[data-px="bg"]'), name: stage.querySelector('[data-px="name"]'), anya: stage.querySelector('[data-px="anya"]') } : null;
    var m = { h: 1, scroll: 0, x: 0, y: 0, tx: 0, ty: 0, raf: 0, on: false };
    // vertical travel as a fraction of stage height at full scroll (negative = rises faster than the page): distinct paces
    var PACE = { bg: 0.22, name: -0.35, anya: 0.08 }; // page speed multipliers: backdrop 0.78x, portrait 0.92x, name 1.35x
    var clamp = function (n, a, b) { return Math.max(a, Math.min(b, n)); };
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function layout() { if (stage) m.h = stage.getBoundingClientRect().height || 1; }
    function paint() {
      if (!m) return;
      m.raf = 0;
      if (!L || reduceMotion.matches || hero.getAttribute("data-hero") !== "2") return;
      var p = clamp((window.pageYOffset || document.documentElement.scrollTop) / m.h, 0, 1.25); // 0 at the top: the composition rests exactly as supplied
      m.x += (m.tx - m.x) * 0.085; m.y += (m.ty - m.y) * 0.085;
      L.bg.style.transform = "translate3d(" + (-m.x * 0.25).toFixed(2) + "px," + (p * PACE.bg * m.h - m.y * 0.25).toFixed(1) + "px,0) scale(1.06)";
      L.name.style.transform = "translate3d(" + (-m.x * 0.75).toFixed(2) + "px," + (p * PACE.name * m.h - m.y * 0.75).toFixed(1) + "px,0)";
      L.anya.style.transform = "translate3d(" + (m.x * 0.25).toFixed(2) + "px," + (p * PACE.anya * m.h + m.y * 0.25).toFixed(1) + "px,0) scale(1.04)";
      if (Math.abs(m.x - m.tx) + Math.abs(m.y - m.ty) > 0.02) m.raf = requestAnimationFrame(paint);
    }
    var kick = function () { if (!m.raf && m.on) m.raf = requestAnimationFrame(paint); };
    if (L) {
      layout();
      window.addEventListener("scroll", kick, { passive: true });
      window.addEventListener("resize", function () { layout(); kick(); });
      if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { m.on = e[0].isIntersecting; if (m.on) kick(); }).observe(stage); else m.on = true;
      var fine = window.matchMedia("(hover: hover) and (pointer: fine)");
      stage.addEventListener("pointermove", function (e) {
        if (!fine.matches || reduceMotion.matches) return;
        var r = stage.getBoundingClientRect();
        m.tx = clamp(((e.clientX - r.left) / r.width - 0.5) * 36, -18, 18); m.ty = clamp(((e.clientY - r.top) / r.height - 0.5) * 28, -14, 14); kick();
      }, { passive: true });
      stage.addEventListener("pointerleave", function () { m.tx = m.ty = 0; kick(); });
      var reset = function () { if (reduceMotion.matches) { L.bg.style.transform = L.name.style.transform = L.anya.style.transform = ""; } else { kick(); } };
      (reduceMotion.addEventListener ? reduceMotion.addEventListener.bind(reduceMotion, "change", reset) : reduceMotion.addListener.bind(reduceMotion, reset))();
      // fetch option 2's layers quietly once the page is idle, so switching is instant
      var warm = function () { [].slice.call(stage.querySelectorAll("img")).forEach(function (i) { i.loading = "eager"; }); };
      if ("requestIdleCallback" in window) window.addEventListener("load", function () { requestIdleCallback(warm); }); else window.addEventListener("load", function () { setTimeout(warm, 1200); });
    }
    // Apply a saved or requested choice last, once the parallax state exists (a reload on Option 2 must still move).
    if (pill) {
      var asked = new URLSearchParams(window.location.search).get("hero") || store.get("anya-hero");
      if (asked === "1" || asked === "2") setHero(asked, false);
    }
  }

  /* ---------- Click-to-load video: nothing loads or plays until the visitor asks ---------- */
  document.querySelectorAll("[data-video-src]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var v = document.createElement("video");
      v.className = "video__player";
      v.controls = true;
      v.playsInline = true;
      v.preload = "auto";
      v.poster = link.getAttribute("data-video-poster");
      v.setAttribute("aria-label", link.getAttribute("data-video-title"));
      v.src = link.getAttribute("data-video-src");
      v.addEventListener("play", function () {
        document.querySelectorAll("video.video__player").forEach(function (o) { if (o !== v) o.pause(); });
      });
      v.addEventListener("error", function () {
        var p = document.createElement("p");
        p.className = "video__error";
        p.setAttribute("role", "alert");
        p.textContent = "This video could not be loaded.";
        v.replaceWith(p);
      });
      link.replaceWith(v);
      v.focus();
      var played = v.play();
      if (played && played.catch) played.catch(function () { /* the visitor can press play on the controls */ });
    });
  });

  /* ---------- Press archive lightbox: links work without JS (they open the full-size image) ---------- */
  var scans = [].slice.call(document.querySelectorAll("a[data-lightbox]"));
  if (scans.length && typeof HTMLDialogElement === "function") {
    var dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.setAttribute("aria-label", "Press page viewer");
    dlg.innerHTML = '<div class="lightbox__inner"><div class="lightbox__stage"><img class="lightbox__img" alt=""></div><div class="lightbox__bar"><p class="lightbox__cap" aria-live="polite"></p><div class="lightbox__btns"><button type="button" class="lightbox__btn" data-prev aria-label="Previous page">←</button><button type="button" class="lightbox__btn" data-next aria-label="Next page">→</button><button type="button" class="lightbox__btn" data-close>Close</button></div></div></div>';
    document.body.appendChild(dlg);
    var limg = dlg.querySelector(".lightbox__img"), lcap = dlg.querySelector(".lightbox__cap");
    var bprev = dlg.querySelector("[data-prev]"), bnext = dlg.querySelector("[data-next]"), opener = null, group = [], idx = 0;
    var show = function (i) {
      idx = i;
      var a = group[i];
      limg.src = a.href;
      limg.alt = (a.querySelector("img") || {}).alt || "";
      lcap.textContent = a.getAttribute("data-caption") + " (" + (i + 1) + " of " + group.length + ")";
      bprev.disabled = i === 0;
      bnext.disabled = i === group.length - 1;
    };
    scans.forEach(function (a) {
      a.addEventListener("click", function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        opener = a;
        var g = a.getAttribute("data-group");
        group = scans.filter(function (x) { return x.getAttribute("data-group") === g; });
        dlg.showModal();
        show(group.indexOf(a));
        dlg.querySelector("[data-close]").focus();
      });
    });
    bprev.addEventListener("click", function () { if (idx > 0) show(idx - 1); });
    bnext.addEventListener("click", function () { if (idx < group.length - 1) show(idx + 1); });
    dlg.querySelector("[data-close]").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target.classList.contains("lightbox__inner") || e.target.classList.contains("lightbox__stage")) dlg.close(); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft" && idx > 0) { show(idx - 1); e.preventDefault(); }
      if (e.key === "ArrowRight" && idx < group.length - 1) { show(idx + 1); e.preventDefault(); }
    });
    dlg.addEventListener("close", function () { limg.removeAttribute("src"); if (opener) opener.focus(); });
  }

  /* ---------- Contact form: real states only ---------- */
  var form = document.getElementById("enquiry-form");
  if (form) {
    var endpoint = form.getAttribute("data-endpoint");
    var statusBox = form.querySelector("[data-form-status]");
    var submit = form.querySelector("[data-submit]");
    var fallback = form.getAttribute("data-fallback-email");
    var qs = new URLSearchParams(window.location.search).get("route");
    if (qs) {
      var radio = form.querySelector('input[name="route"][value="' + qs.replace(/[^a-z]/g, "") + '"]');
      if (radio) radio.checked = true;
    }
    var setErr = function (name, msg) {
      var el = form.querySelector('[data-err="' + name + '"]');
      var input = form.elements[name];
      if (!el || !input) return;
      el.textContent = msg || "";
      el.hidden = !msg;
      if (msg) { input.setAttribute("aria-invalid", "true"); input.setAttribute("aria-describedby", el.id = el.id || "err-" + name); }
      else { input.removeAttribute("aria-invalid"); input.removeAttribute("aria-describedby"); }
    };
    var say = function (kind, html) {
      statusBox.className = "form__live is-" + kind;
      statusBox.innerHTML = html;
      statusBox.tabIndex = -1;
    };
    var validate = function () {
      var first = null, bad = false;
      var v = function (name, test, msg) {
        var el = form.elements[name];
        var ok = test(String(el.value || "").trim());
        setErr(name, ok ? "" : msg);
        if (!ok) { bad = true; if (!first) first = el; }
      };
      v("name", function (s) { return s.length > 1; }, "Please enter your name.");
      v("email", function (s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s); }, "Please enter a valid email address.");
      v("message", function (s) { return s.length >= 20; }, "Please add a few details (at least 20 characters).");
      if (bad && first) first.focus();
      return !bad;
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.elements.company_website && form.elements.company_website.value) return; // honeypot: silently drop
      if (!validate()) { say("error", "Please fix the highlighted fields and try again."); return; }
      if (!endpoint) {
        // Preview: the form is built but not connected. Nothing is sent; offer a pre-filled email instead.
        var f = new FormData(form), sel = form.querySelector('input[name="route"]:checked');
        var body = "Name: " + (f.get("name") || "") + "\nEmail: " + (f.get("email") || "") + "\nCompany or show: " + (f.get("organisation") || "") + "\n\n" + (f.get("message") || "");
        var link = fallback ? " <a href=\"mailto:" + fallback + "?subject=" + encodeURIComponent(sel ? sel.getAttribute("data-subject") : "Enquiry") + "&body=" + encodeURIComponent(body) + "\">Open a pre-filled email to " + fallback + "</a>." : "";
        say("info", "<strong>This form isn’t live yet, so nothing has been sent.</strong> You can email Anya directly instead." + link);
        statusBox.focus();
        return;
      }
      var payload = {};
      new FormData(form).forEach(function (v, k) { if (k !== "company_website") payload[k] = v; });
      submit.disabled = true;
      submit.setAttribute("aria-busy", "true");
      submit.firstElementChild.textContent = "Sending…";
      say("info", "Sending your enquiry…");
      fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) })
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          form.reset();
          say("success", "<strong>Thank you.</strong> Your enquiry has been sent.");
          statusBox.focus();
        })
        .catch(function () {
          say("error", "<strong>Your enquiry was not sent.</strong> Please try again" + (fallback ? ", or email <a href=\"mailto:" + fallback + "\">" + fallback + "</a>" : "") + ".");
          statusBox.focus();
        })
        .then(function () {
          submit.disabled = false;
          submit.removeAttribute("aria-busy");
          submit.firstElementChild.textContent = "Send enquiry";
        });
    });
  }
})();
