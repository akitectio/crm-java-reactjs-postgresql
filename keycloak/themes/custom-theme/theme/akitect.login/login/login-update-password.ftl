<#import "template.ftl" as layout>
  <@layout.registrationLayout displayMessage=!messagesPerField.existsError('password','password-confirm'); section>
    <#if section="header">
      ${msg("updatePasswordTitle")}
      <#elseif section="form">
        <form id="kc-update-password-form" action="${url.loginAction}" method="post">
          <div id="form-input-rule">
            <div class="${properties.kcBoxInfo!}">
              <div id="valid-length" class='${properties.kcBoxTagInfo!}'>
                <i class="icon-info ${properties.kcFormPasswordNomalIcon!}" aria-hidden="true"></i>
                <p class="info-label">
                  ${msg("validateLength")}
                </p>
              </div>
              <div id="valid-character" class='${properties.kcBoxTagInfo!}'>
                <i class="icon-info ${properties.kcFormPasswordNomalIcon!}" aria-hidden="true"></i>
                <p class="info-label">
                  ${msg("validateCharacter")}
                </p>
              </div>
              <div id="valid-uppercase" class='${properties.kcBoxTagInfo!}'>
                <i class="icon-info ${properties.kcFormPasswordNomalIcon!}" aria-hidden="true"></i>
                <p class="info-label">
                  ${msg("validateUppercase")}
                </p>
              </div>
            </div>
            <div class='form-input-reset'>
              <div class="${properties.kcFormGroupResetClass!} input-new-password">
                <label for="password-new" class="${properties.kcLabelClass!}">
                  ${msg("passwordNew")}
                </label>
                <div class="${properties.kcInputGroup!}">
                  <input type="password" id="password-new" name="password-new" class="${properties.kcInputChildClass!}"
                    autofocus autocomplete="new-password" required placeholder="${msg('newPasswordPlaceholder')}" data-new-password pattern=".{8,}"
                    aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>" />
                  <button class="${properties.kcFormPasswordVisibilityButtonClass!}" type="button" aria-label="${msg("showPassword")}"
                    aria-controls="password-new" data-password-toggle tabindex="3"
                    data-icon-show="${properties.kcFormPasswordVisibilityIconShow!}" data-icon-hide="${properties.kcFormPasswordVisibilityIconHide!}"
                    data-label-show="${msg('showPassword')}" data-label-hide="${msg('hidePassword')}">
                    <i class="${properties.kcFormPasswordVisibilityIconShow!}" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              <div class="${properties.kcFormGroupResetClass!}">
                <label for="password-confirm" class="${properties.kcLabelClass!}">
                  ${msg("passwordConfirm")}
                </label>
                <div>
                  <div id='confirm-input-group' class="${properties.kcInputGroup!}">
                    <input type="password" id="password-confirm" name="password-confirm" class="${properties.kcInputChildClass!}" required data-confirm-password
                      autocomplete="new-password" placeholder="${msg('reNewPasswordPlaceholder')}"
                      aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>" />
                    <button class="${properties.kcFormPasswordVisibilityButtonClass!}" type="button" aria-label="${msg("showPassword")}"
                      aria-controls="password-confirm" data-password-toggle tabindex="3"
                      data-icon-show="${properties.kcFormPasswordVisibilityIconShow!}" data-icon-hide="${properties.kcFormPasswordVisibilityIconHide!}"
                      data-label-show="${msg('showPassword')}" data-label-hide="${msg('hidePassword')}">
                      <i class="${properties.kcFormPasswordVisibilityIconShow!}" aria-hidden="true"></i>
                    </button>
                  </div>
                  <span id="input-error-password-confirm" class="hide-ele" aria-live="polite">
                    <i class="icon-info-hind ${properties.kcFormWarrningIcon!}" aria-hidden="true"></i>
                    <p class="info-label">
                      ${msg("notMatchPasswordMessage")}
                    </p>
                  </span>
                  <div id="blank-space" class='blank-space-hind'></div>
                </div>
              </div>
            </div>
          </div>
          <div id="kc-form-buttons" class="${properties.kcFormGroupResetClass!}">
            <input id="submit-btn" disabled class="${properties.kcButtonClass!} ${properties.kcButtonDisableClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doResetPassword")}" />
          </div>
        </form>
        <script type="module" src="${url.resourcesPath}/js/passwordVisibility.js"></script>
        <script type="module" src="${url.resourcesPath}/js/passwordValidate.js"></script>
    </#if>
  </@layout.registrationLayout>