import { APPLICATION, DEFAULT_PAGE_NUMBER, TEMPLATES } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { PAGES } from '../../../content-strings';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { isNumber } from '../../../helpers/number';
import getTotalPages from '../../../helpers/pagination/get-total-pages';
import { getSkipCount, generatePaginationItems } from '../../../helpers/pagination';
import api from '../../../api';
import mapApplications from '../../../helpers/mappings/map-applications';
import { Request, Response } from '../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.DASHBOARD;

const {
  ACCOUNT: { SIGN_IN },
  ALL_SECTIONS,
  DASHBOARD_PAGE,
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const firstDashboardPageRoute = `${DASHBOARD_PAGE}/${DEFAULT_PAGE_NUMBER}`;

/**
 * get
 * Fetch applications and render the Dashboard page.
 * We redirect to the first dashboard page if either:
 * - The page number param is not a number.
 * - The page number param is greater than the total amount of pages available.
 * Otherwise, the page number parameter is used to:
 * - Fetch applications from the API
 * - Skip X applications depending on the page number and total amount of pages.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Dashboard page
 */
export const get = async (req: Request, res: Response) => {
  if (!req.session.user?.id) {
    return res.redirect(SIGN_IN.ROOT);
  }

  const { pageNumber: pageNumberParam } = req.params;

  let currentPageNumber = DEFAULT_PAGE_NUMBER;

  /**
   * Check if a page number parameter has been provided.
   * If the parameter is not a number, redirect to the first dashboard page.
   * Otherwise, store the parameter as a number type.
   */
  if (pageNumberParam) {
    if (!isNumber(pageNumberParam)) {
      return res.redirect(firstDashboardPageRoute);
    }

    currentPageNumber = Number(pageNumberParam);
  }

  /**
   * 1) Get/calculate the amount of applications to skip from the current page number.
   * 2) Call the API to obtain applications and a total amount of applications.
   * 3) Get the total amount of pages available.
   * 4) Check if the current page number exceeds the total amount of pages. If so, redirect to the first page.
   * 5) Generate pagination items.
   * 6) Render the template.
   */
  try {
    const skip = getSkipCount(currentPageNumber);

    const { applications, totalApplications } = await api.keystone.applications.getAll(req.session.user.id, skip);

    const totalPages = getTotalPages(totalApplications);

    if (currentPageNumber > totalPages) {
      return res.redirect(firstDashboardPageRoute);
    }

    const paginationItems = generatePaginationItems(totalPages);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DASHBOARD,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      applications: mapApplications(applications),
      ROUTES: {
        INSURANCE_ROOT,
        ALL_SECTIONS,
      },
      SUBMITTED_STATUS: APPLICATION.STATUS.SUBMITTED,
      currentPageNumber,
      pages: paginationItems,
    });
  } catch (err) {
    console.error("Error getting applications and rendering 'dashboard' page %O", err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
