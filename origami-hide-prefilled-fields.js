/**
 * Origami – Hide Prefilled Fields (REAL hide, one-time)
 * ---------------------------------------------------
 * ✔ מסתיר את כל בלוק השדה (label + input)
 * ✔ תומך: טקסט, מייל, טלפון, קובץ, חתימה
 * ✔ רץ פעם אחת בלבד – לפני הצגת הטופס
 * ✔ מה שהמשתמש ממלא – לא נעלם
 */

(function () {

  function fieldHasValue(wrapper) {
    if (!wrapper) return false;

    // 1. input / textarea / select עם value
    const input = wrapper.querySelector('input:not([type=hidden]), textarea, select');
    if (input && input.value && input.value.trim() !== '') {
      return true;
    }

    // 2. קובץ – יש לינק לקובץ
    if (wrapper.querySelector('.files a')) {
      return true;
    }

    // 3. חתימה – יש תמונה
    if (wrapper.querySelector('.signature-field-container img')) {
      return true;
    }

    return false;
  }

  function hidePrefilledFields() {
    try {
      document
        .querySelectorAll('.form_data_element_wrap')
        .forEach(wrapper => {
          if (fieldHasValue(wrapper)) {
            wrapper.style.display = 'none';
          }
        });
    } catch (e) {
      console.warn('Origami hide-prefilled-fields error:', e);
    } finally {
      document.body.style.visibility = 'visible';
    }
  }

  // הסתרה זמנית – למניעת "קפיצה"
  document.body.style.visibility = 'hidden';

  // Origami נטען דינמית
  if (document.readyState === 'complete') {
    setTimeout(hidePrefilledFields, 300);
  } else {
    window.addEventListener(
      'load',
      () => setTimeout(hidePrefilledFields, 300),
      { once: true }
    );
  }

})();
