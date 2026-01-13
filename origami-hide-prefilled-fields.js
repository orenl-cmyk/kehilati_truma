/**
 * Origami – Hide Prefilled Fields via ?hidden=
 * --------------------------------------------
 * ✔ משתמש במנגנון native של Origami
 * ✔ עובד לפני רינדור – בלי קפיצות
 * ✔ פותר קובץ / חתימה / כל סוג שדה
 * ✔ חד-פעמי
 */

(function () {

  // הגנה מלולאה אינסופית
  if (sessionStorage.getItem('origami_hidden_applied')) {
    return;
  }

  function fieldHasValue(wrapper) {
    // input רגיל
    const input = wrapper.querySelector('input:not([type=hidden]), textarea, select');
    if (input && input.value && input.value.trim() !== '') {
      return true;
    }

    // קובץ
    if (wrapper.querySelector('.files a')) {
      return true;
    }

    // חתימה
    if (wrapper.querySelector('.signature-field-container img')) {
      return true;
    }

    return false;
  }

  function getFieldDataName(wrapper) {
    // class כמו: fld_1597
    const fldClass = Array.from(wrapper.querySelectorAll('[class*="fld_"]'))
      .map(el => Array.from(el.classList).find(c => c.startsWith('fld_')))
      .find(Boolean);

    return fldClass || null;
  }

  function applyHiddenParam() {
    const hiddenFields = [];

    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {
      if (!fieldHasValue(wrapper)) return;

      const fld = getFieldDataName(wrapper);
      if (fld) {
        hiddenFields.push(fld);
      }
    });

    if (!hiddenFields.length) return;

    const url = new URL(window.location.href);

    // מאחד עם hidden קיים אם יש
    const existing = url.searchParams.get('hidden');
    const allHidden = new Set(
      (existing ? existing.split(',') : []).concat(hiddenFields)
    );

    url.searchParams.set('hidden', Array.from(allHidden).join(','));

    sessionStorage.setItem('origami_hidden_applied', '1');

    // replace = בלי להוסיף ל-history
    window.location.replace(url.toString());
  }

  // מחכים לטעינה ראשונית כדי לזהות ערכים
  window.addEventListener('load', () => {
    setTimeout(applyHiddenParam, 150);
  }, { once: true });

})();
