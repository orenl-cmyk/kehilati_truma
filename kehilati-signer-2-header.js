(function () {
  var MAX_TRIES = 30;
  var INTERVAL = 300;
  var tries = 0;

  var timer = setInterval(function () {
    tries++;

    // שדות מורשה חתימה שני
    var firstName = document.querySelector('[name="fld_1603_dup_g_301"]');
    var lastName  = document.querySelector('[name="fld_1604_dup_g_301"]');

    if (!firstName || !lastName) {
      if (tries >= MAX_TRIES) clearInterval(timer);
      return;
    }

    var fullName = [firstName.value, lastName.value].filter(Boolean).join(' ');
    if (!fullName) return;

    // כל כותרות הסקשנים
    var headers = document.querySelectorAll('.field_group_name_header');

    if (headers.length < 2) {
      if (tries >= MAX_TRIES) clearInterval(timer);
      return;
    }

    var secondHeader = headers[1]; // הסקשן השני
    secondHeader.textContent = 'מורשה חתימה – ' + fullName;

    clearInterval(timer);
  }, INTERVAL);
})();
