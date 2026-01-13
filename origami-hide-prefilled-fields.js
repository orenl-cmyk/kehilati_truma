(function () {

  function update() {
    document.querySelectorAll('.field').forEach(field => {
      const select = field.querySelector('select');
      const chosen = field.querySelector('.select2-chosen');
      const input = field.querySelector('input:not([type=hidden]):not([type=checkbox])');

      let hasValue = false;

      if (select && select.value.trim() !== '') hasValue = true;
      if (chosen && chosen.textContent.trim() !== '') hasValue = true;
      if (input && input.value.trim() !== '') hasValue = true;

      field.style.outline = hasValue ? '2px solid green' : '2px solid red';
    });
  }

  window.addEventListener('load', () => {
    setTimeout(update, 500);
  });

})();
