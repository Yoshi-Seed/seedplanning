/* Seed Planning demo site (vanilla HTML/CSS/JS)
   - Scroll reveals + counters
   - Mobile nav
   - Ripple + subtle tilt
   - "Send URL to my PC" mailto with subject + body URL
*/

(() => {
  const EMAIL_TO = "eddyhonda@gmail.com"; // change if you want a different recipient
  const SUBJECT = "Check Seed Planning Website";


  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Splash intro (logo-only landing) — shows once per tab/session
  const SPLASH_KEY = "sp_intro_done_v1";
  const splash = $("#splash");
  const splashBtn = $("#splashButton");
  const hasSeenIntro = (() => {
    try { return sessionStorage.getItem(SPLASH_KEY) === "1"; } catch { return false; }
  })();

  if (splash && splashBtn && !hasSeenIntro) {
    document.body.dataset.splash = "1";
    splash.setAttribute("aria-hidden", "false");

    // Small parallax tilt for extra "alive" feeling
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      splashBtn.style.setProperty("--sx", (x * 6).toFixed(2) + "deg");
      splashBtn.style.setProperty("--sy", (-y * 6).toFixed(2) + "deg");
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    splashBtn.addEventListener("click", () => {
      if (document.body.classList.contains("splash--go")) return;
      document.body.classList.add("splash--go");

      try { sessionStorage.setItem(SPLASH_KEY, "1"); } catch {}

      // lock interaction during exit
      splashBtn.disabled = true;

      // Redirect after 2s (as requested)
      setTimeout(() => {
        window.removeEventListener("pointermove", onMove);
        window.location.href = "index.html";
      }, 2000);
    });

    // Stop here (the rest of the site stays hidden under the splash)
    return;
  } else if (splash) {
    splash.setAttribute("aria-hidden", "true");
    document.body.dataset.splash = "0";
  }


  // Year
  const yearEl = $("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header elevate on scroll
  const header = document.querySelector("[data-elevate]");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-elevated", window.scrollY > 6);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav
  const navToggle = $("[data-nav-toggle]");
  const navList = $("[data-nav-list]");
  if (navToggle && navList) {
    const closeNav = () => {
      navList.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // close on click
    navList.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) closeNav();
    });

    // close on escape / outside click
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
    document.addEventListener("click", (e) => {
      if (!navList.classList.contains("is-open")) return;
      const within = e.target.closest(".nav");
      if (!within) closeNav();
    });
  }

  // Toast
  const toast = $(".toast");
  const toastMsg = $("[data-toast-msg]");
  const toastClose = $("[data-toast-close]");
  let toastTimer = null;

  function showToast(message, timeoutMs = 2800) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.hidden = false;

    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, timeoutMs);
  }

  if (toastClose) {
    toastClose.addEventListener("click", () => {
      if (!toast) return;
      toast.hidden = true;
    });
  }

  // Ripple effect
  function addRipple(e) {
    const btn = e.currentTarget;
    if (!btn.classList.contains("btn")) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    btn.appendChild(ripple);

    ripple.addEventListener("animationend", () => ripple.remove());
  }
  $$(".btn").forEach((btn) => btn.addEventListener("click", addRipple));

  // Reveal on scroll
  const revealEls = $$("[data-reveal]");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el, idx) => {
      // subtle stagger
      el.style.transitionDelay = `${Math.min(idx * 50, 220)}ms`;
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  // Counters (run when they appear)
  const counters = $$("[data-count-to]");
  if (!prefersReduced && counters.length) {
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          counterIO.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );
    counters.forEach((c) => counterIO.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.getAttribute("data-count-to") || "0"));
  }

  function animateCounter(el) {
    const target = Number(el.getAttribute("data-count-to") || 0);
    const start = 0;
    const duration = 900;
    const t0 = performance.now();

    function tick(now) {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(start + (target - start) * eased);
      el.textContent = value.toString();
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // "Send URL to my PC" (mailto)
  function pageURL() {
    // Prefer canonical URL without hash for sharing
    const url = new URL(window.location.href);
    url.hash = "";
    return url.toString();
  }

  function openMailto() {
    const url = pageURL();
    const body = `Here is the link:\n${url}\n\n— Sent from the Seed Planning website demo`;
    const mailto = `mailto:${encodeURIComponent(EMAIL_TO)}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(body)}`;

    // Open mail client
    window.location.href = mailto;

    // Also copy link as a safety net
    copyToClipboard(url).then((ok) => {
      showToast(ok ? "Email draft opened — URL copied to clipboard too." : "Email draft opened.");
    });
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    }
  }

  $$("[data-send-url]").forEach((btn) => {
    btn.addEventListener("click", () => openMailto());
  });

  const copyBtn = $("[data-copy-url]");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const ok = await copyToClipboard(pageURL());
      showToast(ok ? "URL copied to clipboard." : "Couldn't copy automatically — please copy from the address bar.");
    });
  }

  // Simple toast buttons
  $$("[data-toast]").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast(btn.getAttribute("data-toast") || "Done.");
    });
  });

  // Gentle 3D tilt on hover (mouse / pointer)
  const tiltEls = $$("[data-tilt]");
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  tiltEls.forEach((el) => {
    let raf = 0;

    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const ry = clamp((px - 0.5) * 10, -7, 7);
      const rx = clamp(-(py - 0.5) * 10, -7, 7);

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${rx}deg`);
        el.style.setProperty("--ry", `${ry}deg`);
      });
    }

    function reset() {
      el.style.setProperty("--rx", `0deg`);
      el.style.setProperty("--ry", `0deg`);
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    el.addEventListener("pointerdown", reset);
  });

})();
