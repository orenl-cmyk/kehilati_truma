(function () {

  function updateHeaderByField(firstNameFld, lastNameFld) {
    // תופסים את השדות לפי name (זה קיים אצלך בוודאות)
    const firstNameInput = document.querySelector(`input[name="${firstNameFld}"]`);
    const lastNameInput  = document.querySelector(`input[name="${lastNameFld}"]`);

    if (!firstNameInput && !lastNameInput) return;

    const firstName = firstNameInput?.value?.trim() || '';
    const lastName  = lastNameInput?.value?.trim() || '';
    if (!firstName && !lastName) return;

    const fullName = `${firstName} ${lastName}`.trim();

    // עולים לסקשן שמכיל את השדה
    const section =
      firstNameInput?.closest('.field_group') ||
      lastNameInput?.closest('.field_group');

    if (!section) return;

    // תופסים רק את הכותרת של אותו סקשן
    const header = section.querySelector('.field_group_name_header');
    if (!header) return;

    header.textContent = `מורשה חתימה – ${fullName}`;
  }

  function run() {
    // מורשה ראשון
    updateHeaderByField('fld_1603', 'fld_1604');

    // מורשה שני
    updateHeaderByField('fld_1603_dup_g_301', 'fld_1604_dup_g_301');
  }

  // polling עד שהטופס נטען
  let tries = 0;
  const timer = setInterval(function () {
    tries++;
    run();
    if (tries > 20) clearInterval(timer);
  }, 300);

})();
