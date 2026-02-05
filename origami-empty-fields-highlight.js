(function () {

  function isRealValue(v) {
    return v && v.trim() !== "" && v.trim() !== "- בחר -";
  }

  function hasValue(wrapper) {

    // ✅ זה הקו שעבד — לא נוגעים בו
    const input = wrapper.querySelector('input:not([type=hidden]), textarea, select');
    if (input && isRealValue(input.value)) return true;

    // רק אם לא נמצא input אמיתי — בדיקות נוספות

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

  // להריץ כמה פעמים כי Angular נטען באיחור
  let tries = 0;
  const interval = setInterval(() => {
    applyHighlight();
    tries++;
    if (tries > 10) clearInterval(interval);
  }, 200);

})();
