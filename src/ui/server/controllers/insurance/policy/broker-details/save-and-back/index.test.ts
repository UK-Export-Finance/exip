import { post } from '.';
import { ROUTES } from '../../../../../constants';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../validation';
import mapAndSave from '../../map-and-save/broker';
import { FIELD_IDS } from '..';
import { Request, ResponseInsurance } from '../../../../../../types';
import { mockReq, mockResInsurance, mockApplication, mockSpyPromiseRejection, referenceNumber } from '../../../../../test-mocks';

const { USING_BROKER } = POLICY_FIELD_IDS;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/policy/broker-details/save-and-back', () => {
  let req: Request;
  let res: ResponseInsurance;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();

    mapAndSave.broker = updateMapAndSave;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const validBody = {
    [USING_BROKER]: 'true',
  };

  describe('when there are no validation errors', () => {
    it('should redirect to all sections page', async () => {
      req.body = validBody;

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.broker once with data from constructPayload function', async () => {
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

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.broker once', async () => {
      req.body = mockInvalidBody;

      await post(req, res);

      const payload = constructPayload(req.body, FIELD_IDS);

      const validationErrors = generateValidationErrors(payload);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);

      expect(updateMapAndSave).toHaveBeenCalledWith(payload, mockApplication, validationErrors);
    });
  });

  describe('api error handling', () => {
    describe('when mapAndSave.broker returns false', () => {
      beforeEach(() => {
        req.body = validBody;
        mapAndSave.broker = jest.fn(() => Promise.resolve(false));
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.broker fails', () => {
      beforeEach(() => {
        req.body = validBody;
        updateMapAndSave = mockSpyPromiseRejection;
        mapAndSave.broker = updateMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
