(function () {
  "use strict";

  /* ===== スクロールで各要素をふわっと表示 ===== */
  var revealTargets = document.querySelectorAll(
    ".section-title, .worry-item, .recommend-item, .feature-card, .pricing-card, " +
    ".gallery img, .teacher-card, .voice-card, .schedule-table-wrap, " +
    ".subject-block, .cta-cards"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ===== スムーズスクロール（ページ内リンク） ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ===== スクロールに応じたヘッダー＆トップボタン ===== */
  var header = document.querySelector("header");
  var toTop = document.getElementById("toTop");

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (header) header.classList.toggle("shrink", y > 60);
    if (toTop) toTop.classList.toggle("show", y > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ===== トップへ戻る ===== */
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
