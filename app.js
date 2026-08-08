(function () {
  "use strict";

  function each(list, fn) {
    for (var i = 0; i < list.length; i++) fn(list[i], i);
  }

  /* =========================================================
     36. ANALYTICS READY — abstraction only, no provider wired.
     Replace the body of trackEvent() with your analytics call
     (GA4, Plausible, PostHog, etc.) when one is configured.
     ========================================================= */
  function trackEvent(name, payload) {
    // No analytics provider configured yet.
    // console.log("[trackEvent]", name, payload || {});
  }
  window.trackEvent = trackEvent;

  document.addEventListener("click", function (e) {
    const el = e.target.closest("[data-track]");
    if (el) trackEvent(el.getAttribute("data-track"));
  });

  /* =========================================================
     20. PURCHASE FLOW — replace with the real checkout URL.
     ========================================================= */
  const PRODUCT_CHECKOUT_URL = ""; // e.g. "https://bizmind-ai.com/checkout/enterprise-dashboard"
  const checkoutCta = document.getElementById("checkout-cta");
  if (checkoutCta) {
    checkoutCta.addEventListener("click", function (e) {
      if (!PRODUCT_CHECKOUT_URL) {
        e.preventDefault();
        document.getElementById("pricing").scrollIntoView({ behavior: "smooth" });
      } else {
        checkoutCta.href = PRODUCT_CHECKOUT_URL;
      }
    });
  }

  /* =========================================================
     THEME (dark default / light) — persists for the session
     ========================================================= */
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  let theme = root.getAttribute("data-theme") || "dark";
  themeToggle.addEventListener("click", function () {
    theme = theme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", theme);
  });

  /* =========================================================
     LANGUAGE TOGGLE — TH (default) / EN via data-th / data-en
     ========================================================= */
  const langToggle = document.getElementById("lang-toggle");
  let lang = "th";
  function applyLang() {
    each(document.querySelectorAll("[data-th][data-en]"), function (node) {
      const val = lang === "th" ? node.getAttribute("data-th") : node.getAttribute("data-en");
      if (val !== null) node.textContent = val;
    });
    root.setAttribute("lang", lang);
  }
  langToggle.addEventListener("click", function () {
    lang = lang === "th" ? "en" : "th";
    applyLang();
  });

  /* =========================================================
     MOBILE NAV
     ========================================================= */
  const burger = document.getElementById("nav-burger");
  const mobileNav = document.getElementById("nav-mobile");
  burger.addEventListener("click", function () {
    const open = mobileNav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  each(mobileNav.querySelectorAll("a"), function (a) {
    a.addEventListener("click", function () {
      mobileNav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* =========================================================
     29. SCROLL REVEAL
     ========================================================= */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    each(revealEls, function (el) { io.observe(el); });
  } else {
    each(revealEls, function (el) { el.classList.add("is-visible"); });
  }

  /* =========================================================
     8. SHOW THE ENGINE — interactive pipeline
     ========================================================= */
  const pipeline = document.getElementById("pipeline");
  const pipelineDesc = document.getElementById("pipeline-desc");
  if (pipeline) {
    const nodes = pipeline.querySelectorAll(".pipeline__node");
    var setDesc = function (node) {
      each(nodes, function (n) { n.classList.remove("is-active"); });
      node.classList.add("is-active");
      const val = lang === "th" ? node.getAttribute("data-desc-th") : node.getAttribute("data-desc-en");
      pipelineDesc.textContent = val;
    }
    each(nodes, function (node) {
      node.addEventListener("mouseenter", function () { setDesc(node); });
      node.addEventListener("focus", function () { setDesc(node); });
      node.addEventListener("click", function () { setDesc(node); });
    });
  }

  /* =========================================================
     10. PRODUCT DEMO — step navigation
     ========================================================= */
  const demoSteps = document.querySelectorAll(".demo__step");
  const demoPanels = document.querySelectorAll(".demo__panel");
  each(demoSteps, function (step) {
    step.addEventListener("click", function () {
      const target = step.getAttribute("data-step");
      each(demoSteps, function (s) {
        s.classList.remove("is-active");
        s.setAttribute("aria-selected", "false");
      });
      step.classList.add("is-active");
      step.setAttribute("aria-selected", "true");
      each(demoPanels, function (p) {
        p.classList.toggle("is-active", p.getAttribute("data-panel") === target);
      });
      trackEvent("product_screenshot_view", { step: target });
    });
  });

  /* =========================================================
     11. REAL PRODUCT SCREENSHOTS — explicit placeholders only.
     No fabricated screenshots: every tile is clearly labelled.
     ========================================================= */
  const galleryItems = [
    { th: "Executive Dashboard", en: "Executive Dashboard" },
    { th: "Operations Dashboard", en: "Operations Dashboard" },
    { th: "Domain Dashboard", en: "Domain Dashboard" },
    { th: "KPI", en: "KPI" },
    { th: "Root Cause", en: "Root Cause" },
    { th: "Rule Studio", en: "Rule Studio" },
    { th: "Scenario Simulation", en: "Scenario Simulation" },
    { th: "Reports", en: "Reports" },
    { th: "Export", en: "Export" }
  ];
  const galleryGrid = document.getElementById("gallery-grid");
  if (galleryGrid) {
    galleryItems.forEach(function (item) {
      const div = document.createElement("div");
      div.className = "gallery__item";
      div.innerHTML =
        '<span class="tag" data-th="SCREENSHOT PLACEHOLDER" data-en="SCREENSHOT PLACEHOLDER">SCREENSHOT PLACEHOLDER</span>' +
        '<span class="name" data-th="' + item.th + '" data-en="' + item.en + '">' + item.th + "</span>";
      galleryGrid.appendChild(div);
    });
  }

  /* =========================================================
     22/23. FAQ ACCORDION
     ========================================================= */
  each(document.querySelectorAll(".faq__q"), function (btn) {
    const answer = btn.nextElementSibling;
    btn.addEventListener("click", function () {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = isOpen ? "0px" : answer.scrollHeight + "px";
      trackEvent("faq_open", { question: btn.textContent.trim() });
    });
  });

  /* re-apply language once dynamic nodes (gallery) exist */
  applyLang();
})();
