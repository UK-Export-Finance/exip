import { FIELD_ID, PAGE_VARIABLES, HTML_FLAGS, TEMPLATE, mapAnswer, mapSubmittedAnswer, get, post } from '.';
import { ERROR_MESSAGES, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/page-variables/single-input/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import constructPayload from '../../../helpers/construct-payload';
import generateValidationErrors from '../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

const {
  SHARED_PAGES,
  PARTIALS: {
    QUOTE: { TYPE_OF_BUYER },
  },
} = TEMPLATES;

describe('controllers/quote/type-of-buyer', () => {
  let req: Request;
  let res: Response;

  const mockFlash = jest.fn();

  beforeEach(() => {
    req = mockReq();
    req.flash = mockFlash;

    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = FIELD_IDS.ELIGIBILITY.VALID_TYPE_OF_BUYER;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: PAGE_VARIABLES.FIELD_ID,
        PAGE_CONTENT_STRINGS: PAGES.QUOTE.TYPE_OF_BUYER,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have correct properties', () => {
      const expected = {
        CUSTOM_CONTENT_HTML: TYPE_OF_BUYER.CUSTOM_CONTENT_HTML,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('mapAnswer', () => {
    describe('when the answer is `false`', () => {
      it('should return true', () => {
        const result = mapAnswer('false');

        expect(result).toEqual(true);
      });
    });

    describe('when the answer is `true`', () => {
      it('should return false', () => {
        const result = mapAnswer('true');

        expect(result).toEqual(false);
      });
    });
  });

  describe('mapSubmittedAnswer', () => {
    describe('when the submitted answer is false', () => {
      it('should return true', () => {
        const result = mapSubmittedAnswer(false);

        expect(result).toEqual(true);
      });
    });

    describe('when the submitted answer is true', () => {
      it('should return false', () => {
        const result = mapSubmittedAnswer(true);

        expect(result).toEqual(false);
      });
    });

    describe('when is no submitted answer', () => {
      it('should return null', () => {
        const result = mapSubmittedAnswer();

        expect(result).toEqual(null);
      });
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl, HTML_FLAGS }),
        userName: getUserNameFromSession(req.session.user),
        submittedValues: {
          ...req.session.submittedData.quoteEligibility,
          [PAGE_VARIABLES.FIELD_ID]: mapSubmittedAnswer(req.session.submittedData.quoteEligibility[PAGE_VARIABLES.FIELD_ID]),
        },
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl, HTML_FLAGS }),
          userName: getUserNameFromSession(req.session.user),
          validationErrors: generateValidationErrors(payload, PAGE_VARIABLES.FIELD_ID, ERROR_MESSAGES.ELIGIBILITY[PAGE_VARIABLES.FIELD_ID]),
        });
      });
    });

    describe('when the submitted answer is `yes`', () => {
      beforeEach(() => {
        req.body[PAGE_VARIABLES.FIELD_ID] = 'true';
      });

      it('should add previousRoute, exitReason and exitDescription to req.flash', async () => {
        await post(req, res);

        expect(mockFlash).toHaveBeenCalledTimes(3);

        expect(mockFlash.mock.calls[0]).toEqual(['previousRoute', ROUTES.QUOTE.TYPE_OF_BUYER]);

        const { GET_A_QUOTE_BY_EMAIL } = PAGES.QUOTE;
        const { REASON } = GET_A_QUOTE_BY_EMAIL;

        expect(mockFlash.mock.calls[1]).toEqual(['exitReason', REASON.TYPE_OF_BUYER]);
        expect(mockFlash.mock.calls[2]).toEqual(['exitDescription', REASON.TYPE_OF_BUYER_DESCRIPTION]);
      });

      it(`should redirect to ${ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL);
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [PAGE_VARIABLES.FIELD_ID]: 'false',
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data, populated with mapped type of buyer answer', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const expectedMappedAnswer = mapAnswer(payload[PAGE_VARIABLES.FIELD_ID]);

        const expected = updateSubmittedData({ [PAGE_VARIABLES.FIELD_ID]: expectedMappedAnswer }, req.session.submittedData.quoteEligibility);

        expect(req.session.submittedData.quoteEligibility).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.QUOTE.EXPORTER_LOCATION}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.EXPORTER_LOCATION);
      });
    });
  });
});
