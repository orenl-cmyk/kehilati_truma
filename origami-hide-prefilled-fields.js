function hasValue(wrapper) {

  // 0. אם זה שדה שמכיל checkbox בלבד – מתעלמים לגמרי
  const hasCheckbox = wrapper.querySelector('input[type=checkbox]');
  if (hasCheckbox) {
    return true; // תמיד נחשב "תקין"
  }

  // 1. input / textarea רגיל (לא checkbox)
  const input = wrapper.querySelector(
    'input:not([type=hidden]):not([type=checkbox]), textarea'
  );
  if (input && input.value && input.value.trim() !== '') {
    return true;
  }

  // 2. SELECT (selection)
  const select = wrapper.querySelector('select');
  if (select && select.value && select.value !== '') {
    return true;
  }

  // 3. Radio (כן עדיין רלוונטי)
  const radioChecked = wrapper.querySelector('input[type=radio]:checked');
  if (radioChecked) {
    return true;
  }

  // 4. Relation – יש פריט נבחר
  if (
    wrapper.querySelector('.relation-item') ||
    wrapper.querySelector('.relation-value') ||
    wrapper.querySelector('.selected-item') ||
    wrapper.querySelector('.items span') ||
    wrapper.querySelector('.items a')
  ) {
    return true;
  }

  // 5. קובץ
  if (wrapper.querySelector('.files a')) {
    return true;
  }

  // 6. חתימה
  if (wrapper.querySelector('.signature-field-container img')) {
    return true;
  }

  return false;
}
