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

    // 1️⃣ Checkbox – תמיד תקין
    if (field.querySelector('input[type="checkbox"]')) {
      return false;
    }

    // 2️⃣ SELECT (בחירה)
    if (field.classList.contains('select-list')) {
      return isSelectListEmpty(field);
    }

    // 3️⃣ RELATION (select-from-entity)
    if (field.classList.contains('select-from-entity')) {
      return isRelationEmpty(field);
    }

    // 4️⃣ SELECT רגיל
    const select = field.querySelector('select[name^="fld_"]');
    if (select) {
      return !select.value;
    }

    // 5️⃣ INPUT / TEXTAREA
    const input = field.querySelector(
      'input[name^="fld_"]:not([type="hidden"]):not(.select2-offscreen), textarea'
    );
    if (input) {
      return input.value.trim() === '';
    }

    // 6️⃣ FILE
    if (field.querySelector('.files a')) {
      return false;
    }

    // 7️⃣ SIGNATURE
    if (field.querySelector('.signature-field-container img')) {
      return false;
    }

    return false;
  }

  function scan() {
    document.querySelectorAll('.field[class*="fld_"]').forEach(field => {
      field.dataset.empty = isEmptyField(field) ? '1' : '0';
    });
  }

  window.addEventListener('load', () => {
    scan();

    // סריקה קצרה כי Origami / Select2 מתעדכנים דינמית
    let i = 0;
    const t = setInterval(() => {
      scan();
      if (++i > 20) clearInterval(t);
    }, 150);
  });

})();
