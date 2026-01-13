/**
 * Origami – Empty Fields Highlight (FINAL FINAL)
 * ---------------------------------------------
 * ✔ עובד רק על .field.fld_XXXX
 * ✔ תומך Text / Time / Select / Relation (Select2)
 * ✔ Checkbox מחוץ למשוואה
 * ✔ לא תלוי באירועים
 */

(function () {

  const EMPTY_TEXTS = ["", "-", "בחר", "- בחר -", "בחר...", "נא לבחור"];

  function norm(t) {
    return (t || "").trim();
  }

  function isEmptyText(t) {
    return EMPTY_TEXTS.includes(norm(t));
  }

  function fieldHasValue(field) {

    /* 1. Checkbox – תמיד תקין */
    if (field.querySelector('input[type=checkbox]')) {
      return true;
    }

    /* 2. Select / Relation (Select2) */
    const select = field.querySelector('select[name^="fld_"]');
    if (select) {
      return !isEmptyText(select.value);
    }

    const chosen = field.querySelector('.select2-chosen');
    if (chosen) {
      return !isEmptyText(chosen.textContent);
    }

    /* 3. Radio */
    if (field.querySelector('input[type=radio]:checked')) {
      return true;
    }

    /* 4. Input / Time / Text */
    const input = field.querySelector(
      'input[name^="fld_"]:not([type=hidden]):not(.select2-offscreen), textarea'
    );
    if (input && norm(input.value) !== "") {
      return true;
    }

    /* 5. File */
    if (field.querySelector('.files a')) {
      return true;
    }

    /* 6. Signature */
    if (field.querySelector('.signature-field-container img')) {
      return true;
    }

    return false;
  }

  function scan() {
    document.querySelectorAll('.field[class*="fld_"]').forEach(field => {
      if (fieldHasValue(field)) {
        field.classList.remove('empty-field');
      } else {
        field.classList.add('empty-field');
      }
    });
  }

  // סריקה ראשונית + מחזורית קצרה (Select2 / Angular)
  window.addEventListener('load', () => {
    scan();

    let runs = 0;
    const t = setInterval(() => {
      scan();
      if (++runs > 20) clearInterval(t); // ~3 שניות וזהו
    }, 150);
  });

})();
