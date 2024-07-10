import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import sectionStartPageVariables from '../../../helpers/page-variables/core/insurance/section-start';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../types';
import { referenceNumber, mockReq, mockRes, mockApplication } from '../../../test-mocks';

const {
  EXPORTER_BUSINESS: { COMPANY_DETAILS_ROOT, ENTER_COMPANIES_HOUSE_NUMBER },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

describe('controllers/insurance/business/index', () => {
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
      expect(TEMPLATE).toEqual(TEMPLATES.SHARED_PAGES.SECTION_START);
    });
  });

  describe('get', () => {
    describe('when an application has NOT been migrated', () => {
      it('should render template', () => {
        get(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...sectionStartPageVariables({
            REFERENCE_NUMBER: referenceNumber,
            START_NOW_ROUTE: COMPANY_DETAILS_ROOT,
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.ROOT,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
        });
      });
    });

    describe('when an application has been migrated and does NOT have a company number', () => {
      beforeEach(() => {
        res.locals.application = {
          ...mockApplication,
          migratedV1toV2: true,
          company: {
            ...mockApplication.company,
            companyNumber: '',
          },
        };
      });

      it('should render template with alternative START_NOW_ROUTE variable', () => {
        get(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...sectionStartPageVariables({
            REFERENCE_NUMBER: referenceNumber,
            START_NOW_ROUTE: ENTER_COMPANIES_HOUSE_NUMBER,
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.ROOT,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
        });
      });
    });

    describe('when an application has been migrated, but does have a company number', () => {
      beforeEach(() => {
        res.locals.application = {
          ...mockApplication,
          migratedV1toV2: true,
        };
      });

      it('should render template with alternative START_NOW_ROUTE variable', () => {
        get(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...sectionStartPageVariables({
            REFERENCE_NUMBER: referenceNumber,
            START_NOW_ROUTE: COMPANY_DETAILS_ROOT,
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.ROOT,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
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
});
