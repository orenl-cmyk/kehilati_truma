(function () {

  function updateSignerHeader(firstFld, lastFld) {
    const firstInput = document.querySelector(`input[name="${firstFld}"]`);
    const lastInput  = document.querySelector(`input[name="${lastFld}"]`);

    if (!firstInput && !lastInput) return;

    const firstName = firstInput?.value?.trim() || '';
    const lastName  = lastInput?.value?.trim() || '';
    if (!firstName && !lastName) return;

    const fullName = `${firstName} ${lastName}`.trim();

    // עולים לקבוצת השדות
    const fieldGroup =
      firstInput?.closest('.field_group') ||
      lastInput?.closest('.field_group');

    if (!fieldGroup) return;

    // ⚠️ רק האלמנט עם הטקסט בפועל
    const headerText = fieldGroup.querySelector(
      '.field_group_name_header.ng-binding'
    );

    if (!headerText) return;

    headerText.textContent = `מור
