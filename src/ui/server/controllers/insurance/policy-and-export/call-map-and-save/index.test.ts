import callMapAndSave from '.';
import { FIELD_IDS, FIELD_VALUES } from '../../../../constants';
import { Request, Response } from '../../../../../types';
import generateValidationErrors from '../type-of-policy/validation';
import mapAndSave from '../map-and-save/policy';
import { mockApplication, mockReq, mockRes } from '../../../../test-mocks';

const { POLICY_TYPE } = FIELD_IDS;

describe('controllers/insurance/policy-and-export/call-map-and-save', () => {
  let req: Request;
  let res: Response;

  jest.mock('../map-and-save/policy');

  let mockMapAndSave = jest.fn(() => Promise.resolve(true));
  mapAndSave.policy = mockMapAndSave;

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  const mockValidFormBody = {
    _csrf: '1234',
    [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  };

  const mockValidationErrors = generateValidationErrors(mockFormBody);

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);

    req.body = mockFormBody;
  });

  describe('when form data has validation errors ', () => {
    it('should call mapAndSave.policy with application, form data and validationErrors', async () => {
      await callMapAndSave(req.body, mockApplication, mockValidationErrors);

      expect(mapAndSave.policy).toHaveBeenCalledTimes(1);
      expect(mapAndSave.policy).toHaveBeenCalledWith(req.body, res.locals.application, mockValidationErrors);
    });

    describe('when the form does NOT have validation errors', () => {
      beforeEach(() => {
        req.body = mockValidFormBody;
      });

      it('should call mapAndSave.policy with application and form data', async () => {
        await callMapAndSave(req.body, mockApplication);

        expect(mapAndSave.policy).toHaveBeenCalledTimes(1);
        expect(mapAndSave.policy).toHaveBeenCalledWith(req.body, res.locals.application);
      });
    });
  });

  describe('api error handling', () => {
    describe('when the mapAndSave call does not return anything', () => {
      beforeEach(() => {
        mockMapAndSave = jest.fn(() => Promise.resolve(false));
        mapAndSave.policy = mockMapAndSave;
      });

      it('should return false', async () => {
        const result = await callMapAndSave(req.body, mockApplication, mockValidationErrors);

        expect(result).toEqual(false);
      });
    });

    describe('when the mapAndSave call fails', () => {
      beforeEach(() => {
        mockMapAndSave = jest.fn(() => Promise.reject(new Error('Mock error')));
        mapAndSave.policy = mockMapAndSave;
      });

      it('should return false', async () => {
        const result = await callMapAndSave(req.body, mockApplication, mockValidationErrors);

        expect(result).toEqual(false);
      });
    });
  });
});
