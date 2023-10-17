import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import formatDate from '../../../../helpers/date/format-date';
import { Request, Response } from '../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.NEED_TO_START_NEW_APPLICATION;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    ALL_SECTIONS,
    ELIGIBILITY: { EXPORTER_LOCATION },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

/**
 * pageVariables
 * Page fields and "return to application" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  START_NEW_APPLICATION_URL: EXPORTER_LOCATION,
  RETURN_TO_APPLICATION_URL: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
});

/**
 * get
 * Render the check your answers start new application page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} check your answers start new application page
 */
export const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    const formattedSubmissionDeadline = formatDate(new Date(application.submissionDeadline));

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.CHECK_YOUR_ANSWERS.START_NEW_APPLICATION,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      ...pageVariables(referenceNumber),
      formattedSubmissionDeadline,
    });
  } catch (err) {
    console.error('Error getting check your answers - start new application %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
