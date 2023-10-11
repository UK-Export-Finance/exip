import { get, TEMPLATE } from '.';
import { TEMPLATES, ROUTES } from '../../../../../constants';
import { PAGES } from '../../../../../content-strings';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../../test-mocks';

const { COMPANIES_HOUSE_UNAVAILABLE } = PAGES.INSURANCE.EXPORTER_BUSINESS;

const { COMPANIES_HOUSE_UNAVAILABLE: COMPANIES_HOUSE_UNAVAILABLE_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { INSURANCE_ROOT, ALL_SECTIONS, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

const { COMPANIES_HOUSE_NUMBER_ROOT } = EXPORTER_BUSINESS_ROUTES;

describe('controllers/insurance/business/companies-house-number/companies-house-unavailable', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
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
        userName: getUserNameFromSession(req.session.user),
        COMPANIES_HOUSE_NUMBER: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANIES_HOUSE_NUMBER_ROOT}`,
        ALL_SECTIONS: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${ALL_SECTIONS}`,
      });
    });
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
