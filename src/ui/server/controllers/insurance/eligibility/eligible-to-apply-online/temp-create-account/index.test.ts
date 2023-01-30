import { post } from '.';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { mockReq, mockRes } from '../../../../../test-mocks';
import { Request, Response } from '../../../../../../types';

describe('controllers/insurance/eligibility/eligible-to-apply-online/temp-create-account', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('post', () => {
    it(`should redirect to ${INSURANCE_ROUTES.ELIGIBILITY.ALREADY_HAVE_ACCOUNT}`, () => {
      post(req, res);

      const expected = `${INSURANCE_ROUTES.ELIGIBILITY.ALREADY_HAVE_ACCOUNT}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });
});
