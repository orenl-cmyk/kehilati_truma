(function () {

  function isRealValue(v) {
    return v && v.trim() !== "" && v.trim() !== "- בחר -";
  }

  function hasValue(wrapper) {

    // האינפוט האמיתי של אוריגמי — זה מה שעבד קודם
    const input = wrapper.querySelector('input:not([type=hidden]), textarea, select');
    if (input && isRealValue(input.value)) return true;

    // select2 (entity / list)
    const s2 = wrapper.querySelector('.select2-chosen');
    if (s2 && isRealValue(s2.textContent)) return true;

    // קובץ
    if (wrapper.querySelector('.files a')) return true;

    // חתימה
    if (wrapper.querySelector('.signature-field-container img')) return true;

    // תמונה preview
    if (wrapper.querySelector('img[src*="file"]')) return true;

    return false;
  }

  function applyHighlight() {
    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {

      if (!hasValue(wrapper)) {
        wrapper.classList.add('empty-field');
      } else {
        wrapper.classList.remove('empty-field');
      }

      // מאזין להסרת אדום בזמן שינוי
      wrapper.addEventListener('input', () => {
        if (hasValue(wrapper)) {
          wrapper.classList.remove('empty-field');
        }
      });

      wrapper.addEventListener('change', () => {
        if (hasValue(wrapper)) {
          wrapper.classList.remove('empty-field');
        }
      });

    });
  }

  window.addEventListener('load', () => {
    setTimeout(applyHighlight, 200);
  }, { once: true });

})();
