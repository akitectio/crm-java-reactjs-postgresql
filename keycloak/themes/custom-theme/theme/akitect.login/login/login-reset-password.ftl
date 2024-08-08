<#import "template.ftl" as layout>
  <@layout.registrationLayout displayInfo=true displayMessage=!messagesPerField.existsError('username'); section>
    <#if section="header">
      ${msg("emailForgotTitle")}
      <#elseif section="form">
        <form id="kc-reset-password-form" action="${url.loginAction}" class="${properties.kcFormClass!}" method="post">
          <div class="${properties.kcFormGroupClass!}">
            <div class="${properties.kcLabelWrapperClass!}">
              <label for="username" class="${properties.kcLabelClass!}">
                <#if !realm.loginWithEmailAllowed>
                  ${msg("usernameOrEmail")}
                  <#elseif !realm.registrationEmailAsUsername>
                    ${msg("email")}
                    <#else>
                      ${msg("username")}
                </#if>
              </label>
            </div>
            <div id='email-input-group' class="${properties.kcInputWrapperClass!}">
              <input type="text" id="username" name="username" data-email class="${properties.kcInputClass!}" placeholder="${msg('emailPlaceholder')}" value="${(auth.attemptedUsername!'')}" aria-invalid="<#if messagesPerField.existsError('username')>true</#if>" dir="ltr" />
              <span id="input-error-password-confirm" class="hide-ele" aria-live="polite">
                <i class="icon-info-hind ${properties.kcFormWarrningIcon!}" aria-hidden="true"></i>
                <p class="info-label">
                  ${msg("invalidEmail")}
                </p>
              </span>
              <div id="blank-space" class='blank-space-hind'></div>
            </div>
          </div>
          <div class="${properties.kcFormGroupActionClass!}">
            <input id='submit-sent-email' disabled class="${properties.kcButtonClass!} ${properties.kcButtonDisableClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("sentEmailPassword")}" />
            <a href="${url.loginUrl}" type='button'> <input class="${properties.kcButtonClass!} ${properties.kcFormButtonsBaseClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="button" value="${kcSanitize(msg("backToLogin"))?no_esc}" /> </a>
          </div>
        </form>
        <script type="module" src="${url.resourcesPath}/js/emailValidate.js"></script>
    </#if>
  </@layout.registrationLayout>