(function () {

  function readValue(el) {
    return (
      el.value ||
      el.getAttribute("value") ||
      el.defaultValue ||
      ""
    ).trim();
  }

  function isRealValue(v) {
    return v !== "" && v !== "- בחר -";
  }

  function hasValue(wrapper) {

    const field = wrapper.querySelector('.field');
    if (!field) return false;

    // === upload / signature ===
    if (field.classList.contains('upload-files') ||
        field.classList.contains('signature-field')) {
      return !!field.querySelector('.files a');
    }

    // === כל inputs ===
    const inputs = field.querySelectorAll('input, textarea');
    for (const input of inputs) {
      if (isRealValue(readValue(input))) return true;
    }

    // === select אמיתי ===
    const select = field.querySelector('select');
    if (select && isRealValue(readValue(select))) return true;

    // === select2 ===
    const s2 = field.querySelector('.select2-chosen');
    if (s2 && isRealValue(s2.textContent)) return true;

    // === תמונה ===
    if (field.querySelector('img[src*="file"], canvas')) return true;

    return false;
  }

  function scanAll() {
    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {
      wrapper.classList.toggle('empty-field', !hasValue(wrapper));
    });
  }

  // ריצה מתמשכת בגלל Angular
  setInterval(scanAll, 300);

})();
