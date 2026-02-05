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

  // === observer לשדות שמופיעים דינמית ===
  const observer = new MutationObserver(() => applyHighlight());
  observer.observe(document.body, { childList: true, subtree: true });

  // === polling עדין לשדות שמתעדכנים בלי events ===
  setInterval(applyHighlight, 500);

  // === טעינה ראשונית ===
  window.addEventListener('load', () => {
    setTimeout(applyHighlight, 300);
  });

})();
