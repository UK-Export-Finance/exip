import corePageVariables from '.';
import {
  BUTTONS,
  COOKIES_CONSENT,
  ERROR_MESSAGES,
  HEADER,
  QUOTE_FOOTER,
  INSURANCE_FOOTER,
  PHASE_BANNER,
  LINKS,
  PRODUCT as PRODUCT_CONTENT_STRING,
} from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';

const { THERE_IS_A_PROBLEM } = ERROR_MESSAGES;

const { START: quoteStart } = ROUTES.QUOTE;
const { START: insuranceStart } = ROUTES.INSURANCE;

const { CONDITIONAL_YES_HTML } = TEMPLATES.PARTIALS.INSURANCE.BUYER.CONNECTION_WITH_BUYER;

describe('server/helpers/page-variables/core', () => {
  const mock = {
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
      HEADING: 'Testing',
    },
    BACK_LINK: '/mock',
  };

  const HTML_FLAGS = {
    CONDITIONAL_YES_HTML,
    HORIZONTAL_RADIOS: true,
  };

  describe('when ORIGINAL_URL is undefined', () => {
    it('should return an object with provided data and additional content strings, footer, startRoute and product for insurance', () => {
      const insuranceMock = {
        ...mock,
        ORIGINAL_URL: undefined,
      };

      const result = corePageVariables(insuranceMock);

      const expected = {
        CONTENT_STRINGS: {
          ...mock.PAGE_CONTENT_STRINGS,
          BUTTONS,
          COOKIES_CONSENT,
          ERROR_MESSAGES: { THERE_IS_A_PROBLEM },
          HEADER,
          FOOTER: INSURANCE_FOOTER,
          LINKS,
          PHASE_BANNER,
          PRODUCT: { DESCRIPTION: PRODUCT_CONTENT_STRING.DESCRIPTION.APPLICATION },
        },
        BACK_LINK: mock.BACK_LINK,
        START_ROUTE: insuranceStart,
        FEEDBACK_ROUTE: ROUTES.INSURANCE.FEEDBACK,
        DATA_CY: {
          HEADING: 'heading',
          BACK_LINK: 'back-link',
          INTRO: 'intro',
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when ORIGINAL_URL contains "insurance"', () => {
    it('should return an object with provided data and additional content strings, footer, startRoute and product for insurance', () => {
      const insuranceMock = {
        ...mock,
        ORIGINAL_URL: ROUTES.INSURANCE.APPLY_OFFLINE,
      };

      const result = corePageVariables(insuranceMock);

      const expected = {
        CONTENT_STRINGS: {
          ...mock.PAGE_CONTENT_STRINGS,
          BUTTONS,
          COOKIES_CONSENT,
          ERROR_MESSAGES: { THERE_IS_A_PROBLEM },
          HEADER,
          FOOTER: INSURANCE_FOOTER,
          LINKS,
          PHASE_BANNER,
          PRODUCT: { DESCRIPTION: PRODUCT_CONTENT_STRING.DESCRIPTION.APPLICATION },
        },
        BACK_LINK: mock.BACK_LINK,
        START_ROUTE: insuranceStart,
        FEEDBACK_ROUTE: ROUTES.INSURANCE.FEEDBACK,
        DATA_CY: {
          HEADING: 'heading',
          BACK_LINK: 'back-link',
          INTRO: 'intro',
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when ORIGINAL_URL does not contain "insurance"', () => {
    it('should return an object with provided data and additional content strings, footer, startRoute and product for quote', () => {
      const quoteMock = {
        ...mock,
        ORIGINAL_URL: ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL,
      };

      const result = corePageVariables(quoteMock);

      const expected = {
        CONTENT_STRINGS: {
          ...mock.PAGE_CONTENT_STRINGS,
          BUTTONS,
          COOKIES_CONSENT,
          ERROR_MESSAGES: { THERE_IS_A_PROBLEM },
          HEADER,
          FOOTER: QUOTE_FOOTER,
          LINKS,
          PHASE_BANNER,
          PRODUCT: { DESCRIPTION: PRODUCT_CONTENT_STRING.DESCRIPTION.QUOTE },
        },
        BACK_LINK: mock.BACK_LINK,
        START_ROUTE: quoteStart,
        FEEDBACK_ROUTE: LINKS.EXTERNAL.FEEDBACK,
        DATA_CY: {
          HEADING: 'heading',
          BACK_LINK: 'back-link',
          INTRO: 'intro',
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when USE_GENERIC_HEADER is true', () => {
    it('should return an object with provided data and product set to GENERIC', () => {
      const quoteMock = {
        ...mock,
        ORIGINAL_URL: ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL,
        USE_GENERIC_HEADER: true,
      };

      const result = corePageVariables(quoteMock);

      const expected = {
        CONTENT_STRINGS: {
          ...mock.PAGE_CONTENT_STRINGS,
          BUTTONS,
          COOKIES_CONSENT,
          ERROR_MESSAGES: { THERE_IS_A_PROBLEM },
          HEADER,
          FOOTER: QUOTE_FOOTER,
          LINKS,
          PHASE_BANNER,
          PRODUCT: { DESCRIPTION: PRODUCT_CONTENT_STRING.DESCRIPTION.GENERIC },
        },
        BACK_LINK: mock.BACK_LINK,
        START_ROUTE: quoteStart,
        FEEDBACK_ROUTE: LINKS.EXTERNAL.FEEDBACK,
        DATA_CY: {
          HEADING: 'heading',
          BACK_LINK: 'back-link',
          INTRO: 'intro',
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when HTML_FLAGS are provided', () => {
    it('should return an object with provided data and HTML_FLAGS', () => {
      const quoteMock = {
        ...mock,
        HTML_FLAGS,
      };

      const result = corePageVariables(quoteMock);

      const expected = {
        CONTENT_STRINGS: {
          ...mock.PAGE_CONTENT_STRINGS,
          BUTTONS,
          COOKIES_CONSENT,
          ERROR_MESSAGES: { THERE_IS_A_PROBLEM },
          HEADER,
          FOOTER: INSURANCE_FOOTER,
          LINKS,
          PHASE_BANNER,
          PRODUCT: { DESCRIPTION: PRODUCT_CONTENT_STRING.DESCRIPTION.APPLICATION },
        },
        BACK_LINK: mock.BACK_LINK,
        START_ROUTE: insuranceStart,
        FEEDBACK_ROUTE: ROUTES.INSURANCE.FEEDBACK,
        DATA_CY: {
          HEADING: 'heading',
          BACK_LINK: 'back-link',
          INTRO: 'intro',
        },
        ...HTML_FLAGS,
      };

      expect(result).toEqual(expected);
    });
  });
});
