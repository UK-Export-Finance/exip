import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../types';

const {
  INSURANCE_ROOT,
  ALL_SECTIONS,
  YOUR_BUYER: { COMPANY_OR_ORGANISATION },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

export const TEMPLATE = TEMPLATES.SHARED_PAGES.SECTION_START;

// TODO shared helper for this "start page variables".
// The only difference between each page is the start now URL.

/**
 * pageVariables
 * Page URLs
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  START_NOW_URL: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION}`,
  ALL_SECTIONS_URL: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
});

/**
 * get
 * Render the "Your buyer - start" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Your buyer - start page
 */
export const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER.ROOT,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(application.referenceNumber),
      userName: getUserNameFromSession(req.session.user),
    });
  } catch (err) {
    console.error('Error getting credit control %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
