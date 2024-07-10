import mapAndSave from '../../map-and-save/buyer-relationship';
import { FIELD_IDS } from '..';
import { post } from '.';
import { ROUTES } from '../../../../../constants';
import BUYER_FIELD_IDS from '../../../../../constants/field-ids/insurance/your-buyer';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../validation';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes } from '../../../../../test-mocks';

const { HAS_BUYER_FINANCIAL_ACCOUNTS } = BUYER_FIELD_IDS;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/your-buyer/buyer-financial-information/save-and-back', () => {
  let req: Request;
  let res: Response;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    mapAndSave.buyerRelationship = updateMapAndSave;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const validBody = {
    [HAS_BUYER_FINANCIAL_ACCOUNTS]: 'true',
  };

  describe('when there are no validation errors', () => {
    it('should redirect to all sections page', async () => {
      req.body = validBody;

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.buyerRelationship once with data from constructPayload function', async () => {
      req.body = validBody;

      await post(req, res);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);

      const payload = constructPayload(req.body, FIELD_IDS);
      const validationErrors = generateValidationErrors(payload);

      expect(updateMapAndSave).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
    });
  });

  describe('when there are validation errors', () => {
    it('should redirect to all sections page', async () => {
      req.body = {};

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.buyerRelationship once with data from constructPayload function', async () => {
      req.body = {
        [HAS_BUYER_FINANCIAL_ACCOUNTS]: '',
      };

      await post(req, res);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);

      const payload = constructPayload(req.body, FIELD_IDS);
      const validationErrors = generateValidationErrors(payload);

      expect(updateMapAndSave).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
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
    describe('when mapAndSave.buyerRelationship returns false', () => {
      beforeEach(() => {
        req.body = validBody;
        res.locals = mockRes().locals;
        updateMapAndSave = jest.fn(() => Promise.resolve(false));
        mapAndSave.buyerRelationship = updateMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.buyerRelationship fails', () => {
      beforeEach(() => {
        req.body = validBody;

        res.locals = mockRes().locals;
        updateMapAndSave = jest.fn(() => Promise.reject(new Error('mock')));
        mapAndSave.buyerRelationship = updateMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
