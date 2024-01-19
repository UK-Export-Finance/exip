import { FIELD_ID, PAGE_CONTENT_STRINGS, pageVariables, HTML_FLAGS, TEMPLATE, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapAndSave from '../map-and-save/policy';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_ROOT, ANOTHER_COMPANY_SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { NEED_ANOTHER_COMPANY_TO_BE_INSURED } = POLICY_FIELD_IDS;

const { SHARED_PAGES } = TEMPLATES;

describe('controllers/insurance/policy/another-company', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

  jest.mock('../map-and-save/policy');

  mapAndSave.policy = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;

    req.params.referenceNumber = String(mockApplication.referenceNumber);
    refNumber = Number(mockApplication.referenceNumber);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = NEED_ANOTHER_COMPANY_TO_BE_INSURED;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct properties', () => {
      const expected = {
        ...PAGES.INSURANCE.POLICY.ANOTHER_COMPANY,
        HINT: FIELDS[NEED_ANOTHER_COMPANY_TO_BE_INSURED].HINT,
      };

      expect(PAGE_CONTENT_STRINGS).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(refNumber);

      const expected = {
        FIELD_ID: NEED_ANOTHER_COMPANY_TO_BE_INSURED,
        FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${req.params.referenceNumber}${ANOTHER_COMPANY_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have the correct properties', () => {
      const expected = {
        HORIZONTAL_RADIOS: true,
        NO_RADIO_AS_FIRST_OPTION: true,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        ...pageVariables(refNumber),
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
    const validBody = {};

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

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
