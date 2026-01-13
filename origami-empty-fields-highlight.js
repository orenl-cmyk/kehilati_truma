(function () {

  function hasValue(wrapper) {
    const input = wrapper.querySelector('input:not([type=hidden]), textarea, select');
    if (input && input.value && input.value.trim() !== '') return true;

    // קובץ
    if (wrapper.querySelector('.files a')) return true;

    // חתימה
    if (wrapper.querySelector('.signature-field-container img')) return true;

    return false;
  }

  function applyHighlight() {
    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {

      if (!hasValue(wrapper)) {
        wrapper.classList.add('empty-field');
      } else {
        wrapper.classList.remove('empty-field');
      }

      // מאזין רק להסרה (לא מוסיף שוב)
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
