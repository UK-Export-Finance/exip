import { post } from '.';
import { FIELD_ID, ERROR_MESSAGE } from '..';
import { ROUTES } from '../../../../../constants';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../../map-and-save/loss-payee';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockApplication, mockSpyPromiseRejection, referenceNumber } from '../../../../../test-mocks';

const {
  LOSS_PAYEE: { IS_APPOINTED },
} = POLICY_FIELD_IDS;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/policy/loss-payee/save-and-back', () => {
  let req: Request;
  let res: Response;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    mapAndSave.lossPayee = updateMapAndSave;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const validBody = {
    [IS_APPOINTED]: 'true',
  };

  describe('when there are no validation errors', () => {
    it('should redirect to all sections page', async () => {
      req.body = validBody;

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.lossPayee once with data from constructPayload function', async () => {
      req.body = validBody;

      await post(req, res);

      const payload = constructPayload(req.body, [FIELD_ID]);
      const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);

      expect(updateMapAndSave).toHaveBeenCalledWith(payload, mockApplication, validationErrors);
    });
  });

  describe('when there are validation errors', () => {
    const mockInvalidBody = {};

    it('should redirect to all sections page', async () => {
      req.body = mockInvalidBody;

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.lossPayee once', async () => {
      req.body = mockInvalidBody;

      await post(req, res);

      const payload = constructPayload(req.body, [FIELD_ID]);
      const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

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
    describe('when mapAndSave.lossPayee returns false', () => {
      beforeEach(() => {
        req.body = validBody;
        res.locals = mockRes().locals;
        mapAndSave.lossPayee = jest.fn(() => Promise.resolve(false));
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.lossPayee fails', () => {
      beforeEach(() => {
        req.body = validBody;
        res.locals = mockRes().locals;
        updateMapAndSave = mockSpyPromiseRejection;
        mapAndSave.lossPayee = updateMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
