import { ROUTES, TEMPLATES, APPLICATION } from '../../../constants';
import { PAGES } from '../../../content-strings';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { getSkipCount, getPaginationNumbers, generatePaginationItems, generateNextPreviousLinks } from '../../../helpers/pagination';
import api from '../../../api';
import mapApplications from '../../../helpers/mappings/map-applications';
import { Request, Response } from '../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.DASHBOARD;

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS, ACCOUNT, PROBLEM_WITH_SERVICE },
} = ROUTES;

/**
 * get
 * Render the Dashboard page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Dashboard page
 */
export const get = async (req: Request, res: Response) => {
  // TODO: what if pageNumber is not a number?
  const { pageNumber: pageNumberParam } = req.params;

  let currentPageNumber = 1;

  if (pageNumberParam) {
    currentPageNumber = Number(pageNumberParam);
  }

  if (!req.session.user?.id) {
    return res.redirect(ACCOUNT.SIGN_IN.ROOT);
  }

  try {
    const skip = getSkipCount(currentPageNumber);

    const { applications, totalApplications } = await api.keystone.applications.getAll(
      req.session.user.id,
      skip,
    );

    /**
     * Generate pagination items/links and next/previous links
     * For GOV pagination component
     * E.g "Previous, 1, 2, 3, Next"
     */
    const { totalPages, previousPage, nextPage, lastPage } = getPaginationNumbers(currentPageNumber, totalApplications);

    const paginationItems = generatePaginationItems(currentPageNumber, totalPages, previousPage, nextPage, lastPage);

    const { next, previous } = generateNextPreviousLinks(totalPages, currentPageNumber);

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
      paginationItems,
      PREVIOUS: previous,
      NEXT: next,
    });
  } catch (err) {
    console.error("Error getting applications and rendering 'dashboard' page %O", err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
