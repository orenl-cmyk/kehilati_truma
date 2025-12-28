(function () {
  var MAX_TRIES = 30;
  var INTERVAL = 300;
  var tries = 0;

  function injectCommunityName() {
    tries++;

    var field =
      document.querySelector('[name="fld_2007"]') ||
      document.querySelector('[name="שם בית הכנסת"]');

    var target = document.getElementById('kehilati-community-name');

    if (field && field.value && target) {
      target.textContent = ' ' + field.value;
      clearInterval(timer);
    }

    if (tries >= MAX_TRIES) {
      clearInterval(timer);
    }
  }

  var timer = setInterval(injectCommunityName, INTERVAL);
})();
