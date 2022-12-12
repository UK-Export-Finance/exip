import { post } from '.';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../constants';
import { Request, Response } from '../../../../../../types';
import generateValidationErrors from '../validation';
import save from '../../save-data';
import { mockApplication, mockReq, mockRes } from '../../../../../test-mocks';

const { POLICY_TYPE } = FIELD_IDS;
const {
  INSURANCE: { INSURANCE_ROOT },
} = ROUTES;

describe('controllers/insurance/policy-and-export/type-of-policy/save-and-back', () => {
  let req: Request;
  let res: Response;

  jest.mock('../../save-data');

  const mockSavePolicyAndExportData = jest.fn(() => {
    return Promise.resolve({});
  });

  save.policyAndExport = mockSavePolicyAndExportData;

  const refNumber = Number(mockApplication.referenceNumber);

  const mockValidFormBody = {
    _csrf: '1234',
    [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.params.referenceNumber = String(mockApplication.referenceNumber);
  });

  describe('when the form has data', () => {
    describe('when the form has validation errors ', () => {
      beforeEach(() => {
        req.body = {
          _csrf: '1234',
          mockField: true,
        };
      });

      it('should call save.policyAndExport with application reference number, form data and validationErrors.errorList', async () => {
        await post(req, res);

        const validationErrors = generateValidationErrors(req.body);

        expect(save.policyAndExport).toHaveBeenCalledTimes(1);
        expect(save.policyAndExport).toHaveBeenCalledWith(refNumber, req.body, validationErrors?.errorList);
      });

      it(`should redirect to ${ROUTES.INSURANCE.ALL_SECTIONS}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${refNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      beforeEach(() => {
        req.body = mockValidFormBody;
      });

      it('should call save.policyAndExport with application reference number and form data', async () => {
        await post(req, res);

        expect(save.policyAndExport).toHaveBeenCalledTimes(1);
        expect(save.policyAndExport).toHaveBeenCalledWith(refNumber, req.body);
      });

      it(`should redirect to ${ROUTES.INSURANCE.ALL_SECTIONS}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${refNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
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

  describe('api error handling', () => {
    describe('when save application policyAndExport call does not retun anything', () => {
      beforeEach(() => {
        req.body = mockValidFormBody;

        save.policyAndExport = jest.fn(() => Promise.resolve());
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when save application policyAndExport call fails', () => {
      beforeEach(() => {
        req.body = mockValidFormBody;

        save.policyAndExport = jest.fn(() => Promise.reject(new Error('Mock error')));
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
