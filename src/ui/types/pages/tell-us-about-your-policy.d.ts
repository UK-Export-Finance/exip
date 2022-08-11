type TellUsAboutPolicyPageVariablesContentStrings = {
  PRODUCT: object;
  FOOTER: object;
  BUTTONS: object;
  PAGE_TITLE?: string;
  HEADING?: string;
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
}

export { TellUsAboutPolicyPageVariablesContentStrings, TellUsAboutPolicyPageVariablesFields, TellUsAboutPolicyPageVariables };
