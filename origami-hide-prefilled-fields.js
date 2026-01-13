/**
 * Kehilati – Prefill Highlight + Auto Hide
 * ---------------------------------------
 * ✔ שדות ריקים → מודגשים (CSS)
 * ✔ מילוי → הוספה ל ?hidden=
 * ✔ רענון שקט
 * ✔ עובד עם כל סוג שדה
 */

(function () {

  function getHiddenSet() {
    const url = new URL(window.location.href);
    return new Set(
      (url.searchParams.get('hidden') || '').split(',').filter(Boolean)
    );
  }

  function getFieldDataName(wrapper) {
    const el = wrapper.querySelector('[class*="fld_"]');
    if (!el) return null;
    return Array.from(el.classList).find(c => c.startsWith('fld_'));
  }

  function hasValue(wrapper) {
    const input = wrapper.querySelector('input:not([type=hidden]), textarea, select');
    if (input && input.value.trim() !== '') return true;
    if (wrapper.querySelector('.files a')) return true;
    if (wrapper.querySelector('.signature-field-container img')) return true;
    return false;
  }

  function enhanceFields() {
    const hiddenSet = getHiddenSet();

    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {
      const fld = getFieldDataName(wrapper);
      if (!fld || hiddenSet.has(fld)) return;

      if (!hasValue(wrapper)) {
        // הדגשה
        wrapper.classList.add('prefill-highlight');

        const onComplete = () => {
          if (!hasValue(wrapper)) return;

          wrapper.classList.remove('prefill-highlight');

          const url = new URL(window.location.href);
          const current = new Set(
            (url.searchParams.get('hidden') || '').split(',').filter(Boolean)
          );
          current.add(fld);
          url.searchParams.set('hidden', Array.from(current).join(','));

          window.location.replace(url.toString());
        };

        // מאזינים רק לשדה עצמו
        wrapper.addEventListener('change', onComplete, { once: true });
        wrapper.addEventListener('blur', onComplete, { once: true });
      }
    });
  }

  window.addEventListener('load', () => {
    setTimeout(enhanceFields, 200);
  }, { once: true });

})();
