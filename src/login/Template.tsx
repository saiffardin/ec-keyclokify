import { DetailedHTMLProps, HTMLAttributes, useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";

import companyLogo from "./assets/company-logo.png";
import { getCustomizedFeedBackTxt } from "../custom-utils/getCustomizedFeedBackTxt";
import { ENGLISH } from "../custom-utils/keycloak-feedback-text";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    socialProvidersNode = null,
    infoNode = null,
    documentTitle,
    bodyClassName,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children
  } = props;

  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

  const { msg, msgStr } = i18n;

  const { auth, url, message, isAppInitiatedAction } = kcContext;

  useEffect(() => {
    document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
  }, []);

  useSetClassName({
    qualifiedName: "html",
    className: kcClsx("kcHtmlClass")
  });

  useSetClassName({
    qualifiedName: "body",
    className: bodyClassName ?? kcClsx("kcBodyClass")
  });

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

  if (!isReadyToRender) {
    return null;
  }

  const styleRenderWarning = {
    width: "400px",
    textAlign: "center",
    paddingLeft: "0",
    paddingRight: "0"
  } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

  const renderActivateAccountTxt = () => {
    return (
      <div style={styleRenderWarning} className={clsx("alert", `alert-success`)}>
        <span
          style={{
            fontSize: "19px",
            fontWeight: "600",
            color: "#101828"
          }}
        >
          {getCustomizedFeedBackTxt(ENGLISH.ACTIVATE_ACCOUNT)}
        </span>
      </div>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderWarning = (message: any) => {
    return message.summary === ENGLISH.ACTIVATE_ACCOUNT ? (
      renderActivateAccountTxt()
    ) : (
      <div style={styleRenderWarning} className={clsx("alert", `alert-${message.type}`)}>
        <span
          className="kc-feedback-text"
          dangerouslySetInnerHTML={{
            __html: getCustomizedFeedBackTxt(message.summary)
          }}
        />
      </div>
    );
  };

  return (
    <div className={kcClsx("kcLoginClass")}>
      <div className={kcClsx("kcFormCardClass")}>
        {/* 1 */}
        <div className="flex flex-col items-center pt-[30px]">
          <img src={companyLogo} className="w-[50%]" alt="companyLogo" />
          <div id="kc-header-wrapper" className={`${kcClsx("kcHeaderWrapperClass")} !p-0 text-center`}>
            <h1 style={{ fontSize: "30px", fontWeight: "600" }}>বাংলাদেশ নির্বাচন কমিশন</h1>
            <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Bangladesh Election Commission</h3>
          </div>
        </div>

        {/* 3 */}
        <div id="kc-content">
          <div id="kc-content-wrapper">
            {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
            {displayMessage &&
              message !== undefined &&
              (message.type !== "warning" || !isAppInitiatedAction) &&
              // <div className={clsx(`alert-${message.type}`, kcClsx("kcAlertClass"), `pf-m-${message?.type === "error" ? "danger" : message.type}`)}>
              //   <div className="pf-c-alert__icon">
              //     {message.type === "success" && <span className={kcClsx("kcFeedbackSuccessIcon")}></span>}
              //     {message.type === "warning" && <span className={kcClsx("kcFeedbackWarningIcon")}></span>}
              //     {message.type === "error" && <span className={kcClsx("kcFeedbackErrorIcon")}></span>}
              //     {message.type === "info" && <span className={kcClsx("kcFeedbackInfoIcon")}></span>}
              //   </div>
              //   <span
              //     className={kcClsx("kcAlertTitleClass")}
              //     dangerouslySetInnerHTML={{
              //       __html: kcSanitize(message.summary)
              //     }}
              //   />
              // </div>

              renderWarning(message)}

            {children}

            {auth !== undefined && auth.showTryAnotherWayLink && (
              <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                  <input type="hidden" name="tryAnotherWay" value="on" />
                  <a
                    href="#"
                    id="try-another-way"
                    onClick={() => {
                      document.forms["kc-select-try-another-way-form" as never].submit();
                      return false;
                    }}
                  >
                    {msg("doTryAnotherWay")}
                  </a>
                </div>
              </form>
            )}

            {socialProvidersNode}

            {displayInfo && (
              <div id="kc-info" className={kcClsx("kcSignUpClass")}>
                <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")}>
                  {infoNode}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
