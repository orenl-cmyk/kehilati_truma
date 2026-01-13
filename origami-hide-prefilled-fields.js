/**
 * Origami – Empty Fields Highlight (FIELD-based, FINAL)
 * ----------------------------------------------------
 * ✔ עובד על .field (לא wrapper משתנה)
 * ✔ Selection / Relation (Select2) מזוהים נכון
 * ✔ Time fields מזוהים לפי value אמיתי
 * ✔ Checkbox מחוץ למשוואה
 * ✔ הצבע יורד מיד כשיש ערך
 */

(function () {

  const EMPTY_TEXTS = ["", "-", "בחר", "- בחר -", "בחר...", "נא לבחור"];

  function norm(t) {
    return (t || "").trim();
  }

  function isEmptyText(t) {
    return EMPTY_TEXTS.includes(norm(t));
  }

  function hasValue(field) {

    /* 0. Checkbox – תמיד תקין */
    if (field.querySelector('input[type=checkbox]')) {
      return true;
    }

    /* 1. Select / Select2 (Selection + Relation) */
    const select = field.querySelector('select[name^="fld_"]');
    if (select) {
      return !isEmptyText(select.value);
    }

    const chosen = field.querySelector('.select2-chosen');
    if (chosen) {
      return !isEmptyText(chosen.textContent);
    }

    /* 2. Radio */
    if (field.querySelector('input[type=radio]:checked')) {
      return true;
    }

    /* 3. Time / Date / Text inputs */
    const input = field.querySelector(
      'input[name^="fld_"]:not([type=hidden]):not(.select2-offscreen), textarea'
    );
    if (input && norm(input.value) !== "") {
      return true;
    }

    /* 4. File */
    if (field.querySelector('.files a')) {
      return true;
    }

    /* 5. Signature */
    if (field.querySelector('.signature-field-container img')) {
      return true;
    }

    return false;
  }

  function update(field) {
    if (hasValue(field)) {
      field.classList.remove('empty-field');
    } else {
      field.classList.add('empty-field');
    }
  }

  function bind(field) {
    update(field);

    const handler = () => update(field);

    field.addEventListener('change', handler);
    field.addEventListener('input', handler);
    field.addEventListener('blur', handler, true);

    // Select2 / Angular – ריענון קצר
    let i = 0;
    const t = setInterval(() => {
      update(field);
      if (++i > 20) clearInterval(t);
    }, 150);
  }

  function init() {
    document.querySelectorAll('.field[class*="fld_"]').forEach(bind);
  }

  window.addEventListener('load', () => {
    setTimeout(init, 300);
  }, { once: true });

})();
