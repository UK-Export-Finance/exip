import { FIELD_IDS } from '..';
import { post } from '.';
import { ROUTES } from '../../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../validation';
import mapAndSave from '../../map-and-save/buyer-trading-history';
import { Request, Response } from '../../../../../../types';
import { EUR, mockReq, mockRes, mockSpyPromiseRejection, referenceNumber } from '../../../../../test-mocks';

const {
  CURRENCY: { CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/your-buyer/curreny-of-late-payments/save-and-back', () => {
  let req: Request;
  let res: Response;

  jest.mock('../../map-and-save/buyer-trading-history');

  let mapAndSaveSpy = jest.fn(() => Promise.resolve(true));

  const mockFormBody = {
    [CURRENCY_CODE]: EUR.isoCode,
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.body = mockFormBody;

    mapAndSave.buyerTradingHistory = mapAndSaveSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when the form has data', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      mapAndSaveSpy = jest.fn(() => Promise.resolve(true));
      mapAndSave.buyerTradingHistory = mapAndSaveSpy;
    });

    it('should call mapAndSave.buyerTradingHistory with data from constructPayload function, application and validationErrors', async () => {
      await post(req, res);

      const payload = constructPayload(req.body, FIELD_IDS);

      const validationErrors = generateValidationErrors(payload);

      expect(mapAndSave.buyerTradingHistory).toHaveBeenCalledTimes(1);
      expect(mapAndSave.buyerTradingHistory).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
    });

    it(`should redirect to ${ALL_SECTIONS}`, async () => {
      mapAndSave.buyerTradingHistory = mapAndSaveSpy;

      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });

  describe('when the form does not have any data', () => {
    it(`should redirect to ${ALL_SECTIONS}`, async () => {
      req.body = { _csrf: '1234' };

      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });

  describe('when there is no application', () => {
    beforeEach(() => {
      delete res.locals.application;
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });

  describe('api error handling', () => {
    describe('when mapAndSave.buyerTradingHistory returns false', () => {
      beforeEach(() => {
        res.locals = mockRes().locals;
        mapAndSaveSpy = jest.fn(() => Promise.resolve(false));
        mapAndSave.buyerTradingHistory = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.buyerTradingHistory fails', () => {
      beforeEach(() => {
        res.locals = mockRes().locals;
        mapAndSaveSpy = mockSpyPromiseRejection;
        mapAndSave.buyerTradingHistory = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
