/**
 * Origami Web Form – Hide Prefilled Fields (One-Time Only)
 * --------------------------------------------------------
 * ✔ מחביא שדות שמגיעים עם ערך בטעינה הראשונית בלבד
 * ✔ לא מאזין לשינויים – מה שהמשתמש ממלא לא נעלם
 * ✔ עובד עם input / textarea / select
 * ✔ בטוח ל־prefill מ־URL / API / חישוב / autofill
 *
 * שימוש:
 * 1. העלה ל-GitHub (Raw)
 * 2. הוסף כ-JS חיצוני בטופס Origami
 */

(function () {

  function hidePrefilledFields() {
    try {
      document.querySelectorAll('input, textarea, select').forEach(field => {

        // דילוג על שדות שלא רלוונטיים
        if (
          field.type === 'hidden' ||
          field.type === 'submit' ||
          field.disabled
        ) return;

        let hasValue = false;

        if (field.type === 'checkbox' || field.type === 'radio') {
          hasValue = field.checked;
        } else {
          hasValue = field.value && field.value.trim() !== '';
        }

        if (!hasValue) return;

        // ניסיון למצוא קונטיינר של שדה (Origami-friendly)
        const wrapper =
          field.closest('.form-group') ||
          field.closest('.origami-field') ||
          field.closest('[data-field-id]') ||
          field.parentElement;

        if (wrapper) {
          wrapper.style.display = 'none';
        }

      });
    } catch (e) {
      console.warn('Origami hide-prefilled-fields error:', e);
    } finally {
      // מציג את הטופס אחרי סיום הריצה
      document.body.style.visibility = 'visible';
    }
  }

  // הסתרת הטופס עד סיום הריצה (למניעת קפיצות)
  document.body.style.visibility = 'hidden';

  // Origami נטען דינמית – ממתינים רגע
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
