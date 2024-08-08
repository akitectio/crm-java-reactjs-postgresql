<#import "template.ftl" as layout>
  <@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <#if section="header">
      ${msg("loginAccountTitle")}
      <#elseif section="form">
        <div id="kc-form">
          <div id="kc-form-wrapper">
            <#if realm.password>
              <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                <#-- Display username -->
                  <#if !usernameHidden??>
                    <div class="${properties.kcFormGroupClass!}">
                      <label for="username"
                        class="${properties.kcLabelClass!}">
                        <#if !realm.loginWithEmailAllowed>
                          ${msg("usernameOrEmail")}
                          <#elseif !realm.registrationEmailAsUsername>
                            ${msg("username")}
                            <#else>
                              ${msg("username")}
                        </#if>
                      </label>
                      <input tabindex="1" id="username" class="${properties.kcInputClass!}" placeholder="${msg('usernamePlaceholder')}" name="username" value="${(login.username!'')}" type="text" autocomplete="off"
                        aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>" />
                      <div class='blank-space-hind'></div>
                      <#-- Display hind for asain pass -->
                        <#-- <#if messagesPerField.existsError('username','password')>
                          <span id="input-hind" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
                          </span>
                          <#else>
                            <div class='blank-space-hind'></div>
                  </#if> -->
          </div>
        </div>
    </#if>
    <#-- Display password -->
      <div class="${properties.kcFormGroupClass!}">
        <label for="password" class="${properties.kcLabelClass!}">
          ${msg("password")}
        </label>
        <div class="${properties.kcInputGroup!}" dir="ltr">
          <input tabindex="2" id="password" class="${properties.kcInputChildClass!}" placeholder="${msg('passwordPlaceholder')}" name="password" type="password" autocomplete="off"
            aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>" />
          <button class="${properties.kcFormPasswordVisibilityButtonClass!}" type="button" aria-label="${msg("showPassword")}"
            aria-controls="password" data-password-toggle tabindex="3"
            data-icon-show="${properties.kcFormPasswordVisibilityIconShow!}" data-icon-hide="${properties.kcFormPasswordVisibilityIconHide!}"
            data-label-show="${msg('showPassword')}" data-label-hide="${msg('hidePassword')}">
            <i class="${properties.kcFormPasswordVisibilityIconShow!}" aria-hidden="true"></i>
          </button>
        </div>
        <#if usernameHidden?? && messagesPerField.existsError('username','password')>
          <span id="input-error" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
            ${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
          </span>
        </#if>
        <script type="module" src="${url.resourcesPath}/js/passwordVisibility.js"></script>
        <#-- Display checkbox remember -->
          <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!}">
            <div class="${properties.kcFormOptionsWrapperClass!}">
              <#if realm.resetPasswordAllowed>
                <span><a class="${properties.kcAchorForgotPassClass!}" tabindex="5" href="${url.loginResetCredentialsUrl}">
                    ${msg("doForgotPassword")}
                  </a></span>
              </#if>
            </div>
          </div>
      </div>
      <#-- Button submit -->
        <div id="kc-form-buttons" class="${properties.kcFormGroupClass!} ${properties.kcFormGroupActionClass!}">
          <#if realm.rememberMe && !usernameHidden??>
            <div class="checkbox">
              <label>
                <#if login.rememberMe??>
                  <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" checked>
                  ${msg("keepMeLoggedIn")}
                  <#else>
                    <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox">
                    ${msg("keepMeLoggedIn")}
                </#if>
              </label>
            </div>
          </#if>
          <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
          <input tabindex="4" class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" name="login" id="kc-login" type="submit" value="${msg("doLogIn")}" />
          <#-- Display error when login -->
            <#if messagesPerField.existsError('username','password')>
              <div id="input-error" class="${properties.kcSubmitErrorMessageClass!}" aria-live="polite">
                <i class="${properties.warrningIcon!}" aria-hidden="true"></i>
                ${msg("invalidSubmitMessage")}
              </div>
            </#if>
        </div>
        </form>
        </#if>
        </div>
        </div>
        <#elseif section="info">
          <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
            <div id="kc-registration-container">
              <div id="kc-registration" style="margin:0.5rem auto">
                <span>
                  <a type="button" class="pf-c-button btn-lg pf-m-link pf-m-block" tabindex="6" href="${url.registrationUrl}">
                    ${msg("doRegister")}
                  </a>
                </span>
              </div>
            </div>
          </#if>
          <#elseif section="socialProviders">
            <#if realm.password && social.providers??>
              <div id="kc-social-providers" class="${properties.kcFormSocialAccountSectionClass!}">
                <hr />
                <h4>
                  ${msg("identity-provider-login-label")}
                </h4>
                <ul class="${properties.kcFormSocialAccountListClass!}
<#if social.providers?size gt 3>
${properties.kcFormSocialAccountListGridClass!}
</#if>">
                  <#list social.providers as p>
                    <li>
                      <a id="social-${p.alias}" class="${properties.kcFormSocialAccountListButtonClass!}
<#if social.providers?size gt 3>
${properties.kcFormSocialAccountGridItem!}
</#if>"
                        type="button" href="${p.loginUrl}">
                        <#if p.iconClasses?has_content>
                          <i class="${properties.kcCommonLogoIdP!} ${p.iconClasses!}" aria-hidden="true"></i>
                          <span class="${properties.kcFormSocialAccountNameClass!} kc-social-icon-text">
                            ${p.displayName!}
                          </span>
                          <#else>
                            <span class="${properties.kcFormSocialAccountNameClass!}">
                              ${p.displayName!}
                            </span>
                        </#if>
                      </a>
                    </li>
                  </#list>
                </ul>
              </div>
            </#if>
            </#if>
  </@layout.registrationLayout>