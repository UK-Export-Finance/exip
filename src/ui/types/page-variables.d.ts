interface PageContentStrings {
  PAGE_TITLE: string;
  HEADING_CAPTION?: string;
}

interface PageVariablesContentStrings {
  BUTTONS: object;
  COOKIES_CONSENT: object;
  ERROR_MESSAGES: object;
  HEADER: object;
  FOOTER: object;
  LINKS: object;
  PHASE_BANNER: object;
  PRODUCT: object;
}

interface PageVariablesDataCy {
  HEADING: string;
  BACK_LINK: string;
}

interface CorePageVariablesInitialInput {
  PAGE_CONTENT_STRINGS: PageContentStrings;
  BACK_LINK?: string;
  START_ROUTE?: string;
  FEEDBACK_ROUTE?: string;
  ORIGINAL_URL?: string;
}

interface CorePageVariablesInput extends CorePageVariablesInitialInput {
  ORIGINAL_URL?: string;
  USE_GENERIC_HEADER?: boolean;
}

interface CorePageVariables {
  BACK_LINK?: string;
  CONTENT_STRINGS: PageVariablesContentStrings;
  COOKIES_ROUTE?: string;
  DATA_CY: PageVariablesDataCy;
  START_ROUTE?: string;
  FEEDBACK_ROUTE?: string;
}

interface SingleInputPageVariablesInitialInput {
  PAGE_CONTENT_STRINGS: PageContentStrings;
  BACK_LINK?: string;
  FIELD_ID: string;
  ORIGINAL_URL?: string;
}

interface SingleInputPageVariablesInput extends SingleInputPageVariablesInitialInput {
  FIELD_ID: string;
  FEEDBACK_ROUTE?: string;
}

interface SingleInputPageVariables extends CorePageVariables {
  FIELD_ID: string;
  FIELD_LABEL?: string;
  FIELD_HINT?: string | object;
}

export {
  CorePageVariablesInitialInput,
  CorePageVariablesInput,
  CorePageVariables,
  PageContentStrings,
  PageVariablesContentStrings,
  SingleInputPageVariablesInitialInput,
  SingleInputPageVariablesInput,
  SingleInputPageVariables,
};
