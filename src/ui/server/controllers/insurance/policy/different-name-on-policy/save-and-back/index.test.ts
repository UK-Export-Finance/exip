import { post } from '.';
import { ROUTES } from '../../../../../constants';
import { FIELD_IDS } from '..';
import ACCOUNT_FIELD_IDS from '../../../../../constants/field-ids/insurance/account';
import constructPayload from '../../../../../helpers/construct-payload';
import mapAndSave from '../../map-and-save/policy-contact';
import generateValidationErrors from '../validation';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockContact, referenceNumber } from '../../../../../test-mocks';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE },
} = ROUTES;

const { FIRST_NAME } = ACCOUNT_FIELD_IDS;

describe('controllers/insurance/policy/different-name-on-policy/save-and-back', () => {
  let req: Request;
  let res: Response;

  jest.mock('../../map-and-save/policy-contact');

  let mockMapAndSave = jest.fn(() => Promise.resolve(true));
  mapAndSave.policyContact = mockMapAndSave;

  const mockFormBody = {
    _csrf: '1234',
    [FIRST_NAME]: mockContact[FIRST_NAME],
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.body = mockFormBody;
  });

  describe('when the form has data', () => {
    it('should call mapAndSave.policyContact with data from constructPayload function, application and validationErrors', async () => {
      await post(req, res);

      const payload = constructPayload(req.body, FIELD_IDS);

      const validationErrors = generateValidationErrors(payload);

      expect(mapAndSave.policyContact).toHaveBeenCalledTimes(1);
      expect(mapAndSave.policyContact).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
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
    describe('when the mapAndSave call does not return anything', () => {
      beforeEach(() => {
        mockMapAndSave = jest.fn(() => Promise.resolve(false));
        mapAndSave.policyContact = mockMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the mapAndSave call fails', () => {
      beforeEach(() => {
        mockMapAndSave = jest.fn(() => Promise.reject(new Error('Mock error')));

        mapAndSave.policyContact = mockMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
