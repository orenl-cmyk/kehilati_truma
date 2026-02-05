(function () {

  function isRealValue(v) {
    return v && v.trim() !== "" && v.trim() !== "- בחר -";
  }

  function hasValue(wrapper) {

    const input = wrapper.querySelector('input:not([type=hidden]), textarea, select');
    if (input && isRealValue(input.value)) return true;

    const s2 = wrapper.querySelector('.select2-chosen');
    if (s2 && isRealValue(s2.textContent)) return true;

    if (wrapper.querySelector('.files a')) return true;

    if (wrapper.querySelector('.signature-field-container img')) return true;

    if (wrapper.querySelector('img[src*="file"]')) return true;

    return false;
  }

  function applyHighlight() {
    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {
      wrapper.classList.toggle('empty-field', !hasValue(wrapper));
    });
  }

  // === רענון חכם ===
  let scheduled = false;
  function scheduleScan() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(() => {
      applyHighlight();
      scheduled = false;
    }, 100);
  }

  // listeners גלובליים — לא על ה-wrapper
  document.addEventListener('input', scheduleScan, true);
  document.addEventListener('change', scheduleScan, true);
  document.addEventListener('click', scheduleScan, true);

  // טעינה ראשונית (Angular איטי)
  let tries = 0;
  const interval = setInterval(() => {
    applyHighlight();
    tries++;
    if (tries > 10) clearInterval(interval);
  }, 200);

})();
