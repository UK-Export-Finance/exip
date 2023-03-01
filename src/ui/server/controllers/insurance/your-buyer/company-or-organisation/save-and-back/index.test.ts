import { Request, Response } from '../../../../../../types';
import { post } from '.';
import { FIELD_IDS, ROUTES } from '../../../../../constants';
import { mockReq, mockRes, mockApplication, mockBuyer } from '../../../../../test-mocks';
import mapAndSave from '../../map-and-save';

const {
  COMPANY_OR_ORGANISATION: { NAME },
} = FIELD_IDS.INSURANCE.YOUR_BUYER;

const { INSURANCE_ROOT, ALL_SECTIONS } = ROUTES.INSURANCE;

describe('controllers/insurance/your-buyer/company-or-organisation/save-and-back', () => {
  let req: Request;
  let res: Response;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;

    mapAndSave.buyer = updateMapAndSave;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('post - save and back', () => {
    const validBody = mockBuyer;

    describe('when there are no validation errors', () => {
      it('should redirect to all sections page', async () => {
        req.body = validBody;

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
      });

      it('should call mapAndSave.buyer once', async () => {
        req.body = validBody;

        await post(req, res);

        expect(updateMapAndSave).toHaveBeenCalledTimes(1);
      });
    });

    describe('when there are validation errors', () => {
      it('should redirect to all sections page', async () => {
        req.body = {
          [NAME]: 'Test',
        };

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
      });

      it('should call mapAndSave.buyer once', async () => {
        req.body = {
          [NAME]: 'Test',
        };

        await post(req, res);

        expect(updateMapAndSave).toHaveBeenCalledTimes(1);
      });
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

    describe('when mapAndSave.broker fails', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
        updateMapAndSave = jest.fn(() => Promise.reject());
        mapAndSave.buyer = updateMapAndSave;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
