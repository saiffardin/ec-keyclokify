import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import "./login.css";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes
  });

  const { social, realm, url, usernameHidden, login, auth, messagesPerField } = kcContext;

  const { msg } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  return (
    <div className="login-parent">
      <div className="login-static-content">
        <div className="logo-container"></div>
      </div>

      <div className="login-form-wrapper">
        <Template
          kcContext={kcContext}
          i18n={i18n}
          doUseDefaultCss={doUseDefaultCss}
          classes={classes}
          displayMessage={!messagesPerField.existsError("username", "password")}
          headerNode={msg("loginAccountTitle")}
          // displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
          /*
        infoNode={
          <div id="kc-registration-container">
            <div id="kc-registration">
              <span>
                {msg("noAccount")}{" "}
                <a tabIndex={8} href={url.registrationUrl}>
                  {msg("doRegister")}
                </a>
              </span>
            </div>
          </div>
        }
        */

          socialProvidersNode={
            <>
              {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                  <hr />
                  <h2>{msg("identity-provider-login-label")}</h2>
                  <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                    {social.providers.map((...[p, , providers]) => (
                      <li key={p.alias}>
                        <a
                          id={`social-${p.alias}`}
                          className={kcClsx("kcFormSocialAccountListButtonClass", providers.length > 3 && "kcFormSocialAccountGridItem")}
                          type="button"
                          href={p.loginUrl}
                        >
                          {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                          <span
                            className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}
                            dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                          ></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          }
        >
          <div id="kc-form">
            <div id="kc-form-wrapper">
              {realm.password && (
                <form
                  id="kc-form-login"
                  onSubmit={() => {
                    setIsLoginButtonDisabled(true);
                    return true;
                  }}
                  action={url.loginAction}
                  method="post"
                >
                  {/* 1 username */}
                  <div className={kcClsx("kcFormGroupClass")}>
                    <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                      ইউজার আইডিঃ
                    </label>
                    <input
                      tabIndex={2}
                      id="username"
                      className={kcClsx("kcInputClass")}
                      name="username"
                      defaultValue={login.username ?? ""}
                      type="text"
                      autoFocus
                      autoComplete="username"
                      aria-invalid={messagesPerField.existsError("username", "password")}
                    />
                    {messagesPerField.existsError("username", "password") && (
                      <span
                        id="input-error"
                        className={kcClsx("kcInputErrorMessageClass")}
                        aria-live="polite"
                        dangerouslySetInnerHTML={{
                          __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                        }}
                      />
                    )}
                  </div>

                  {/* 2 password */}
                  <div className={kcClsx("kcFormGroupClass")}>
                    <label htmlFor="password" className={kcClsx("kcLabelClass")}>
                      পাসওয়ার্ডঃ
                    </label>

                    <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                      <input
                        tabIndex={3}
                        id="password"
                        className={kcClsx("kcInputClass")}
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        aria-invalid={messagesPerField.existsError("username", "password")}
                      />
                    </PasswordWrapper>
                    {usernameHidden && messagesPerField.existsError("username", "password") && (
                      <span
                        id="input-error"
                        className={kcClsx("kcInputErrorMessageClass")}
                        aria-live="polite"
                        dangerouslySetInnerHTML={{
                          __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                        }}
                      />
                    )}
                  </div>

                  {/* 3 remember me & forgot password */}
                  {/* <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                    <div id="kc-form-options">
                      {realm.rememberMe && !usernameHidden && (
                        <div className="checkbox">
                          <label>
                            <input tabIndex={5} id="rememberMe" name="rememberMe" type="checkbox" defaultChecked={!!login.rememberMe} />{" "}
                            {msg("rememberMe")}
                          </label>
                        </div>
                      )}
                    </div>
                    <div className={kcClsx("kcFormOptionsWrapperClass")}>
                      {realm.resetPasswordAllowed && (
                        <span>
                          <a tabIndex={6} href={url.loginResetCredentialsUrl}>
                            পাসওয়ার্ড ভুলে গেছেন?
                          </a>
                        </span>
                      )}
                    </div>
                  </div> */}

                  {/* 4 */}
                  <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                    <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                    <input
                      tabIndex={7}
                      disabled={isLoginButtonDisabled}
                      className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                      name="login"
                      id="kc-login"
                      type="submit"
                      value="লগইন করুন"
                    />
                  </div>
                </form>
              )}
            </div>
          </div>
        </Template>
      </div>
    </div>
  );
}

function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
  const { kcClsx, children } = props;

  return <div className={kcClsx("kcInputGroup")}>{children}</div>;
}
