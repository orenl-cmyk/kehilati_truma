(function () {

  // הגנה מלולאה אינסופית
  if (sessionStorage.getItem('origami_hidden_applied')) {
    return;
  }

  function collectFilledFlds() {
    const flds = new Set();

    // inputs רגילים
    document.querySelectorAll('input[name^="fld_"], textarea[name^="fld_"], select[name^="fld_"]').forEach(el => {
      if (el.value && el.value.trim() !== '') {
        flds.add(el.name);
      }
    });

    // קבצים
    document.querySelectorAll('.files a').forEach(a => {
      const wrapper = a.closest('[class*="fld_"]');
      if (!wrapper) return;

      const fld = Array.from(wrapper.classList).find(c => c.startsWith('fld_'));
      if (fld) flds.add(fld);
    });

    // חתימות
    document.querySelectorAll('.signature-field-container img').forEach(img => {
      const wrapper = img.closest('[class*="fld_"]');
      if (!wrapper) return;

      const fld = Array.from(wrapper.classList).find(c => c.startsWith('fld_'));
      if (fld) flds.add(fld);
    });

    return Array.from(flds);
  }

  function applyHidden() {
    const filledFlds = collectFilledFlds();
    if (!filledFlds.length) return;

    const url = new URL(window.location.href);
    url.searchParams.set('hidden', filledFlds.join(','));

    sessionStorage.setItem('origami_hidden_applied', '1');

    // reload שקט
    window.location.replace(url.toString());
  }

  // חשוב: לרוץ רק אחרי שה-redirect הסתיים
  if (window.location.pathname.includes('/web_forms/page/')) {
    setTimeout(applyHidden, 200);
  }

})();
