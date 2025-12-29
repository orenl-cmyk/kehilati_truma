(() => {
  'use strict';

  // ---- config: field names ----
  const SIGNER_FIELDS = [
    { first: 'fld_1603', last: 'fld_1604' },                         // מורשה 1
    { first: 'fld_1603_dup_g_301', last: 'fld_1604_dup_g_301' }       // מורשה 2
  ];

  const HEADER_TEXT = 'מורשה חתימה'; // הכותרת הבסיסית

  function clean(s) {
    return (s || '').toString().replace(/\s+/g, ' ').trim();
  }

  function getInputValueByName(root, name) {
    const el = root.querySelector(`input[name="${CSS.escape(name)}"]`);
    if (!el) return '';
    return clean(el.value || el.getAttribute('value') || '');
  }

  function setHeaderText(headerEl, text) {
    // חשוב: רק טקסט, בלי innerHTML
    if (headerEl && headerEl.textContent !== text) {
      headerEl.textContent = text;
    }
  }

  function findGroupHeaders() {
    // מוצא את הכותרות בתוך כל field_group
    return Array.from(document.querySelectorAll('.field_group .field_group_name_header[ng-if="view_state == \'1\'"]'));
  }

  function updateAllSignerHeaders() {
    const headers = findGroupHeaders();

    headers.forEach((headerEl) => {
      const base = clean(headerEl.textContent);

      // רק כותרות שהן "מורשה חתימה" (גם אם כבר הוספנו שם – נזהה לפי התחלה)
      if (!base.startsWith(HEADER_TEXT)) return;

      const groupEl = headerEl.closest('.field_group');
      if (!groupEl) return;

      // איזה מורשה זה? נזהה לפי השדות שקיימים בתוך אותה קבוצה
      let matched = null;
      for (const f of SIGNER_FIELDS) {
        const hasFirst = !!groupEl.querySelector(`input[name="${CSS.escape(f.first)}"]`);
        const hasLast  = !!groupEl.querySelector(`input[name="${CSS.escape(f.last)}"]`);
        if (hasFirst || hasLast) { matched = f; break; }
      }
      if (!matched) return;

      const firstName = getInputValueByName(groupEl, matched.first);
      const lastName  = getInputValueByName(groupEl, matched.last);
      const fullName  = clean([firstName, lastName].filter(Boolean).join(' '));

      // אם עדיין אין ערכים – נשאיר "מורשה חתימה" נקי
      const finalText = fullName ? `${HEADER_TEXT} – ${fullName}` : HEADER_TEXT;

      setHeaderText(headerEl, finalText);
    });
  }

  // ---- run once + keep alive ----
  function boot() {
    updateAllSignerHeaders();

    // פולינג קצר (כי לפעמים הערכים נטענים שנייה אחרי)
    let tries = 0;
    const t = setInterval(() => {
      updateAllSignerHeaders();
      tries += 1;
      if (tries >= 20) clearInterval(t); // ~10 שניות
    }, 500);

    // Observers לרינדורים מחדש
    const mo = new MutationObserver(() => updateAllSignerHeaders());
    mo.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
