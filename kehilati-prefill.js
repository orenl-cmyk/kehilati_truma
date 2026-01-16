(function () {
  var LS_KEY = "kehilati_last_report_fields_v1";
  var TARGET_FORM_URL =
    "https://live-public.origamicloud.ms/s/webform/kehilati/6969fc569bedd/";

  var FIELD_IDS = ["fld_2205", "fld_2206", "fld_2207", "fld_2208", "fld_2209"]; // עדכן אם צריך

  function loadFromLocalStorage() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function buildFieldsParam(data) {
    var parts = [];
    FIELD_IDS.forEach(function (fid) {
      if (!data[fid]) return;
      parts.push(fid + ":" + encodeURIComponent(String(data[fid])));
    });
    return parts.join(",");
  }

  function tryAttachLink() {
    var btn = document.getElementById("prefill-report-btn");
    if (!btn) return false;

    var data = loadFromLocalStorage();
    var fields = buildFieldsParam(data);
    if (!fields) return true;

    btn.href = TARGET_FORM_URL + "?fields=" + fields;
    return true;
  }

  // ⏳ Origami: מחכים שהכפתור באמת יופיע
  var attempts = 0;
  var interval = setInterval(function () {
    attempts++;
    if (tryAttachLink() || attempts > 30) {
      clearInterval(interval);
    }
  }, 300);
})();
