(function () {

  function hasValue(wrapper) {
    const inputs = wrapper.querySelectorAll('input:not([type=hidden]), textarea, select');

    for (const input of inputs) {
      if (input.value && input.value.trim() !== '') return true;
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
