import { add, getMonth, getYear } from 'date-fns';
import { post } from '.';
import { FIELD_IDS, ROUTES } from '../../../../../constants';
import { Request, Response } from '../../../../../../types';
import mapSubmittedData from '../../map-submitted-data';
import generateValidationErrors from '../validation';
import save from '../../save-data';
import { mockApplication, mockReq, mockRes } from '../../../../../test-mocks';

const {
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      CREDIT_PERIOD_WITH_BUYER,
      SINGLE: { TOTAL_CONTRACT_VALUE },
    },
  },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: { INSURANCE_ROOT },
} = ROUTES;

describe('controllers/insurance/policy-and-export/single-contract-policy/save-and-back', () => {
  let req: Request;
  let res: Response;

  jest.mock('../../save-data');

  const mockSavePolicyAndExportData = jest.fn(() => Promise.resolve({}));
  save.policyAndExport = mockSavePolicyAndExportData;

  const refNumber = Number(mockApplication.referenceNumber);

  const date = new Date();

  const mockValidFormBody = {
    _csrf: '1234',
    [`${REQUESTED_START_DATE}-day`]: '1',
    [`${REQUESTED_START_DATE}-month`]: getMonth(date),
    [`${REQUESTED_START_DATE}-year`]: getYear(add(date, { years: 1 })),
    [TOTAL_CONTRACT_VALUE]: '150000',
    [CREDIT_PERIOD_WITH_BUYER]: 'Example',
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
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

      it('should call save.policyAndExport with application reference number, populated submitted data and validationErrors.errorList', async () => {
        await post(req, res);

        const validationErrors = generateValidationErrors(req.body);

        expect(save.policyAndExport).toHaveBeenCalledTimes(1);
        expect(save.policyAndExport).toHaveBeenCalledWith(res.locals.application, mapSubmittedData(req.body), validationErrors?.errorList);
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

      it('should call save.policyAndExport with application reference number and populated submitted data', async () => {
        await post(req, res);

        expect(save.policyAndExport).toHaveBeenCalledTimes(1);
        expect(save.policyAndExport).toHaveBeenCalledWith(res.locals.application, mapSubmittedData(req.body));
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
