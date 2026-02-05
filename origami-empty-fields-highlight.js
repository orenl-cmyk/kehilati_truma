(function () {

  function isRealValue(v) {
    return v && v.trim() !== "" && v.trim() !== "- בחר -";
  }

  function hasValue(wrapper) {

    const field = wrapper.querySelector('.field');
    if (!field) return false;

    // === upload file ===
    if (field.classList.contains('upload-files') ||
        field.classList.contains('signature-field')) {
      return !!field.querySelector('.files a');
    }

    // === select2 ===
    const s2 = field.querySelector('.select2-chosen');
    if (s2 && isRealValue(s2.textContent)) return true;

    // === select רגיל ===
    const select = field.querySelector('select');
    if (select && isRealValue(select.value)) return true;

    // === input רגיל ===
    const input = wrapper.querySelector('input:not([type=hidden]), textarea');
    if (input && isRealValue(input.value)) return true;

    // === תמונה ===
    if (field.querySelector('img[src*="file"], canvas')) return true;

    return false;
  }

  function applyHighlight() {
    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {

      wrapper.classList.toggle('empty-field', !hasValue(wrapper));

      // בדיוק כמו בקוד שעבד
      wrapper.addEventListener('change', () => {
        if (hasValue(wrapper)) {
          wrapper.classList.remove('empty-field');
        }
      });

      wrapper.addEventListener('input', () => {
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
