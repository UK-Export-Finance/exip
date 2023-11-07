import callMapAndSave from '.';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { Request, Response } from '../../../../../types';
import generateValidationErrors from '../../policy/about-goods-or-services/validation';
import mapAndSave from '../map-and-save';
import { mockApplication, mockReq, mockRes } from '../../../../test-mocks';

const {
  POLICY: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
  },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/export-contract/call-map-and-save', () => {
  let req: Request;
  let res: Response;

  jest.mock('../map-and-save');

  let mockMapAndSave = jest.fn(() => Promise.resolve(true));
  mapAndSave.exportContract = mockMapAndSave;

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  const mockValidFormBody = {
    _csrf: '1234',
    [DESCRIPTION]: mockApplication.exportContract[DESCRIPTION],
    [FINAL_DESTINATION]: mockApplication.exportContract[FINAL_DESTINATION],
  };

  const mockValidationErrors = generateValidationErrors(mockFormBody);

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.params.referenceNumber = String(mockApplication.referenceNumber);

    req.body = mockFormBody;
  });

  describe('when form data has validation errors ', () => {
    it('should call mapAndSave.exportContract with application, form data and validationErrors', async () => {
      await callMapAndSave(req.body, mockApplication, mockValidationErrors);

      expect(mapAndSave.exportContract).toHaveBeenCalledTimes(1);
      expect(mapAndSave.exportContract).toHaveBeenCalledWith(req.body, res.locals.application, mockValidationErrors);
    });

    describe('when the form does NOT have validation errors', () => {
      beforeEach(() => {
        req.body = mockValidFormBody;
      });

      it('should call mapAndSave.exportContract with application and form data', async () => {
        await callMapAndSave(req.body, mockApplication);

        expect(mapAndSave.exportContract).toHaveBeenCalledTimes(1);
        expect(mapAndSave.exportContract).toHaveBeenCalledWith(req.body, res.locals.application);
      });
    });
  });

  describe('api error handling', () => {
    describe('when the mapAndSave call does not return anything', () => {
      beforeEach(() => {
        mockMapAndSave = jest.fn(() => Promise.resolve(false));
        mapAndSave.exportContract = mockMapAndSave;
      });

      it('should return false', async () => {
        const result = await callMapAndSave(req.body, mockApplication, mockValidationErrors);

        expect(result).toEqual(false);
      });
    });

    describe('when the mapAndSave call fails', () => {
      beforeEach(() => {
        mockMapAndSave = jest.fn(() => Promise.reject(new Error('mock')));
        mapAndSave.exportContract = mockMapAndSave;
      });

      it('should return false', async () => {
        const result = await callMapAndSave(req.body, mockApplication, mockValidationErrors);

        expect(result).toEqual(false);
      });
    });
  });
});
