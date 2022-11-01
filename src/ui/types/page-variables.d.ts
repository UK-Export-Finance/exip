interface PageContentStrings {
  PAGE_TITLE: string;
}

interface PageVariablesContentStrings {
  BUTTONS: object;
  COOKIES_CONSENT: object;
  FOOTER: object;
  LINKS: object;
  PRODUCT: object;
}

interface CorePageVariablesInput {
  PAGE_CONTENT_STRINGS: PageContentStrings;
  BACK_LINK?: string;
}

interface CorePageVariables {
  CONTENT_STRINGS: PageVariablesContentStrings;
  BACK_LINK?: string;
}

interface SingleInputPageVariablesInput extends CorePageVariablesInput {
  FIELD_ID: string;
}

interface SingleInputPageVariables extends CorePageVariables {
  FIELD_ID: string;
  FIELD_LABEL?: string;
  FIELD_HINT?: string | object;
}

export { CorePageVariablesInput, CorePageVariables, PageContentStrings, PageVariablesContentStrings, SingleInputPageVariablesInput, SingleInputPageVariables };
