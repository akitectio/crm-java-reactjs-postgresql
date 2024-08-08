const toggle = (button) => {
  const passwordElement = document.getElementById(
    button.getAttribute('aria-controls')
  );
  if (passwordElement.type === 'password') {
    passwordElement.type = 'text';
    button.children.item(0).className = button.dataset.iconHide;
    button.setAttribute('aria-label', button.dataset.labelHide);
  } else if (passwordElement.type === 'text') {
    passwordElement.type = 'password';
    button.children.item(0).className = button.dataset.iconShow;
    button.setAttribute('aria-label', button.dataset.labelShow);
  }
};

const check = (input) => {
  const passwordValue = document.getElementById(
    input.getAttribute('name')
  ).value;
  const length = document.getElementById('valid-length');
  const character = document.getElementById('valid-character');
  const uppercase = document.getElementById('valid-uppercase');

  if (/^.{8,}$/.test(passwordValue)) {
    length.children.item(0).className =
      'fa fa-check icon-info-valid valid-color';
    length.children.item(1).className = 'info-label valid-color';
    length.setAttribute('data-valid', '');
  } else {
    length.children.item(0).className =
      'fa fa-times icon-info-invalid invalid-color';
    length.children.item(1).className = 'info-label invalid-color';
  }

  if (
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
      passwordValue
    )
  ) {
    character.children.item(0).className =
      'fa fa-check icon-info-valid valid-color';
    character.children.item(1).className = 'info-label valid-color';
    character.setAttribute('data-valid', '');
  } else {
    character.children.item(0).className =
      'fa fa-times icon-info-invalid invalid-color';
    character.children.item(1).className = 'info-label invalid-color';
  }

  if (/^(?=.*[A-Z]).*$/.test(passwordValue)) {
    uppercase.children.item(0).className =
      'fa fa-check icon-info-valid valid-color';
    uppercase.children.item(1).className = 'info-label valid-color';
    uppercase.setAttribute('data-valid', '');
  } else {
    uppercase.children.item(0).className =
      'fa fa-times icon-info-invalid invalid-color';
    uppercase.children.item(1).className = 'info-label invalid-color';
  }
};

document
  .querySelectorAll('[data-password-toggle]')
  .forEach((button) => (button.onclick = () => toggle(button)));
document
  .querySelectorAll('[data-new-password]')
  .forEach((input) => (input.onchange = () => check(input)));
