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

  function isFileFilled(field) {
    return !!field.querySelector('.files a');
  }

  function isTimeFilled(field) {
    const input = field.querySelector('input[type="text"]');
    if (!input) return false;
    return input.value.trim() !== '';
  }

  function isEmptyField(field) {

    // Checkbox – תמיד תקין
    if (field.querySelector('input[type="checkbox"]')) {
      return false;
    }

    // File
    if (field.querySelector('.file-upload-container')) {
      return !isFileFilled(field);
    }

    // Select list
    if (field.classList.contains('select-list')) {
      return isSelectListEmpty(field);
    }

    // Relation
    if (field.classList.contains('select-from-entity')) {
      return isRelationEmpty(field);
    }

    // Time
    if (field.querySelector('.timepicker')) {
      return !isTimeFilled(field);
    }

    // Regular select
    const select = field.querySelector('select[name^="fld_"]');
    if (select) {
      return !select.value;
    }

    // Input / textarea
    const input = field.querySelector(
      'input[name^="fld_"]:not([type="hidden"]):not(.select2-offscreen), textarea'
    );
    if (input) {
      return input.value.trim() === '';
    }

    return false;
  }

  function scan() {
    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {
      const field = wrapper.querySelector('.field[class*="fld_"]');
      if (!field) return;

      const empty = isEmptyField(field);
      wrapper.classList.toggle('empty-field', empty);
    });
  }

  function observeDynamicFields() {
    const target = document.querySelector('body');
    if (!target) return;

    const observer = new MutationObserver(() => {
      scan();
    });

    observer.observe(target, {
      childList: true,
      subtree: true,
    });
  }

  window.addEventListener('load', () => {
    scan();
    observeDynamicFields();
  });

})();
