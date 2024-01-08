import { FIELD_ID, PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { ERROR_MESSAGES, PAGES, UK_GOODS_AND_SERVICES_DESCRIPTION } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/page-variables/single-input/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import constructPayload from '../../../helpers/construct-payload';
import generateValidationErrors from '../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import { Request, Response } from '../../../../types';
import { mockReq, mockRes } from '../../../test-mocks';

const {
  SHARED_PAGES,
  PARTIALS: {
    QUOTE: { UK_GOODS_OR_SERVICES },
  },
} = TEMPLATES;

describe('controllers/quote/uk-goods-or-services', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = FIELD_IDS.INSURANCE.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES,
        PAGE_CONTENT_STRINGS: {
          ...PAGES.UK_GOODS_OR_SERVICES,
          ...PAGES.QUOTE.UK_GOODS_OR_SERVICES,
          UK_GOODS_AND_SERVICES_DESCRIPTION,
        },
        CUSTOM_CONTENT_HTML: UK_GOODS_OR_SERVICES.CUSTOM_CONTENT_HTML,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(SHARED_PAGES.SINGLE_RADIO, {
        userName: getUserNameFromSession(req.session.user),
        ...singleInputPageVariables({ ...PAGE_VARIABLES, ORIGINAL_URL: req.originalUrl }),
        BACK_LINK: req.headers.referer,
        submittedValues: req.session.submittedData.quoteEligibility,
      });
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors from constructPayload function', () => {
        post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(res.render).toHaveBeenCalledWith(SHARED_PAGES.SINGLE_RADIO, {
          userName: getUserNameFromSession(req.session.user),
          ...singleInputPageVariables(PAGE_VARIABLES),
          BACK_LINK: req.headers.referer,
          validationErrors: generateValidationErrors(payload, PAGE_VARIABLES.FIELD_ID, ERROR_MESSAGES.ELIGIBILITY[PAGE_VARIABLES.FIELD_ID].IS_EMPTY),
        });
      });
    });

    describe('when the submitted answer is `false`', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES] = 'false';
      });

      it(`should redirect to ${ROUTES.QUOTE.CANNOT_APPLY}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CANNOT_APPLY);
      });

      it('should add previousRoute and exitReason to req.flash', () => {
        post(req, res);

        expect(req.flash).toHaveBeenCalledWith('previousRoute', ROUTES.QUOTE.UK_GOODS_OR_SERVICES);

        const expectedReason = PAGES.CANNOT_APPLY.REASON.NOT_ENOUGH_UK_GOODS_OR_SERVICES;
        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_IDS.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES]: 'true',
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data from constructPayload function', () => {
        post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const expected = updateSubmittedData(payload, req.session.submittedData.quoteEligibility);

        expect(req.session.submittedData.quoteEligibility).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.QUOTE.POLICY_TYPE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.POLICY_TYPE);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`, () => {
          req.originalUrl = 'mock/change';

          post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
        });
      });
    });
  });
});
