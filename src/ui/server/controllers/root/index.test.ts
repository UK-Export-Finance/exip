import get from '.';
import { mockReq, mockRes } from '../../test-mocks';
import { FIELD_IDS, ROUTES } from '../../constants';
import { Request, Response } from '../../../types';

const {
  ELIGIBILITY: { CREDIT_PERIOD },
} = FIELD_IDS;

describe('controllers/root', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    it('should add empty submittedData structure to the session', () => {
      req.session = {
        submittedData: {
          quoteEligibility: {
            [CREDIT_PERIOD]: 1,
          },
          insuranceEligibility: {
            [FIELD_IDS.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER]: true,
          },
        },
      };

      get(req, res);

      expect(req.session.submittedData).toEqual({
        quoteEligibility: {},
        insuranceEligibility: {},
      });
    });

    it(`should redirect to ${ROUTES.QUOTE.BUYER_COUNTRY}`, () => {
      get(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.BUYER_COUNTRY);
    });
  });
});
