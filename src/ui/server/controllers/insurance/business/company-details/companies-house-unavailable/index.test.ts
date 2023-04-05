import { get, TEMPLATE } from '.';
import { mockReq, mockRes, mockApplication } from '../../../../../test-mocks';
import { Request, Response } from '../../../../../../types';
import { TEMPLATES, ROUTES } from '../../../../../constants';
import { PAGES } from '../../../../../content-strings';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';

const { COMPANIES_HOUSE_UNAVAILABLE } = PAGES.INSURANCE.EXPORTER_BUSINESS;

const { COMPANIES_HOUSE_UNAVAILABLE: COMPANIES_HOUSE_UNAVAILABLE_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { INSURANCE_ROOT, ALL_SECTIONS, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES } = ROUTES.INSURANCE;

const { COMPANY_DETAILS: COMPANY_DETAILS_ROUTE } = EXPORTER_BUSINESS_ROUTES;

describe('controllers/insurance/business/companies-details/companies-house-unavailable', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(COMPANIES_HOUSE_UNAVAILABLE_TEMPLATE);
    });
  });

  describe('get', () => {
    it('should render the companies-house-unavailable template with correct variables', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(COMPANIES_HOUSE_UNAVAILABLE_TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: COMPANIES_HOUSE_UNAVAILABLE,
          BACK_LINK: req.headers.referer,
        }),
        user: req.session.user,
        COMPANY_DETAILS: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANY_DETAILS_ROUTE}`,
        ALL_SECTIONS: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${ALL_SECTIONS}`,
      });
    });
  });

  describe('when there is no application', () => {
    beforeEach(() => {
      res.locals = { csrfToken: '1234' };
    });

    it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
      get(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
    });
  });
});
