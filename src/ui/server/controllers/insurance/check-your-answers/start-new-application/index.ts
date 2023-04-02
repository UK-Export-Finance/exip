import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import formatDate from '../../../../helpers/date/format-date';
import { Request, Response } from '../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.NEED_TO_START_NEW_APPLICATION;

const {
  PROBLEM_WITH_SERVICE,
  INSURANCE: { START, INSURANCE_ROOT, ALL_SECTIONS },
} = ROUTES;

/**
 * pageVariables
 * Page fields and "return to application" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  START_NEW_APPLICATION_URL: START,
  RETURN_TO_APPLICATION_URL: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
});

/**
 * get
 * Render the check your answers start new applcation page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} check your answers start new applcation page
 */
export const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.CHECK_YOUR_ANSWERS.START_NEW_APPLICATION,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(referenceNumber),
      formattedSubmissionDeadline: formatDate(new Date(application.submissionDeadline)),
    });
  } catch (err) {
    console.error('Error getting check your answers - start new applcation', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
