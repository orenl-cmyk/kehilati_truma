(function () {

  function isRealValue(v) {
    return v && v.trim() !== "" && v.trim() !== "- בחר -";
  }

  function hasValue(wrapper) {

    const input = wrapper.querySelector('input:not([type=hidden]), textarea, select');
    if (input && isRealValue(input.value)) return true;

    if (wrapper.querySelector('.select2-chosen') &&
        isRealValue(wrapper.querySelector('.select2-chosen').textContent)) return true;

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

  // ⬅️ הסוד: להריץ כמה פעמים עד שהטופס נטען באמת
  let tries = 0;
  const interval = setInterval(() => {
    applyHighlight();
    tries++;
    if (tries > 10) clearInterval(interval); // אחרי ~2 שניות מפסיק
  }, 200);

})();
