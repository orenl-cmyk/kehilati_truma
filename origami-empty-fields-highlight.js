(function () {

  function isRealValue(v) {
    if (!v) return false;
    const val = v.trim();
    return val !== "" && val !== "- בחר -";
  }

  function hasValue(wrapper) {

    const field = wrapper.querySelector('.field');
    if (!field) return false;

    // === upload file ===
    if (field.classList.contains('upload-files') ||
        field.classList.contains('signature-field')) {
      return !!field.querySelector('.files a');
    }

    // === כל ה־inputs ===
    const inputs = field.querySelectorAll('input[type="text"], textarea');
    for (const input of inputs) {
      if (isRealValue(input.value)) return true;
    }

    // === select אמיתי ===
    const select = field.querySelector('select');
    if (select && isRealValue(select.value)) return true;

    // === select2 UI ===
    const s2 = field.querySelector('.select2-chosen');
    if (s2 && isRealValue(s2.textContent)) return true;

    // === תמונה (preview / חתימה) ===
    if (field.querySelector('img[src*="file"], canvas')) return true;

    return false;
  }

  function scanAll() {
    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {
      wrapper.classList.toggle('empty-field', !hasValue(wrapper));
    });
  }

  // Angular מחליף DOM → polling
  setInterval(scanAll, 400);

})();
