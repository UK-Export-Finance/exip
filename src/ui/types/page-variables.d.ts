interface PageContentStrings {
  PAGE_TITLE: string;
  HEADING_CAPTION?: string;
}

interface PageVariablesContentStrings {
  BUTTONS: object;
  COOKIES_CONSENT: object;
  HEADER: object;
  FOOTER: object;
  LINKS: object;
  PHASE_BANNER: object;
  PRODUCT: object;
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
}

interface CorePageVariables {
  CONTENT_STRINGS: PageVariablesContentStrings;
  BACK_LINK?: string;
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
