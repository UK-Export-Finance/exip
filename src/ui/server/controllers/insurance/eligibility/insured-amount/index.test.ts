import { PAGE_VARIABLES, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/single-input-page-variables';
import generateValidationErrors from './validation';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes } from '../../../../test-mocks';

describe('controllers/insurance/eligibility/insured-amount', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_FOR_MORE_THAN_MAX_PERIOD,
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(
        TEMPLATES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT,
        singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
      );
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors', () => {
        post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT, {
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when submitted answer is true', () => {
      beforeEach(() => {
        req.body = {
          [FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_FOR_MORE_THAN_MAX_PERIOD]: 'true',
        };
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE);
      });

      it('should add exitReason to req.flash', async () => {
        await post(req, res);

        const expectedReason = PAGES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE.REASON.WANT_COVER_OVER_MAX_PERIOD;
        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_FOR_MORE_THAN_MAX_PERIOD]: 'false',
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.WANT_INSURANCE_OVER_MAX_PERIOD}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.WANT_INSURANCE_OVER_MAX_PERIOD);
      });
    });
  });
});
