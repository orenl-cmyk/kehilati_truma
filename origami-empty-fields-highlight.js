(function () {

  function isRealValue(v) {
    return v && v.trim() !== "" && v.trim() !== "- בחר -";
  }

  function hasValue(wrapper) {

    const field = wrapper.querySelector('.field');
    if (!field) return false;

    // upload / signature
    if (field.classList.contains('upload-files') ||
        field.classList.contains('signature-field')) {
      return !!field.querySelector('.files a');
    }

    // select2
    const s2 = field.querySelector('.select2-chosen');
    if (s2 && isRealValue(s2.textContent)) return true;

    // select רגיל
    const select = field.querySelector('select');
    if (select && isRealValue(select.value)) return true;

    // input רגיל / שעה
    const input = wrapper.querySelector('input:not([type=hidden]), textarea');
    if (input && isRealValue(input.value)) return true;

    return false;
  }

  function applyHighlight() {
    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {
      wrapper.classList.toggle('empty-field', !hasValue(wrapper));
    });
  }

  function bindListeners(wrapper) {
    wrapper.addEventListener('input', applyHighlight);
    wrapper.addEventListener('change', applyHighlight);
  }

  function init() {
    document.querySelectorAll('.form_data_element_wrap').forEach(bindListeners);
    applyHighlight();
  }

  window.addEventListener('load', () => {
    setTimeout(init, 200);
  }, { once: true });

  // 🔹 refresh אחרי כל click (תופס select2/time/signature)
  document.addEventListener('click', applyHighlight, true);

  // 🔹 observer לשדות דינמיים
  const observer = new MutationObserver(applyHighlight);
  observer.observe(document.body, { childList: true, subtree: true });

  // 🔹 fallback עדין
  setInterval(applyHighlight, 300);

})();
