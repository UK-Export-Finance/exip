import { post } from '.';
import { ROUTES } from '../../../../../constants';
import { FIELD_IDS } from '..';
import constructPayload from '../../../../../helpers/construct-payload';
import mapAndSave from '../../../export-contract/map-and-save';
import generateValidationErrors from '../validation';
import { Request, Response } from '../../../../../../types';
import { mockApplication, mockReq, mockRes } from '../../../../../test-mocks';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE },
} = ROUTES;

describe('controllers/insurance/policy-and-export/about-goods-or-services/save-and-back', () => {
  let req: Request;
  let res: Response;

  jest.mock('../../map-and-save/policy');

  let mockMapAndSave = jest.fn(() => Promise.resolve(true));
  mapAndSave.exportContract = mockMapAndSave;

  const refNumber = Number(mockApplication.referenceNumber);

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.params.referenceNumber = String(mockApplication.referenceNumber);

    req.body = mockFormBody;
  });

  describe('when the form has data', () => {
    it('should call mapAndSave.exportContract with data from constructPayload function, application and validationErrors', async () => {
      await post(req, res);

      const payload = constructPayload(req.body, FIELD_IDS);

      const validationErrors = generateValidationErrors(payload);

      expect(mapAndSave.exportContract).toHaveBeenCalledTimes(1);
      expect(mapAndSave.exportContract).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
    });

    it(`should redirect to ${ALL_SECTIONS}`, async () => {
      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${refNumber}${ALL_SECTIONS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });

  describe('when the form does not have any data', () => {
    it(`should redirect to ${ALL_SECTIONS}`, async () => {
      req.body = { _csrf: '1234' };

      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${refNumber}${ALL_SECTIONS}`;

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
        mapAndSave.exportContract = mockMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the mapAndSave call fails', () => {
      beforeEach(() => {
        mockMapAndSave = jest.fn(() => Promise.reject(new Error('Mock error')));

        mapAndSave.exportContract = mockMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
