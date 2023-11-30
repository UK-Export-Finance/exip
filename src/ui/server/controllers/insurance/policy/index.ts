import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../types';

const {
  INSURANCE_ROOT,
  ALL_SECTIONS,
  POLICY: { TYPE_OF_POLICY },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.ROOT;

/**
 * pageVariables
 * Page URLs
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  START_NOW_URL: `${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`,
  ALL_SECTIONS_URL: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
});

/**
 * get
 * Render the "Insurance policy - start" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Your business - start page
 */
export const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.ROOT,
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
