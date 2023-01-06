import { post } from '.';
import { ROUTES } from '../../../../../constants';
import { Request, Response } from '../../../../../../types';
import mapAndSave from '../../map-and-save';
import generateValidationErrors from '../validation';
import { mockApplication, mockReq, mockRes } from '../../../../../test-mocks';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS },
} = ROUTES;

describe('controllers/insurance/policy-and-export/single-contract-policy/save-and-back', () => {
  let req: Request;
  let res: Response;

  jest.mock('../../map-and-save');

  let mockMapAndSave = jest.fn(() => Promise.resolve(true));
  mapAndSave.policyAndExport = mockMapAndSave;

  const refNumber = Number(mockApplication.referenceNumber);

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);

    req.body = mockFormBody;
  });

  describe('when the form has data', () => {
    it('should call mapAndSave.policyAndExport with req.body, application and validationErrors', async () => {
      await post(req, res);

      const validationErrors = generateValidationErrors(req.body);

      expect(mapAndSave.policyAndExport).toHaveBeenCalledTimes(1);
      expect(mapAndSave.policyAndExport).toHaveBeenCalledWith(mockFormBody, res.locals.application, validationErrors);
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
      res.locals = { csrfToken: '1234' };
    });

    it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
    });
  });

  describe('api error handling', () => {
    describe('when the mapAndSave call does not return anything', () => {
      beforeEach(() => {
        mockMapAndSave = jest.fn(() => Promise.resolve(false));
        mapAndSave.policyAndExport = mockMapAndSave;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the mapAndSave call fails', () => {
      beforeEach(() => {
        mockMapAndSave = jest.fn(() => Promise.reject(new Error('Mock error')));
        mapAndSave.policyAndExport = mockMapAndSave;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
