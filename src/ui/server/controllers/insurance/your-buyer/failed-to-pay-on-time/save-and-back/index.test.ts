import { FIELD_ID } from '..';
import { post } from '.';
import { ROUTES } from '../../../../../constants';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../validation';
import mapAndSave from '../../map-and-save/buyer-trading-history';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockSpyPromiseRejection } from '../../../../../test-mocks';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/your-buyer/failed-to-pay-on-time/save-and-back', () => {
  let req: Request;
  let res: Response;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    mapAndSave.buyerTradingHistory = updateMapAndSave;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const validBody = {
    [FIELD_ID]: 'true',
  };

  describe('when there are no validation errors', () => {
    it('should redirect to all sections page', async () => {
      req.body = validBody;

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
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

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.yourBuyer once with data from constructPayload function', async () => {
      req.body = {
        ...validBody,
        [FIELD_ID]: '2.5',
      };

      await post(req, res);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);

      const payload = constructPayload(req.body, [FIELD_ID]);
      const validationErrors = generateValidationErrors(payload);

      expect(updateMapAndSave).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
    });
  });

  describe('when there is no application', () => {
    beforeEach(() => {
      delete res.locals.application;
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
      post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });

  describe('when mapAndSave.buyerTradingHistory returns false', () => {
    beforeEach(() => {
      res.locals = mockRes().locals;
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
      res.locals = mockRes().locals;
      updateMapAndSave = mockSpyPromiseRejection;
      mapAndSave.buyerTradingHistory = updateMapAndSave;
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });
});
