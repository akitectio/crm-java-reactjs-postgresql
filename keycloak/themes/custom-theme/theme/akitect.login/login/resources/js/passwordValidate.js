const check = (input) => {
  const newPasswordValue = document.getElementById('password-new').value;
  const confirmPasswordValue = input.value;
  const errorHind = document.getElementById('input-error-password-confirm');
  const blankSpace = document.getElementById('blank-space');
  const confirmInputGroup = document.getElementById('confirm-input-group');
  const submitBtn = document.getElementById('submit-btn');

  const length = document
    .getElementById('valid-length')
    .hasAttribute('data-valid');
  const character = document
    .getElementById('valid-character')
    .hasAttribute('data-valid');
  const uppercase = document
    .getElementById('valid-uppercase')
    .hasAttribute('data-valid');

  if (newPasswordValue === confirmPasswordValue) {
    errorHind.className = 'hide-ele';
    confirmInputGroup.className = 'pf-c-input-group';
    blankSpace.className = 'blank-space-hind';

    if (length && character && uppercase) {
      submitBtn.className = 'pf-c-button pf-m-primary pf-m-block btn-lg';
      submitBtn.removeAttribute('disabled');
    }
  } else {
    errorHind.className = 'tag-info';
    confirmInputGroup.className = 'pf-c-input-valid-group';
    blankSpace.className = 'hide-ele';
  }
};

document
  .querySelectorAll('[data-confirm-password]')
  .forEach((input) => (input.onblur = () => check(input)));
