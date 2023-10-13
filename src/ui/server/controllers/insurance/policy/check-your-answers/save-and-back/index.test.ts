import { post } from '.';
import { ROUTES } from '../../../../../constants';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../../test-mocks';

const { INSURANCE_ROOT } = ROUTES.INSURANCE;
const {
  INSURANCE: { ALL_SECTIONS },
} = ROUTES;

describe('controllers/insurance/policy/check-your-answers/save-and-back', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

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
