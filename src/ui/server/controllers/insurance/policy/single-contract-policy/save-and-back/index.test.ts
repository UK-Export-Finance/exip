import { post } from '.';
import { ROUTES } from '../../../../../constants';
import { FIELD_IDS } from '..';
import constructPayload from '../../../../../helpers/construct-payload';
import mapAndSave from '../../map-and-save/policy';
import generateValidationErrors from '../validation';
import { Request, ResponseInsurance } from '../../../../../../types';
import { mockReq, mockResInsurance, mockSpyPromiseRejection, referenceNumber } from '../../../../../test-mocks';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE },
} = ROUTES;

describe('controllers/insurance/policy/single-contract-policy/save-and-back', () => {
  let req: Request;
  let res: ResponseInsurance;

  jest.mock('../../map-and-save/policy');

  let mockMapAndSave = jest.fn(() => Promise.resolve(true));
  mapAndSave.policy = mockMapAndSave;

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();

    req.body = mockFormBody;
  });

  describe('when the form has data', () => {
    it('should call mapAndSave.policy with data from constructPayload function, application and validationErrors', async () => {
      await post(req, res);

      const payload = constructPayload(req.body, FIELD_IDS);

      const validationErrors = generateValidationErrors(payload);

      expect(mapAndSave.policy).toHaveBeenCalledTimes(1);
      expect(mapAndSave.policy).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
    });

    it(`should redirect to ${ALL_SECTIONS}`, async () => {
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

  describe('api error handling', () => {
    describe('when the mapAndSave call does not return anything', () => {
      beforeEach(() => {
        mockMapAndSave = jest.fn(() => Promise.resolve(false));
        mapAndSave.policy = mockMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the mapAndSave call fails', () => {
      beforeEach(() => {
        mockMapAndSave = mockSpyPromiseRejection;
        mapAndSave.policy = mockMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
