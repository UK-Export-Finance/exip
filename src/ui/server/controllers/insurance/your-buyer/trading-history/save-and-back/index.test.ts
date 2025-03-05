import { FIELD_ID } from '..';
import { post } from '.';
import { ROUTES } from '../../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../validation';
import mapAndSave from '../../map-and-save/buyer-trading-history';
import { Request, ResponseInsurance } from '../../../../../../types';
import { mockReq, mockResInsurance, mockSpyPromiseRejection, referenceNumber } from '../../../../../test-mocks';

const { OUTSTANDING_PAYMENTS, FAILED_PAYMENTS, TOTAL_AMOUNT_OVERDUE } = INSURANCE_FIELD_IDS.YOUR_BUYER;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/your-buyer/trading-history/save-and-back', () => {
  let req: Request;
  let res: ResponseInsurance;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();

    mapAndSave.buyerTradingHistory = updateMapAndSave;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const validBody = {
    [OUTSTANDING_PAYMENTS]: 'true',
    [FAILED_PAYMENTS]: 'false',
  };

  describe('when there are no validation errors', () => {
    it('should redirect to all sections page', async () => {
      req.body = validBody;

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.buyerTradingHistory once with data from constructPayload function', async () => {
      req.body = validBody;

      await post(req, res);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);

      const payload = constructPayload(req.body, [FIELD_ID]);
      const validationErrors = generateValidationErrors(payload);

      expect(updateMapAndSave).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
    });
  });

  describe('when there are validation errors', () => {
    it('should redirect to all sections page', async () => {
      req.body = validBody;

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.yourBuyer once with data from constructPayload function', async () => {
      req.body = {
        ...validBody,
        [TOTAL_AMOUNT_OVERDUE]: '2.5',
      };

      await post(req, res);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);

      const payload = constructPayload(req.body, [FIELD_ID]);
      const validationErrors = generateValidationErrors(payload);

      expect(updateMapAndSave).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
    });
  });

  describe('when mapAndSave.buyerTradingHistory returns false', () => {
    beforeEach(() => {
      updateMapAndSave = jest.fn(() => Promise.resolve(false));
      mapAndSave.buyerTradingHistory = updateMapAndSave;
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });

  describe('when mapAndSave.buyerTradingHistory fails', () => {
    beforeEach(() => {
      updateMapAndSave = mockSpyPromiseRejection;
      mapAndSave.buyerTradingHistory = updateMapAndSave;
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });
});
