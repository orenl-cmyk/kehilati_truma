(function () {

  /* =============================
     Detect if field has value
  ============================== */

  function hasValue(wrapper) {
    const inputs = wrapper.querySelectorAll('input:not([type=hidden]), textarea, select');

    for (const input of inputs) {
      if (input.value && input.value.trim() !== '') return true;
    }

    // file upload
    if (wrapper.querySelector('.files a')) return true;

    // signature
    if (wrapper.querySelector('.signature-field-container img')) return true;

    return false;
  }

  /* =============================
     Update empty class
  ============================== */

  function updateWrapper(wrapper) {
    if (hasValue(wrapper)) {
      wrapper.classList.remove('empty-field');
    } else {
      wrapper.classList.add('empty-field');
    }
  }

  function bind(wrapper) {
    wrapper.addEventListener('input', () => updateWrapper(wrapper));
    wrapper.addEventListener('change', () => updateWrapper(wrapper));
    wrapper.addEventListener('keyup', () => updateWrapper(wrapper));
  }

  function scanAll() {
    document.querySelectorAll('.form_data_element_wrap').forEach(wrapper => {
      updateWrapper(wrapper);
      bind(wrapper);
    });
    updateBanner();
  }

  /* =============================
     Banner logic
  ============================== */

  function firstEmptyField() {
    return document.querySelector('.form_data_element_wrap.empty-field');
  }

  function scrollToEmpty() {
    const target = firstEmptyField();
    if (!target) return;

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    target.classList.add('jump-highlight');
    setTimeout(() => target.classList.remove('jump-highlight'), 1500);
  }

  function createBanner() {
    if (document.getElementById('empty-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'empty-banner';
    banner.innerHTML = `
      יש שדות חסרים בטופס
      <button id="jump-btn">קפוץ לשדה הראשון</button>
    `;

    document.body.prepend(banner);

    document.getElementById('jump-btn')
      .addEventListener('click', scrollToEmpty);
  }

  function updateBanner() {
    const banner = document.getElementById('empty-banner');
    if (!banner) return;

    if (firstEmptyField()) {
      banner.style.display = 'flex';
    } else {
      banner.style.display = 'none';
    }
  }

  /* =============================
     Init
  ============================== */

  window.addEventListener('load', () => {
    createBanner();
    setTimeout(scanAll, 300);
  });

  const observer = new MutationObserver(scanAll);
  observer.observe(document.body, { childList: true, subtree: true });

})();
