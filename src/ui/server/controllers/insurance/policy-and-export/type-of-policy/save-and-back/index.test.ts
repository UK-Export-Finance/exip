import { post } from '.';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../constants';
import { Request, Response } from '../../../../../../types';
import generateValidationErrors from '../validation';
import mapAndSave from '../../map-and-save';
import { mockApplication, mockReq, mockRes } from '../../../../../test-mocks';

const { POLICY_TYPE } = FIELD_IDS;
const {
  INSURANCE: { INSURANCE_ROOT },
} = ROUTES;

describe('controllers/insurance/policy-and-export/type-of-policy/save-and-back', () => {
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

  const mockValidFormBody = {
    _csrf: '1234',
    [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);

    req.body = mockFormBody;
  });

  describe('when the form has data', () => {
    describe('when the form has validation errors ', () => {
      it('should call mapAndSave.policyAndExport with application reference number, form data and validationErrors.errorList', async () => {
        await post(req, res);

        const validationErrors = generateValidationErrors(req.body);

        expect(mapAndSave.policyAndExport).toHaveBeenCalledTimes(1);
        expect(mapAndSave.policyAndExport).toHaveBeenCalledWith(req.body, res.locals.application, validationErrors);
      });

      it(`should redirect to ${ROUTES.INSURANCE.ALL_SECTIONS}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${refNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe('when the form does NOT have validation errors', () => {
        beforeEach(() => {
          req.body = mockValidFormBody;
        });

        it('should call mapAndSave.policyAndExport with application reference number and form data', async () => {
          await post(req, res);

          expect(mapAndSave.policyAndExport).toHaveBeenCalledTimes(1);
          expect(mapAndSave.policyAndExport).toHaveBeenCalledWith(req.body, res.locals.application);
        });

        it(`should redirect to ${ROUTES.INSURANCE.ALL_SECTIONS}`, async () => {
          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${refNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });
  });

  describe('when the form does not have any data', () => {
    it(`should redirect to ${ROUTES.INSURANCE.ALL_SECTIONS}`, async () => {
      req.body = { _csrf: '1234' };

      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${refNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;

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
