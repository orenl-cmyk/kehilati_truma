(function () {

  function isRealValue(v) {
    return v && v.trim() !== "" && v.trim() !== "- בחר -";
  }

  function hasValue(wrapper) {

    // === המקור שעבד — לא נוגעים ===
    const input = wrapper.querySelector('input:not([type=hidden]), textarea, select');
    if (input && isRealValue(input.value)) return true;

    // === select2 ===
    const s2 = wrapper.querySelector('.select2-chosen');
    if (s2 && isRealValue(s2.textContent)) return true;

    // === upload file ===
    if (wrapper.querySelector('.files a')) return true;

    // === signature ===
    if (wrapper.querySelector('.signature-field-container img')) return true;

    // === image preview fallback ===
    if (wrapper.querySelector('img[src*="file"], canvas')) return true;

    return false;
  }

  function applyHighlight() {
    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {

      if (!hasValue(wrapper)) {
        wrapper.classList.add('empty-field');
      } else {
        wrapper.classList.remove('empty-field');
      }

      // מאזינים כמו בקוד המקורי — זה מה שעבד
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
