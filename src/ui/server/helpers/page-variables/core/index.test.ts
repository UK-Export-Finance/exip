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
import { ROUTES } from '../../../constants';

const { THERE_IS_A_PROBLEM } = ERROR_MESSAGES;

const { START: quoteStart } = ROUTES.QUOTE;
const { START: insuranceStart } = ROUTES.INSURANCE;

describe('server/helpers/page-variables/core', () => {
  const mock = {
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
      HEADING: 'Testing',
    },
    BACK_LINK: '/mock',
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
          FOOTER: INSURANCE_FOOTER,
          HEADER,
          LINKS,
          PHASE_BANNER,
          PRODUCT: { DESCRIPTION: PRODUCT_CONTENT_STRING.DESCRIPTION.APPLICATION },
        },
        BACK_LINK: mock.BACK_LINK,
        COOKIES_ROUTE: ROUTES.INSURANCE.COOKIES,
        FEEDBACK_ROUTE: ROUTES.INSURANCE.FEEDBACK,
        DATA_CY: {
          HEADING: 'heading',
          BACK_LINK: 'back-link',
        },
        START_ROUTE: insuranceStart,
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
          FOOTER: INSURANCE_FOOTER,
          HEADER,
          LINKS,
          PHASE_BANNER,
          PRODUCT: { DESCRIPTION: PRODUCT_CONTENT_STRING.DESCRIPTION.APPLICATION },
        },
        BACK_LINK: mock.BACK_LINK,
        COOKIES_ROUTE: ROUTES.INSURANCE.COOKIES,
        DATA_CY: {
          HEADING: 'heading',
          BACK_LINK: 'back-link',
        },
        FEEDBACK_ROUTE: ROUTES.INSURANCE.FEEDBACK,
        START_ROUTE: insuranceStart,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when ORIGINAL_URL does NOT contain "insurance"', () => {
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
          FOOTER: QUOTE_FOOTER,
          HEADER,
          LINKS,
          PHASE_BANNER,
          PRODUCT: { DESCRIPTION: PRODUCT_CONTENT_STRING.DESCRIPTION.QUOTE },
        },
        BACK_LINK: mock.BACK_LINK,
        COOKIES_ROUTE: ROUTES.COOKIES,
        DATA_CY: {
          HEADING: 'heading',
          BACK_LINK: 'back-link',
        },
        FEEDBACK_ROUTE: LINKS.EXTERNAL.FEEDBACK,
        START_ROUTE: quoteStart,
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
          FOOTER: QUOTE_FOOTER,
          HEADER,
          LINKS,
          PHASE_BANNER,
          PRODUCT: { DESCRIPTION: PRODUCT_CONTENT_STRING.DESCRIPTION.GENERIC },
        },
        BACK_LINK: mock.BACK_LINK,
        COOKIES_ROUTE: ROUTES.COOKIES,
        DATA_CY: {
          HEADING: 'heading',
          BACK_LINK: 'back-link',
        },
        FEEDBACK_ROUTE: LINKS.EXTERNAL.FEEDBACK,
        START_ROUTE: quoteStart,
      };

      expect(result).toEqual(expected);
    });
  });
});
