import { PAGE_CONTENT_STRINGS, pageVariables, TEMPLATE, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_ROOT },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NAME, COMPANY_NUMBER, COUNTRY },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/other-company-details', () => {
  let req: Request;
  let res: Response;

  jest.mock('../map-and-save/policy');

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;

    req.params.referenceNumber = String(mockApplication.referenceNumber);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct properties', () => {
      const expected = PAGES.INSURANCE.POLICY.OTHER_COMPANY_DETAILS;

      expect(PAGE_CONTENT_STRINGS).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables;

      const expected = {
        FIELDS: {
          COMPANY_NAME: {
            ID: COMPANY_NAME,
            ...FIELDS.REQUESTED_JOINTLY_INSURED_PARTY[COMPANY_NAME],
          },
          COMPANY_NUMBER: {
            ID: COMPANY_NUMBER,
            ...FIELDS.REQUESTED_JOINTLY_INSURED_PARTY[COMPANY_NUMBER],
          },
          COUNTRY: {
            ID: COUNTRY,
            ...FIELDS.REQUESTED_JOINTLY_INSURED_PARTY[COUNTRY],
          },
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.OTHER_COMPANY_DETAILS);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables,
        userName: getUserNameFromSession(req.session.user),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    describe('when there are no validation errors', () => {
      it(`should redirect to ${BROKER_ROOT}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${BROKER_ROOT}`;

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
  });
});
