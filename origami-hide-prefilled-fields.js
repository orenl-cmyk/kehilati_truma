/**
 * Origami – Empty Fields Highlight (Stable Version)
 * -------------------------------------------------
 * ✔ מדגיש שדות ריקים באדום עדין
 * ✔ תומך Selection (Select2)
 * ✔ תומך Relation (Select-from-entity)
 * ✔ Checkbox תמיד נחשב תקין
 * ✔ קובץ / חתימה נחשבים מלאים אם קיימים
 * ✔ עובד בכל מבנה טופס (עמודים / עמוד אחד)
 */

(function () {

  /**
   * בודק האם לשדה יש ערך לוגי
   */
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

    // 4. Input / Textarea רגיל (לא checkbox ולא select2-offscreen)
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

  /**
   * מחיל / מסיר הדגשה
   */
  function applyHighlight() {
    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {

      if (!hasValue(wrapper)) {
        wrapper.classList.add('empty-field');
      } else {
        wrapper.classList.remove('empty-field');
      }

      // מאזין להסרה בלבד (כשמתמלא)
      wrapper.addEventListener('change', () => {
        if (hasValue(wrapper)) {
          wrapper.classList.remove('empty-field');
        }
      });
    });
  }

  // מריצים אחרי טעינה (Origami + Angular)
  window.addEventListener('load', () => {
    setTimeout(applyHighlight, 200);
  }, { once: true });

})();
