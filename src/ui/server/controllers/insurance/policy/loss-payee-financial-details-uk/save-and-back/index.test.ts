import { post } from '.';
import { FIELD_IDS } from '..';
import { ROUTES } from '../../../../../constants';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../validation';
import mapAndSave from '../../map-and-save/loss-payee-financial-details-uk';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockApplication, mockLossPayeeFinancialDetailsUk } from '../../../../../test-mocks';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/policy/loss-payee-financial-details-uk/save-and-back', () => {
  let req: Request;
  let res: Response;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    mapAndSave.lossPayeeFinancialDetailsUk = updateMapAndSave;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const validBody = mockLossPayeeFinancialDetailsUk;

  describe('when there are no validation errors', () => {
    it('should redirect to all sections page', async () => {
      req.body = validBody;

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.lossPayeeFinancialDetailsUk once with data from constructPayload function', async () => {
      req.body = validBody;

      await post(req, res);

      const payload = constructPayload(req.body, FIELD_IDS);
      const validationErrors = generateValidationErrors(payload);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);

      expect(updateMapAndSave).toHaveBeenCalledWith(payload, mockApplication, validationErrors);
    });
  });

  describe('when there are validation errors', () => {
    const mockInvalidBody = {};

    it('should redirect to all sections page', async () => {
      req.body = mockInvalidBody;

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.lossPayeeFinancialDetailsUk once', async () => {
      req.body = mockInvalidBody;

      await post(req, res);

      const payload = constructPayload(req.body, FIELD_IDS);
      const validationErrors = generateValidationErrors(payload);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);

      expect(updateMapAndSave).toHaveBeenCalledWith(payload, mockApplication, validationErrors);
    });
  });

  describe('when there is no application', () => {
    beforeEach(() => {
      req.body = validBody;

      delete res.locals.application;
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });

  describe('api error handling', () => {
    describe('when mapAndSave.lossPayeeFinancialDetailsUk returns false', () => {
      beforeEach(() => {
        req.body = validBody;
        res.locals = mockRes().locals;
        mapAndSave.lossPayeeFinancialDetailsUk = jest.fn(() => Promise.resolve(false));
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.lossPayeeFinancialDetailsUk fails', () => {
      beforeEach(() => {
        req.body = validBody;
        res.locals = mockRes().locals;
        updateMapAndSave = jest.fn(() => Promise.reject(new Error('mock')));
        mapAndSave.lossPayeeFinancialDetailsUk = updateMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
