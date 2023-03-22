import { Request, Response } from '../../../../../../types';
import { post } from '.';
import { ROUTES } from '../../../../../constants';
import { mockReq, mockRes, mockApplication } from '../../../../../test-mocks';

const { INSURANCE_ROOT, ALL_SECTIONS } = ROUTES.INSURANCE;

describe('controllers/insurance/check-your-answers/your-business/save-and-back', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('post - save and back', () => {
    it('should redirect to all sections page', async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
