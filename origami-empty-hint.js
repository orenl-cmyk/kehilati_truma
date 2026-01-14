(function () {

  const PLACEHOLDER_TEXTS = ['- בחר -'];

  function isSelectListEmpty(field) {
    const chosen = field.querySelector('.select2-chosen');
    if (!chosen) return true;

    const text = chosen.textContent.trim();
    return text === '' || PLACEHOLDER_TEXTS.includes(text);
  }

  function isRelationEmpty(field) {
    const chosen = field.querySelector('.select2-chosen');
    if (!chosen) return true;

    return chosen.textContent.trim() === '';
  }

  function isEmptyField(field) {

    if (field.querySelector('input[type="checkbox"]')) {
      return false;
    }

    if (field.classList.contains('select-list')) {
      return isSelectListEmpty(field);
    }

    if (field.classList.contains('select-from-entity')) {
      return isRelationEmpty(field);
    }

    const select = field.querySelector('select[name^="fld_"]');
    if (select) {
      return !select.value;
    }

    const input = field.querySelector(
      'input[name^="fld_"]:not([type="hidden"]):not(.select2-offscreen), textarea'
    );
    if (input) {
      return input.value.trim() === '';
    }

    if (field.querySelector('.files a')) {
      return false;
    }

    if (field.querySelector('.signature-field-container img')) {
      return false;
    }

    return false;
  }

  function scan() {
    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {
      const field = wrapper.querySelector('.field[class*="fld_"]');
      if (!field) return;

      const isEmpty = isEmptyField(field);
      wrapper.classList.toggle('empty-field', isEmpty);
    });
  }

  window.addEventListener('load', () => {
    scan();

    let i = 0;
    const t = setInterval(() => {
      scan();
      if (++i > 20) clearInterval(t);
    }, 150);
  });

})();
