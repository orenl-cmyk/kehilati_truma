/**
 * Origami – Empty Fields Highlight (FINAL, stable)
 * ------------------------------------------------
 * ✔ מסמן שדות ריקים באדום עדין
 * ✔ מסיר אדום מיד כשמתמלא
 * ✔ תומך Select2 (Selection + Relation)
 * ✔ Checkbox מחוץ למשוואה
 * ✔ File / Signature נתמכים
 * ✔ עובד גם עם שינויים דינמיים
 */

(function () {

  function hasValue(wrapper) {

    // 0. Checkbox – תמיד תקין
    if (wrapper.querySelector('input[type=checkbox]')) {
      return true;
    }

    // 1. Select2 (Selection + Relation)
    const select2Chosen = wrapper.querySelector('.select2-chosen');
    if (select2Chosen && select2Chosen.textContent.trim() !== '') {
      return true;
    }

    // 2. Select רגיל
    const select = wrapper.querySelector('select');
    if (select && select.value && select.value !== '') {
      return true;
    }

    // 3. Radio
    if (wrapper.querySelector('input[type=radio]:checked')) {
      return true;
    }

    // 4. Input / Textarea רגיל
    const input = wrapper.querySelector(
      'input:not([type=hidden]):not([type=checkbox]):not(.select2-offscreen), textarea'
    );
    if (input && input.value && input.value.trim() !== '') {
      return true;
    }

    // 5. קובץ
    if (wrapper.querySelector('.files a')) {
      return true;
    }

    // 6. חתימה
    if (wrapper.querySelector('.signature-field-container img')) {
      return true;
    }

    return false;
  }

  function updateWrapper(wrapper) {
    if (hasValue(wrapper)) {
      wrapper.classList.remove('empty-field');
    } else {
      wrapper.classList.add('empty-field');
    }
  }

  function bind(wrapper) {
    // בדיקה ראשונית
    updateWrapper(wrapper);

    // האזנה לאירועים רגילים
    wrapper.addEventListener('change', () => updateWrapper(wrapper));
    wrapper.addEventListener('input', () => updateWrapper(wrapper));

    // Select2 / Angular לפעמים לא יורים אירוע → polling עדין
    let checks = 0;
    const interval = setInterval(() => {
      updateWrapper(wrapper);
      checks++;
      if (checks > 20) clearInterval(interval); // ~3 שניות וזהו
    }, 150);
  }

  function init() {
    document.querySelectorAll('.form_data_element_wrap').forEach(bind);
  }

  // מחכים ל־Origami + Angular
  window.addEventListener('load', () => {
    setTimeout(init, 300);
  }, { once: true });

})();
