import { get, TEMPLATE, post } from '.';
import { PAGES } from '../../../../content-strings';
import { Request, Response } from '../../../../../types';
import { TEMPLATES, ROUTES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { yourBusinessSummaryList } from '../../../../helpers/summary-lists/your-business';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';
import { mockExporterCompany, mockExporterBusiness, mockExporterBroker } from '../../../../test-mocks/mock-application';

const { CHECK_YOUR_ANSWERS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { CHECK_YOUR_ANSWERS: CHECK_YOUR_ANSWERS_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES, YOUR_BUYER: YOUR_BUYER_ROUTES } = ROUTES.INSURANCE;

const { CHECK_YOUR_ANSWERS_SAVE_AND_BACK: CHECK_YOUR_ANSWERS_ROUTE } = EXPORTER_BUSINESS_ROUTES;

const { COMPANY_OR_ORGANISATION } = YOUR_BUYER_ROUTES;

describe('controllers/insurance/business/check-your-answers', () => {
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

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(CHECK_YOUR_ANSWERS_TEMPLATE);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);
      const summaryList = yourBusinessSummaryList(mockExporterCompany, mockExporterBusiness, mockExporterBroker, mockApplication.referenceNumber);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: CHECK_YOUR_ANSWERS,
          BACK_LINK: req.headers.referer,
        }),
        user: req.session.user,
        application: mapApplicationToFormFields(mockApplication),
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${refNumber}${CHECK_YOUR_ANSWERS_ROUTE}`,
        SUMMARY_LIST: summaryList,
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
    it(`should redirect to ${COMPANY_OR_ORGANISATION}`, () => {
      post(req, res);

      const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${COMPANY_OR_ORGANISATION}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });
});
