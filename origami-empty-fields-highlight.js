(function () {

  function hasValue(wrapper) {

    const field = wrapper.querySelector('.field');
    if (!field) return false;

    // אם יש טקסט שהוזן
    if (field.querySelector('input[value]:not([value=""]), textarea:not(:placeholder-shown)')) {
      return true;
    }

    // select2
    const s2 = field.querySelector('.select2-chosen');
    if (s2 && s2.textContent.trim() !== '') return true;

    // קובץ
    if (field.querySelector('.files a')) return true;

    // חתימה / תמונה
    if (field.querySelector('img[src*="file"], canvas')) return true;

    return false;
  }

  function scanAll() {
    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {
      wrapper.classList.toggle('empty-field', !hasValue(wrapper));
    });
  }

  // ריצה חוזרת כל הזמן — כי Angular מחליף DOM
  setInterval(scanAll, 400);

})();
