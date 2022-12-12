import { BUTTONS, COOKIES_CONSENT, FIELDS, FOOTER, LINKS, PRODUCT } from '../../content-strings';

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
  BUTTONS: object;
  COOKIES_CONSENT: object;
  FOOTER: object;
  LINKS: object;
  PRODUCT: object;
}

interface PageVariables {
  CONTENT_STRINGS: PageVariablesContentStrings;
  FIELD_ID: string;
  FIELD_LABEL?: string;
  FIELD_HINT?: string | object;
  BACK_LINK?: string;
}

/**
 * singleInputPageVariables
 * Generate page variables for a page with a single input form
 * @param {String} Field/input ID
 * @param {Object} Page content strings bespoke to the page
 * @param {String} Link to the previous page
 * @returns {Object} Common page content strings combined with field specifics
 */
const singleInputPageVariables = ({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK }: SingleInputPageVariables) => {
  const pageVariables: PageVariables = {
    CONTENT_STRINGS: {
      ...PAGE_CONTENT_STRINGS,
      BUTTONS,
      COOKIES_CONSENT,
      FOOTER,
      LINKS,
      PRODUCT,
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
