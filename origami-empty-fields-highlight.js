(function () {

  function norm(s) {
    return (s ?? "").toString().trim();
  }

  function isRealValue(v) {
    const t = norm(v);
    return t !== "" && t !== "- בחר -";
  }

  function isVisible(el) {
    // אלמנטים של select2/hidden יכולים “להיראות” קיימים אבל בפועל לא נראים
    return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length));
  }

  function isNoiseInput(el) {
    if (!el) return true;
    const cls = el.className || "";
    const type = (el.getAttribute("type") || "").toLowerCase();

    // hidden/file/internal select2 controls
    if (type === "hidden" || type === "file") return true;
    if (cls.includes("select2-offscreen")) return true;
    if (cls.includes("select2-focusser")) return true;
    if (cls.includes("select2-input")) return true;

    return false;
  }

  function hasValue(wrapper) {

    // 1) קודם כל: קלטים נראים לעין בתוך ה-wrapper
    const candidates = wrapper.querySelectorAll("input, textarea, select");
    for (const el of candidates) {
      if (isNoiseInput(el)) continue;
      if (!isVisible(el)) continue;

      // select
      if (el.tagName === "SELECT") {
        if (isRealValue(el.value)) return true;
        continue;
      }

      // input/textarea
      if (isRealValue(el.value)) return true;
    }

    // 2) fallback: select2 מציג את הערך ב-span
    const s2 = wrapper.querySelector(".select2-chosen");
    if (s2 && isRealValue(s2.textContent)) return true;

    // 3) קבצים / חתימה (לשניהם יש .files a אצלך)
    if (wrapper.querySelector(".files a")) return true;

    // 4) לפעמים יש preview תמונה
    if (wrapper.querySelector("img[src*='file'], canvas")) return true;

    return false;
  }

  function applyHighlight() {
    document.querySelectorAll(".form_data_element_wrap").forEach(wrapper => {
      wrapper.classList.toggle("empty-field", !hasValue(wrapper));
    });
  }

  // טעינה ראשונית + רינדור מאוחר
  let tries = 0;
  const boot = setInterval(() => {
    applyHighlight();
    tries++;
    if (tries > 12) clearInterval(boot);
  }, 200);

  // עדכון קבוע (כי באוריגמי לפעמים אין events תקינים)
  setInterval(applyHighlight, 400);

})();
