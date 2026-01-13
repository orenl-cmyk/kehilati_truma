(function () {

  function getHiddenSet() {
    const url = new URL(window.location.href);
    return new Set(
      (url.searchParams.get('hidden') || '').split(',').filter(Boolean)
    );
  }

  function getFldFromInput(input) {
    // עדיפות ל-name
    if (input.name && input.name.startsWith('fld_')) {
      return input.name;
    }

    // fallback – class
    const cls = Array.from(input.classList).find(c => c.startsWith('fld_'));
    return cls || null;
  }

  function hasValueByInput(input) {
    if (input.type === 'file') return false;
    return input.value && input.value.trim() !== '';
  }

  function findWrapper(input) {
    return (
      input.closest('.form_data_element_wrap') ||
      input.closest('.field_name_wrapper') ||
      input.closest('.field')
    );
  }

  function enhance() {
    const hiddenSet = getHiddenSet();

    document
      .querySelectorAll('input:not([type=hidden]), textarea, select')
      .forEach(input => {

        const fld = getFldFromInput(input);
        if (!fld || hiddenSet.has(fld)) return;

        const wrapper = findWrapper(input);
        if (!wrapper) return;

        if (!hasValueByInput(input)) {
          // הדגשה
          wrapper.classList.add('prefill-highlight');

          const complete = () => {
            if (!hasValueByInput(input)) return;

            const url = new URL(window.location.href);
            const current = new Set(
              (url.searchParams.get('hidden') || '').split(',').filter(Boolean)
            );
            current.add(fld);
            url.searchParams.set('hidden', Array.from(current).join(','));

            window.location.replace(url.toString());
          };

          input.addEventListener('change', complete, { once: true });
          input.addEventListener('blur', complete, { once: true });
        }
      });
  }

  window.addEventListener('load', () => {
    setTimeout(enhance, 200);
  }, { once: true });

})();
