(function () {

  function isEmptyField(field) {

    // Checkbox – תמיד תקין
    if (field.querySelector('input[type="checkbox"]')) {
      return false;
    }

    // Select רגיל
    const select = field.querySelector('select[name^="fld_"]');
    if (select) {
      return !select.value;
    }

    // Select2 (בחירה / קישור)
    const chosen = field.querySelector('.select2-chosen');
    if (chosen) {
      const txt = chosen.textContent.trim();
      return txt === '' || txt === '- בחר -';
    }

    // Input / textarea
    const input = field.querySelector(
      'input[name^="fld_"]:not([type="hidden"]):not(.select2-offscreen), textarea'
    );
    if (input) {
      return !input.value.trim();
    }

    // קובץ
    if (field.querySelector('.files a')) {
      return false;
    }

    // חתימה
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

    // סריקה קצרה – כי Origami מצייר מחדש
    let i = 0;
    const t = setInterval(() => {
      scan();
      if (++i > 20) clearInterval(t); // ~3 שניות
    }, 150);
  });

})();
