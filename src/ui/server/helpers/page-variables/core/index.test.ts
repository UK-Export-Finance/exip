import corePageVariables from '.';
import {
  BUTTONS,
  COOKIES_CONSENT,
  HEADER,
  QUOTE_FOOTER,
  INSURANCE_FOOTER,
  PHASE_BANNER,
  LINKS,
  PRODUCT as PRODUCT_CONTENT_STRING,
} from '../../../content-strings';
import { ROUTES } from '../../../constants';

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
          HEADER,
          FOOTER: INSURANCE_FOOTER,
          LINKS,
          PHASE_BANNER,
          PRODUCT: { DESCRIPTION: PRODUCT_CONTENT_STRING.DESCRIPTION.APPLICATION },
        },
        BACK_LINK: mock.BACK_LINK,
        START_ROUTE: insuranceStart,
        FEEDBACK_ROUTE: ROUTES.INSURANCE.FEEDBACK,
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
          HEADER,
          FOOTER: INSURANCE_FOOTER,
          LINKS,
          PHASE_BANNER,
          PRODUCT: { DESCRIPTION: PRODUCT_CONTENT_STRING.DESCRIPTION.APPLICATION },
        },
        BACK_LINK: mock.BACK_LINK,
        START_ROUTE: insuranceStart,
        FEEDBACK_ROUTE: ROUTES.INSURANCE.FEEDBACK,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when ORIGINAL_URL ddoes not contain "insurance"', () => {
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
          HEADER,
          FOOTER: QUOTE_FOOTER,
          LINKS,
          PHASE_BANNER,
          PRODUCT: { DESCRIPTION: PRODUCT_CONTENT_STRING.DESCRIPTION.QUOTE },
        },
        BACK_LINK: mock.BACK_LINK,
        START_ROUTE: quoteStart,
        FEEDBACK_ROUTE: LINKS.EXTERNAL.FEEDBACK,
      };

      expect(result).toEqual(expected);
    });
  });
});
