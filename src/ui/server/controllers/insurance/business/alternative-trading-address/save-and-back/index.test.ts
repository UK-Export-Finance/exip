import { post } from '.';
import constructPayload from '../../../../../helpers/construct-payload';
import { FIELD_IDS } from '..';
import { ROUTES } from '../../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../../constants/field-ids/insurance/business';
import { mockReq, mockRes, mockApplication } from '../../../../../test-mocks';
import mapAndSave from '../../map-and-save/company-different-trading-address';
import { Request, Response } from '../../../../../../types';

const {
  ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
} = BUSINESS_FIELD_IDS;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/business/alternative-trading-address/save-and-back', () => {
  let req: Request;
  let res: Response;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    mapAndSave.companyDifferentTradingAddress = updateMapAndSave;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const validBody = {
    [FULL_ADDRESS]: 'Mock address',
  };

  describe('when there are no validation errors', () => {
    it('should redirect to all sections page', async () => {
      req.body = validBody;

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.companyDifferentTradingAddress once with data from constructPayload', async () => {
      req.body = validBody;

      await post(req, res);

      const payload = constructPayload(req.body, FIELD_IDS);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);

      expect(updateMapAndSave).toHaveBeenCalledWith(payload, mockApplication, false);
    });
  });

  describe('when there are validation errors', () => {
    const invalidBody = {
      [FULL_ADDRESS]: '',
    };

    it('should redirect to all sections page', async () => {
      req.body = invalidBody;

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should not call mapAndSave.companyDifferentTradingAddress', async () => {
      req.body = invalidBody;

      await post(req, res);

      expect(updateMapAndSave).toHaveBeenCalledTimes(0);
    });
  });

  describe('when there is no application', () => {
    beforeEach(() => {
      req.body = validBody;
      delete res.locals.application;
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
      post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });

  describe('api error handling', () => {
    describe('when mapAndSave.companyDifferentTradingAddress returns false', () => {
      beforeEach(() => {
        req.body = validBody;
        res.locals = mockRes().locals;
        mapAndSave.companyDifferentTradingAddress = jest.fn(() => Promise.resolve(false));
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.companyDifferentTradingAddress fails', () => {
      beforeEach(() => {
        res.locals = mockRes().locals;
        req.body = validBody;
        updateMapAndSave = jest.fn(() => Promise.reject(new Error('mock')));
        mapAndSave.companyDifferentTradingAddress = updateMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
