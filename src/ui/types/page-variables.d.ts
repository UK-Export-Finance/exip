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
  HAS_SAVE_AND_BACK?: boolean;
  CUSTOM_CONTENT_HTML?: string;
  CONDITIONAL_YES_HTML?: string;
  CONDITIONAL_NO_HTML?: string;
}

interface CorePageVariablesInput extends CorePageVariablesInitialInput {
  ORIGINAL_URL?: string;
  USE_GENERIC_HEADER?: boolean;
}

interface CorePageVariables {
  CONTENT_STRINGS: PageVariablesContentStrings;
  BACK_LINK?: string;
  START_ROUTE?: string;
  FEEDBACK_ROUTE?: string;
  DATA_CY: PageVariablesDataCy;
  HAS_SAVE_AND_BACK?: boolean;
  CUSTOM_CONTENT_HTML?: string;
  CONDITIONAL_YES_HTML?: string;
  CONDITIONAL_NO_HTML?: string;
}

interface SectionStartPageVariables extends CorePageVariables {
  ALL_SECTIONS_URL: string;
  START_NOW_URL: string;
}

interface SectionStartPageVariablesInput extends CorePageVariablesInitialInput {
  REFERENCE_NUMBER: number;
  START_NOW_ROUTE: string;
}

interface SingleInputPageVariablesInitialInput {
  PAGE_CONTENT_STRINGS: PageContentStrings;
  BACK_LINK?: string;
  FIELD_ID: string;
  ORIGINAL_URL?: string;
  HAS_SAVE_AND_BACK?: boolean;
  CUSTOM_CONTENT_HTML?: string;
  CONDITIONAL_YES_HTML?: string;
  CONDITIONAL_NO_HTML?: string;
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
  SectionStartPageVariables,
  SectionStartPageVariablesInput,
  SingleInputPageVariablesInitialInput,
  SingleInputPageVariablesInput,
  SingleInputPageVariables,
};
