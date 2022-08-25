import { PAGE_VARIABLES, mapAnswer, get, post } from '.';
import { PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/single-input-page-variables';
import generateValidationErrors from './validation';
import { updateSubmittedData } from '../../../helpers/update-submitted-data';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/buyer-body', () => {
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
        FIELD_ID: FIELD_IDS.VALID_BUYER_BODY,
        PAGE_CONTENT_STRINGS: PAGES.BUYER_BODY_PAGE,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
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

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...singleInputPageVariables(PAGE_VARIABLES),
        BACK_LINK: req.headers.referer,
        submittedValues: req.session.submittedData,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.BUYER_BODY, expectedVariables);
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.BUYER_BODY, {
          ...singleInputPageVariables(PAGE_VARIABLES),
          BACK_LINK: req.headers.referer,
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when the submitted answer is `yes`', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.VALID_BUYER_BODY] = 'true';
      });

      it('should add previousRoute, exitReason and exitDescription to req.flash', async () => {
        await post(req, res);

        expect(mockFlash).toHaveBeenCalledTimes(3);

        expect(mockFlash.mock.calls[0]).toEqual(['previousRoute', ROUTES.QUOTE.BUYER_BODY]);

        const { GET_A_QUOTE_BY_EMAIL_PAGE } = PAGES;
        const { REASON } = GET_A_QUOTE_BY_EMAIL_PAGE;

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
        [FIELD_IDS.VALID_BUYER_BODY]: 'false',
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data, popluated with mapped buyer body answer', async () => {
        await post(req, res);

        const expectedMappedAnswer = mapAnswer(req.body[FIELD_IDS.VALID_BUYER_BODY]);

        const expected = updateSubmittedData({ [FIELD_IDS.VALID_BUYER_BODY]: expectedMappedAnswer }, req.session.submittedData);

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.QUOTE.COMPANY_BASED}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.COMPANY_BASED);
      });
    });
  });
});
