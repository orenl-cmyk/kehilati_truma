/**
 * Origami – Hide Prefilled Fields (Angular-safe)
 * ---------------------------------------------
 * ✔ מסתיר את כל בלוק השדה (כולל label)
 * ✔ תומך קובץ / חתימה / טקסט / מייל / טלפון
 * ✔ רץ פעם אחת בלבד
 * ✔ מחכה ל-Angular שיסיים לצייר
 */

(function () {

  let attempts = 0;
  const MAX_ATTEMPTS = 20;

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

  function tryHide() {
    attempts++;

    let foundAny = false;

    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {
      if (fieldHasValue(wrapper)) {
        wrapper.style.display = 'none';
        foundAny = true;
      }
    });

    // אם עדיין אין קבצים / חתימות בדום – ננסה שוב
    if (!foundAny && attempts < MAX_ATTEMPTS) {
      setTimeout(tryHide, 150);
    } else {
      document.body.style.visibility = 'visible';
    }
  }

  // מסתירים את כל הטופס עד הסיום – בלי קפיצות
  document.body.style.visibility = 'hidden';

  window.addEventListener('load', () => {
    setTimeout(tryHide, 200);
  }, { once: true });

})();
