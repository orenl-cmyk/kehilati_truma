(function () {

  function getHiddenSet() {
    const url = new URL(window.location.href);
    return new Set(
      (url.searchParams.get('hidden') || '').split(',').filter(Boolean)
    );
  }

  function getFieldDataName(wrapper) {
    const el = wrapper.querySelector('[class*="fld_"]');
    if (!el) return null;
    return Array.from(el.classList).find(c => c.startsWith('fld_'));
  }

  function hasValue(wrapper) {
    const input = wrapper.querySelector('input:not([type=hidden]), textarea, select');
    if (input && input.value.trim() !== '') return true;
    if (wrapper.querySelector('.files a')) return true;
    if (wrapper.querySelector('.signature-field-container img')) return true;
    return false;
  }

  function enhance() {
    const hiddenSet = getHiddenSet();

    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {
      const fld = getFieldDataName(wrapper);
      if (!fld || hiddenSet.has(fld)) return;

      if (!hasValue(wrapper)) {
        wrapper.classList.add('prefill-highlight');

        const complete = () => {
          if (!hasValue(wrapper)) return;

          const url = new URL(window.location.href);
          const current = new Set(
            (url.searchParams.get('hidden') || '').split(',').filter(Boolean)
          );
          current.add(fld);
          url.searchParams.set('hidden', Array.from(current).join(','));

          window.location.replace(url.toString());
        };

        wrapper.addEventListener('change', complete, { once: true });
        wrapper.addEventListener('blur', complete, { once: true });
      }
    });
  }

  window.addEventListener('load', () => {
    setTimeout(enhance, 200);
  }, { once: true });

})();
