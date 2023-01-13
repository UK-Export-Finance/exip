import { pageVariables, get, post, TEMPLATE } from '.';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const { INSURANCE_ROOT } = ROUTES.INSURANCE;
const {
  INSURANCE: {
    POLICY_AND_EXPORTS: { CHECK_YOUR_ANSWERS_SAVE_AND_BACK },
    EXPORTER_BUSINESS: { COMPANY_DETAILS_ROOT },
  },
} = ROUTES;
const { POLICY_AND_EXPORTS } = FIELD_IDS.INSURANCE;

describe('controllers/insurance/policy-and-export/check-your-answers', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

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

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(refNumber);

      const expected = {
        FIELD: FIELDS[POLICY_AND_EXPORTS.POLICY_TYPE],
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${req.params.referenceNumber}${CHECK_YOUR_ANSWERS_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        application: res.locals.application,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    it(`should redirect to ${COMPANY_DETAILS_ROOT}`, () => {
      post(req, res);

      const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${COMPANY_DETAILS_ROOT}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });
});
