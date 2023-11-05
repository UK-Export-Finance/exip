import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { APPLICATION, DEFAULT_PAGE_NUMBER, TEMPLATES } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import getTotalPages from '../../../helpers/pagination/get-total-pages';
import { getSkipCount, generatePaginationItems } from '../../../helpers/pagination';
import api from '../../../api';
import mapApplications from '../../../helpers/mappings/map-applications';
import { Request, Response } from '../../../../types';
import { mockReq, mockRes, mockApplications, mockAccount, mockSession } from '../../../test-mocks';

const {
  ACCOUNT: { SIGN_IN },
  ALL_SECTIONS,
  DASHBOARD_PAGE,
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const firstDashboardPageRoute = `${DASHBOARD_PAGE}/${DEFAULT_PAGE_NUMBER}`;

describe('controllers/insurance/dashboard', () => {
  let req: Request;
  let res: Response;

  const getApplicationsResponse = {
    applications: mockApplications,
    totalApplications: 10,
  };

  let getApplicationsSpy = jest.fn(() => Promise.resolve(getApplicationsResponse));

  beforeEach(() => {
    req = mockReq();
    req.session.user = mockAccount;

    res = mockRes();

    api.keystone.applications.getAll = getApplicationsSpy;
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.DASHBOARD);
    });
  });

  describe('get', () => {
    describe('when there is no req.session.user.id', () => {
      it(`should redirect to ${SIGN_IN.ROOT}`, async () => {
        req.session = mockSession;

        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(SIGN_IN.ROOT);
      });
    });

    describe('when there is no req.params.pageNumber', () => {
      it('should call api.keystone.applications.getAll with the user session ID and a default skip count', async () => {
        delete req.params.pageNumber;

        await get(req, res);

        expect(getApplicationsSpy).toHaveBeenCalledTimes(1);

        const expectedSkip = getSkipCount(1);

        expect(getApplicationsSpy).toHaveBeenCalledWith(req.session.user?.id, expectedSkip);
      });
    });

    describe('when there is a req.params.pageNumber', () => {
      it('should call api.keystone.applications.getAll with the user session ID and a skip count from params', async () => {
        req.params.pageNumber = '1';

        await get(req, res);

        expect(getApplicationsSpy).toHaveBeenCalledTimes(1);

        const expectedSkip = getSkipCount(Number(req.params.pageNumber));

        expect(getApplicationsSpy).toHaveBeenCalledWith(req.session.user?.id, expectedSkip);
      });

      describe('when req.params.pageNumber exceeds the total amount of pages', () => {
        it(`should redirect to ${firstDashboardPageRoute}`, async () => {
          const totalPages = getTotalPages(getApplicationsResponse.totalApplications);

          req.params.pageNumber = String(totalPages + 1);

          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(firstDashboardPageRoute);
        });
      });

      describe('when req.params.pageNumber is not a number', () => {
        it(`should redirect to ${firstDashboardPageRoute}`, async () => {
          req.params.pageNumber = 'not-a-number';

          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(firstDashboardPageRoute);
        });
      });
    });

    it('should render template', async () => {
      req.params.pageNumber = '1';

      const pageNumberParam = Number(req.params.pageNumber);

      await get(req, res);

      const totalPages = getTotalPages(getApplicationsResponse.totalApplications);

      const paginationItems = generatePaginationItems(totalPages);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DASHBOARD,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        applications: mapApplications(mockApplications),
        ROUTES: {
          INSURANCE_ROOT,
          ALL_SECTIONS,
        },
        SUBMITTED_STATUS: APPLICATION.STATUS.SUBMITTED,
        currentPageNumber: pageNumberParam,
        pages: paginationItems,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('api error handling', () => {
      describe('when there is an error', () => {
        beforeAll(() => {
          const mockError = new Error('mock');
          getApplicationsSpy = jest.fn(() => Promise.reject(mockError));

          api.keystone.applications.getAll = getApplicationsSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
