import { BUTTONS, FIELDS, FOOTER, LINKS, PRODUCT } from '../content-strings';

interface PageContentStrings {
  PAGE_TITLE: string;
  HEADING: string;
  FIELDS?: object;
  HINTS?: object;
  LINKS?: object;
}

interface SingleInputPageVariables {
  FIELD_ID: string;
  PAGE_CONTENT_STRINGS: PageContentStrings;
  BACK_LINK?: string;
}

interface PageVariablesContentStrings {
  PRODUCT: object;
  FOOTER: object;
  BUTTONS: object;
  LINKS: object;
}

interface PageVariables {
  CONTENT_STRINGS: PageVariablesContentStrings;
  FIELD_ID: string;
  FIELD_LABEL?: string;
  FIELD_HINT?: string | object;
  BACK_LINK?: string;
}

const singleInputPageVariables = ({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK }: SingleInputPageVariables) => {
  const pageVariables: PageVariables = {
    CONTENT_STRINGS: {
      ...PAGE_CONTENT_STRINGS,
      PRODUCT,
      FOOTER,
      BUTTONS,
      LINKS,
    },
    FIELD_ID,
    BACK_LINK,
  };

  const fieldStrings = FIELDS[FIELD_ID];

  if (fieldStrings) {
    pageVariables.FIELD_LABEL = fieldStrings.LABEL;
    pageVariables.FIELD_HINT = fieldStrings.HINT;
  }

  return pageVariables;
};

export default singleInputPageVariables;
