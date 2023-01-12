import { post } from '.';
import { ROUTES } from '../../../../../constants';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../../test-mocks';

const { INSURANCE_ROOT } = ROUTES.INSURANCE;
const {
  INSURANCE: { ALL_SECTIONS },
} = ROUTES;

describe('controllers/insurance/policy-and-export/check-your-answers/save-and-back', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it(`should redirect to ${ALL_SECTIONS}`, () => {
    post(req, res);

    const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`;

    expect(res.redirect).toHaveBeenCalledWith(expected);
  });
});
