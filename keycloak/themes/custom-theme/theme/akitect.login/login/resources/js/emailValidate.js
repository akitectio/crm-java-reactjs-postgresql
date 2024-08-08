const check = (input) => {
  const emailValue = input.value;
  const errorHind = document.getElementById('input-error-password-confirm');
  const blankSpace = document.getElementById('blank-space');
  const submitBtn = document.getElementById('submit-sent-email');
  const emailInput = document.getElementById('username');

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)) {
    errorHind.className = 'hide-ele';
    emailInput.className = 'pf-c-form-control';
    blankSpace.className = 'blank-space-hind';
    submitBtn.removeAttribute('disabled');
    submitBtn.className = 'pf-c-button pf-m-primary pf-m-block btn-lg';
  } else {
    errorHind.className = 'tag-info';
    emailInput.className = 'pf-c-input-valid-group';
    blankSpace.className = 'hide-ele';
  }
};

document
  .querySelectorAll('[data-email]')
  .forEach((input) => (input.onblur = () => check(input)));
