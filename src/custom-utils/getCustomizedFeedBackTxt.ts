import { BANGLA, ENGLISH } from "./keycloak-feedback-text";

export const getCustomizedFeedBackTxt = (feedback: string): string => {
  switch (feedback) {
    case ENGLISH.ACTIVATE_ACCOUNT:
      return BANGLA.ACTIVATE_ACCOUNT;
    case ENGLISH.LOGIN_TIMED_OUT:
      return BANGLA.LOGIN_TIMED_OUT;
    case ENGLISH.LOGIN_TIMED_OUT_2_SPACE:
      return BANGLA.LOGIN_TIMED_OUT;
    case ENGLISH.INVALID_USERNAME_PASSWORD:
      return BANGLA.INVALID_USERNAME_PASSWORD;

    default:
      console.log("ENGLISH:", ENGLISH);
      console.log("%ckc-feedback:", "color:red", feedback);
      return feedback + " (this message was overwrite in the theme)";
  }
};
