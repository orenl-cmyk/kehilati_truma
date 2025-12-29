(function () {
  function updateSignerHeader(firstNameFld, lastNameFld) {
    const firstNameInput = document.querySelector(`[data-name="${firstNameFld}"] input`);
    const lastNameInput  = document.querySelector(`[data-name="${lastNameFld}"] input`);

    if (!firstNameInput || !lastNameInput) return;

    const firstName = firstNameInput.value?.trim();
    const lastName  = lastNameInput.value?.trim();
    if (!firstName && !lastName) return;

    // עלייה לסקשן שמכיל את השדות
    const section = firstNameInput.closest('.field_group');
    if (!section) return;

    const header = section.querySelector('.field_group_name_header');
    if (!header) return;

    header.textContent = `מורשה חתימה – ${firstName} ${lastName}`.trim();
  }

  function run() {
    updateSignerHeader('fld_1603', 'fld_1604');
    updateSignerHeader('fld_1603_dup_g_301', 'fld_1604_dup_g_301');
  }

  // ריצה ראשונית + ריצה נוספת לאחר טעינה
  setTimeout(run, 500);
  setTimeout(run, 1500);
})();
