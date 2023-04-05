import { TEMPLATE, get, post } from '.';
import { PAGES } from '../../../content-strings';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/insurance/start', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.START);
    });
  });

  describe('get', () => {
    it('should add an empty submittedData object to the session', () => {
      req.session = {
        submittedData: {
          quoteEligibility: {
            [FIELD_IDS.CREDIT_PERIOD]: 1,
          },
          insuranceEligibility: {
            [FIELD_IDS.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER]: true,
          },
        },
      };

      get(req, res);

      expect(req.session.submittedData).toEqual({
        quoteEligibility: {
          [FIELD_IDS.CREDIT_PERIOD]: 1,
        },
        insuranceEligibility: {},
      });
    });

    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.START,
          BACK_LINK: req.headers.referer,
        }),
        user: req.session.user,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });
  });

  describe('post', () => {
    it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE}`, () => {
      post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE);
    });
  });
});
