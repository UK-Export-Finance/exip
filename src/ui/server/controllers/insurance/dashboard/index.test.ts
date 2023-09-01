import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES, APPLICATION } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { getSkipCount, generatePaginationItems } from '../../../helpers/pagination';
import api from '../../../api';
import mapApplications from '../../../helpers/mappings/map-applications';
import { Request, Response } from '../../../../types';
import { mockReq, mockRes, mockApplications, mockAccount, mockSession } from '../../../test-mocks';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    ALL_SECTIONS,
    ACCOUNT: { SIGN_IN },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

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
    req.params.pageNumber = '100';

    res = mockRes();

    api.keystone.applications.getAll = getApplicationsSpy;
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.DASHBOARD);
    });
  });

  describe('get', () => {
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
      it('should call api.keystone.applications.getAll with the user session ID and a skip count frmo params', async () => {
        req.params.pageNumber = '100';

        await get(req, res);

        expect(getApplicationsSpy).toHaveBeenCalledTimes(1);

        const expectedSkip = getSkipCount(Number(req.params.pageNumber));

        expect(getApplicationsSpy).toHaveBeenCalledWith(req.session.user?.id, expectedSkip);
      });

      describe('when req.params.pageNumber is not a number', () => {
        it('should call api.keystone.applications.getAll with the user session ID and a default skip count', async () => {
          req.params.pageNumber = 'not-a-number';

          await get(req, res);

          expect(getApplicationsSpy).toHaveBeenCalledTimes(1);

          const expectedSkip = getSkipCount(1);

          expect(getApplicationsSpy).toHaveBeenCalledWith(req.session.user?.id, expectedSkip);
        });
      });
    });

    it('should render template', async () => {
      req.params.pageNumber = '100';

      const pageNumberParam = Number(req.params.pageNumber);

      await get(req, res);

      const paginationItems = generatePaginationItems(getApplicationsResponse.totalApplications);

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

    describe('when there is no req.session.user.id', () => {
      it(`should redirect to ${SIGN_IN.ROOT}`, async () => {
        req.session = mockSession;

        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(SIGN_IN.ROOT);
      });
    });

    describe('api error handling', () => {
      describe('when there is an error', () => {
        beforeAll(() => {
          getApplicationsSpy = jest.fn(() => Promise.reject());
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
