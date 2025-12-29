(function () {
  // איזה שדות מזהים כל "מורשה חתימה"
  const TARGETS = [
    { first: "fld_1603", last: "fld_1604", baseTitle: "מורשה חתימה" }, // ראשון
    { first: "fld_1603_dup_g_301", last: "fld_1604_dup_g_301", baseTitle: "מורשה חתימה" } // שני
  ];

  function text(el) {
    return (el && typeof el.value === "string") ? el.value.trim() : "";
  }

  function updateHeaders() {
    document.querySelectorAll(".field_group").forEach(group => {
      // הכותרת של הקבוצה (הסקשן)
      const header = group.querySelector(
        ".d-flex.field_group_name_header .field_group_name_header.ng-binding"
      );
      if (!header) return;

      // נעדכן רק אם בתוך הקבוצה קיימים השדות שמזהים אותה
      for (const t of TARGETS) {
        const firstEl = group.querySelector(`input[name="${t.first}"]`);
        const lastEl  = group.querySelector(`input[name="${t.last}"]`);
        if (!firstEl || !lastEl) continue;

        const fullName = `${text(firstEl)} ${text(lastEl)}`.trim();
        header.textContent = fullName ? `${t.baseTitle} – ${fullName}` : t.baseTitle;

        // סימון פנימי כדי שלא תתבלבלו בדיבאג
        header.setAttribute("data-kehilati-dynamic", "1");
        break;
      }
    });
  }

  // בגלל שאוריגמי/אנגולר מרנדר מחדש – מאזינים לשינויים ומעדכנים שוב
  const debouncedUpdate = (() => {
    let t = null;
    return () => {
      clearTimeout(t);
      t = setTimeout(updateHeaders, 50);
    };
  })();

  const mo = new MutationObserver(debouncedUpdate);
  mo.observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener(
    "input",
    (e) => {
      const n = e.target && e.target.name;
      if (!n) return;
      if (TARGETS.some(t => t.first === n || t.last === n)) updateHeaders();
    },
    true
  );

  updateHeaders();
})();
