(function () {

  function hasValue(wrapper) {

    const field = wrapper.querySelector('.field');
    if (!field) return false;

    // === upload file ===
    if (field.classList.contains('upload-files')) {
      return !!field.querySelector('.files a');
    }

    // === signature ===
    if (field.classList.contains('signature-field')) {
      return !!field.querySelector('.files a');
    }

    // === select2 / entity ===
    if (field.querySelector('.select2-chosen')) {
      const txt = field.querySelector('.select2-chosen').textContent.trim();
      return txt !== "" && txt !== "- בחר -";
    }

    // === select רגיל ===
    const select = field.querySelector('select');
    if (select && select.value && select.value.trim() !== '') return true;

    // === input רגיל / שעה / טקסט ===
    const input = field.querySelector('input[type="text"], textarea');
    if (input && input.value && input.value.trim() !== '') return true;

    // === תמונה ===
    if (field.querySelector('img[src*="file"]')) return true;

    return false;
  }

  function scanAll() {
    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {
      wrapper.classList.toggle('empty-field', !hasValue(wrapper));
    });
  }

  // Angular מחליף DOM → צריך polling
  setInterval(scanAll, 400);

})();
