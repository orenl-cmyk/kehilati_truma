(function () {

 function hasValue(wrapper) {

  // קלטים רגילים
  const inputs = wrapper.querySelectorAll('input:not([type=hidden]), textarea, select');
  for (const input of inputs) {
    if (input.value && input.value.trim() !== '') return true;
  }

  // hidden inputs (אוריגמי אוהב לשמור ערך שם)
  const hidden = wrapper.querySelectorAll('input[type=hidden]');
  for (const h of hidden) {
    if (h.value && h.value.trim() !== '') return true;
  }

  // העלאת קבצים – כל לינק/preview
  if (wrapper.querySelector('a[href*="file"], .files a, .uploaded-file, .file-preview')) {
    return true;
  }

  // חתימה – תמונה / canvas
  if (wrapper.querySelector('canvas, .signature img, .signature-field-container img')) {
    return true;
  }

  // select2 / קומפוננטות JS
  if (wrapper.querySelector('.select2-chosen, .select2-selection__rendered')) {
    const txt = wrapper.querySelector('.select2-chosen, .select2-selection__rendered').textContent;
    if (txt && txt.trim() !== '') return true;
  }

  return false;
}


    // קובץ
    if (wrapper.querySelector('.files a')) return true;

    // חתימה
    if (wrapper.querySelector('.signature-field-container img')) return true;

    return false;
  }

  function updateWrapper(wrapper) {
    if (hasValue(wrapper)) {
      wrapper.classList.remove('empty-field');
    } else {
      wrapper.classList.add('empty-field');
    }
  }

  function bind(wrapper) {
    wrapper.addEventListener('input', () => updateWrapper(wrapper));
    wrapper.addEventListener('change', () => updateWrapper(wrapper));
    wrapper.addEventListener('keyup', () => updateWrapper(wrapper));
  }

  function scanAll() {
    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {
      updateWrapper(wrapper);
      bind(wrapper);
    });
  }

  // ריצה ראשונית
  window.addEventListener('load', () => {
    setTimeout(scanAll, 300);
  });

  // אם אוריגמי מרנדר מחדש שדות
  const observer = new MutationObserver(() => scanAll());
  observer.observe(document.body, { childList: true, subtree: true });

})();
