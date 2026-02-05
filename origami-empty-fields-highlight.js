(function () {

  function hasValue(wrapper) {

    // === טקסט רגיל ===
    const inputs = wrapper.querySelectorAll('input:not([type=hidden]):not(.select2-offscreen), textarea, select');
    for (const input of inputs) {
      if (input.value && input.value.trim() !== '') return true;
    }

    // === hidden inputs (אוריגמי שומר ערכים כאן) ===
    const hidden = wrapper.querySelectorAll('input[type=hidden]');
    for (const h of hidden) {
      if (h.value && h.value.trim() !== '') return true;
    }

    // === select2 ===
    const s2 = wrapper.querySelector('.select2-chosen');
    if (s2 && s2.textContent.trim() !== '') return true;

    // === קובץ ===
    const files = wrapper.querySelector('.files a');
    if (files) return true;

    // === חתימה ===
    if (wrapper.querySelector('canvas, img[src*="file"]')) return true;

    return false;
  }

  function updateWrapper(wrapper) {
    if (hasValue(wrapper)) {
      wrapper.classList.remove('empty-field');
    } else {
      wrapper.classList.add('empty-field');
    }
  }

  function scanAll() {
    document.querySelectorAll('.form_data_element_wrap').forEach(updateWrapper);
  }

  // ריצה ראשונית
  window.addEventListener('load', () => {
    setTimeout(scanAll, 500);
  });

  // מאזין לשינויים חיים
  document.addEventListener('input', scanAll);
  document.addEventListener('change', scanAll);

  // observer לרינדור דינמי של אוריגמי
  const observer = new MutationObserver(() => scanAll());
  observer.observe(document.body, { childList: true, subtree: true });

})();
