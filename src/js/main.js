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

  /* ---------- Television marquee ---------- */
  var marquee = document.querySelector("[data-marquee]");
  if (marquee) {
    var track = marquee.querySelector("[data-marquee-track]");
    var btn = marquee.querySelector("[data-marquee-toggle]");
    var label = marquee.querySelector("[data-marquee-label]");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    var state = { user: false, hover: false, focus: false, force: false };

    var effectivePaused = function () {
      return state.user || ((state.hover || state.focus) && !state.force);
    };
    var render = function () {
      marquee.setAttribute("data-state", effectivePaused() ? "paused" : "running");
      if (btn) {
        // The control reflects the visitor's own choice; hover/focus pausing is temporary and unlabelled.
        label.textContent = state.user ? "Resume" : "Pause";
        btn.setAttribute("aria-label", state.user ? "Resume scrolling television credits" : "Pause scrolling television credits");
        btn.classList.toggle("is-paused", state.user);
      }
    };
    var setSpeed = function () {
      // ~70 px/second regardless of list length
      var first = track.querySelector(".marquee__list");
      if (!first) return;
      var seconds = Math.max(24, Math.round(first.getBoundingClientRect().width / 70));
      track.style.setProperty("--marquee-duration", seconds + "s");
    };
    var enable = function () {
      marquee.classList.toggle("is-animated", !reduce.matches);
      if (btn) btn.hidden = reduce.matches;
      setSpeed();
      render();
    };
    marquee.addEventListener("pointerenter", function (e) { if (e.pointerType !== "touch") { state.hover = true; render(); } });
    marquee.addEventListener("pointerleave", function () { state.hover = false; state.force = false; render(); });
    marquee.addEventListener("focusin", function (e) {
      if (e.target.matches && e.target.matches(":focus-visible")) { state.focus = true; render(); }
    });
    marquee.addEventListener("focusout", function () { state.focus = false; state.force = false; render(); });
    if (btn) {
      btn.addEventListener("click", function () {
        if (state.user) { state.user = false; state.force = true; } // resume even while hovered/focused
        else { state.user = true; state.force = false; }
        render();
      });
    }
    window.addEventListener("resize", setSpeed);
    reduce.addEventListener ? reduce.addEventListener("change", enable) : reduce.addListener(enable);
    enable();
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
