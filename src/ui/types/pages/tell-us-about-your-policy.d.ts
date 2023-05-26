type TellUsAboutPolicyPageVariablesContentStrings = {
  BUTTONS: object;
  COOKIES_CONSENT: object;
  FOOTER: object;
  LINKS: object;
  PHASE_BANNER: object;
  PAGE_TITLE?: string;
  PRODUCT: object;
};

type TellUsAboutPolicyPageVariablesFields = {
  AMOUNT_CURRENCY: object;
  CONTRACT_VALUE?: object;
  CREDIT_PERIOD?: object;
  CURRENCY: object;
  PERCENTAGE_OF_COVER: object;
  MAX_AMOUNT_OWED?: object;
};

interface TellUsAboutPolicyPageVariables {
  CONTENT_STRINGS: TellUsAboutPolicyPageVariablesContentStrings;
  FIELDS: TellUsAboutPolicyPageVariablesFields;
  START_ROUTE: string;
  FEEDBACK_ROUTE: string;
  originalUrl?: string;
}

export { TellUsAboutPolicyPageVariablesContentStrings, TellUsAboutPolicyPageVariablesFields, TellUsAboutPolicyPageVariables };
