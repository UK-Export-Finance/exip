import { PAGE_VARIABLES, TEMPLATE, mapAnswer, mapSubmittedAnswer, get, post } from '.';
import { ERROR_MESSAGES, PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/page-variables/single-input/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import generateValidationErrors from '../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/quote/buyer-body', () => {
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

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: PAGE_VARIABLES.FIELD_ID,
        PAGE_CONTENT_STRINGS: PAGES.QUOTE.BUYER_BODY,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.QUOTE.BUYER_BODY);
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
        ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
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
      it('should render template with validation errors', async () => {
        await post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
          userName: getUserNameFromSession(req.session.user),
          validationErrors: generateValidationErrors(req.body, PAGE_VARIABLES.FIELD_ID, ERROR_MESSAGES.ELIGIBILITY[PAGE_VARIABLES.FIELD_ID]),
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

        expect(mockFlash.mock.calls[0]).toEqual(['previousRoute', ROUTES.QUOTE.BUYER_BODY]);

        const { GET_A_QUOTE_BY_EMAIL } = PAGES.QUOTE;
        const { REASON } = GET_A_QUOTE_BY_EMAIL;

        expect(mockFlash.mock.calls[1]).toEqual(['exitReason', REASON.BUYER_BODY]);
        expect(mockFlash.mock.calls[2]).toEqual(['exitDescription', REASON.BUYER_BODY_DESCRIPTION]);
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

      it('should update the session with submitted data, popluated with mapped buyer body answer', async () => {
        await post(req, res);

        const expectedMappedAnswer = mapAnswer(req.body[PAGE_VARIABLES.FIELD_ID]);

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
