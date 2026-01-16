(function () {
  // איזה שדות לשמור ולהעביר
  var FIELD_IDS = ["fld_2205", "fld_2206", "fld_2207", "fld_2208", "fld_2209"]; // שנה ל-5 שלך

  var LS_KEY = "kehilati_last_report_fields_v1";
  var TARGET_FORM_URL = "https://live-public.origamicloud.ms/s/webform/kehilati/6969fc569bedd/";

  function safeString(v) {
    if (v === undefined || v === null) return "";
    return String(v);
  }

  function findFieldElement(fieldId) {
    // נסי כמה סלקטורים נפוצים (Origami יכול להשתנות בין טפסים/גרסאות)
    return (
      document.querySelector('[name="' + fieldId + '"]') ||
      document.querySelector('[id="' + fieldId + '"]') ||
      document.querySelector('[data-field-id="' + fieldId + '"] input, [data-field-id="' + fieldId + '"] textarea, [data-field-id="' + fieldId + '"] select') ||
      document.querySelector('[data-field="' + fieldId + '"] input, [data-field="' + fieldId + '"] textarea, [data-field="' + fieldId + '"] select')
    );
  }

  function readFieldsFromForm() {
    var data = {};
    var foundAny = false;

    FIELD_IDS.forEach(function (fid) {
      var el = findFieldElement(fid);
      if (!el) return;

      var val = "";
      if (el.type === "checkbox") val = el.checked ? "1" : "0";
      else if (el.type === "radio") {
        var checked = document.querySelector('[name="' + fid + '"]:checked');
        val = checked ? checked.value : "";
      } else {
        val = el.value;
      }

      data[fid] = safeString(val);
      foundAny = true;
    });

    return foundAny ? data : null;
  }

  function saveToLocalStorage(data) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function loadFromLocalStorage() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function buildFieldsParam(data) {
    // fields=fld_2205:value,fld_2206:value...
    // חובה encodeURIComponent כדי לא להישבר בעברית/רווחים/תווים מיוחדים
    var parts = [];
    FIELD_IDS.forEach(function (fid) {
      var v = data && data[fid] ? data[fid] : "";
      parts.push(fid + ":" + encodeURIComponent(safeString(v)));
    });
    return parts.join(",");
  }

  function setThankYouButtonHref() {
    var btn = document.getElementById("prefill-report-btn");
    if (!btn) return;

    var data = loadFromLocalStorage();
    if (!data) return; // אין מה להעביר

    var fieldsParam = buildFieldsParam(data);
    btn.href = TARGET_FORM_URL + "?fields=" + fieldsParam;
  }

  function attachAutoSaveListeners() {
    // אם אנחנו על עמוד הטופס (לפני שליחה) – נשמור בכל שינוי וגם בניסיון submit
    function captureNow() {
      var data = readFieldsFromForm();
      if (data) saveToLocalStorage(data);
    }

    // שמירה כל 800ms אחרי הקלדה/שינוי (עדין, לא כבד)
    var t;
    document.addEventListener("input", function () {
      clearTimeout(t);
      t = setTimeout(captureNow, 800);
    }, true);

    document.addEventListener("change", function () {
      clearTimeout(t);
      t = setTimeout(captureNow, 200);
    }, true);

    // שמירה גם ב-submit
    document.addEventListener("submit", function () {
      captureNow();
    }, true);

    // שמירה ראשונית אם כבר יש ערכים
    captureNow();
  }

  // ריצה:
  attachAutoSaveListeners();  // על עמוד הטופס
  setThankYouButtonHref();    // על דף תודה (אם הכפתור קיים)
})();
