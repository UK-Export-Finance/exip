import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { eligibilitySummaryList } from '../../../../helpers/summary-lists/eligibility';

export const TEMPLATE = TEMPLATES.INSURANCE.CHECK_YOUR_ANSWERS;

const {
  PROBLEM_WITH_SERVICE,
  INSURANCE: {
    START,
    INSURANCE_ROOT,
    CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
  },
} = ROUTES;

/**
 * get
 * Render the check your answers eligibility page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} check your answers eligibility page
 */
export const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const summaryList = eligibilitySummaryList(application.eligibility);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.CHECK_YOUR_ANSWERS.ELIGIBILITY,
        BACK_LINK: req.headers.referer,
      }),
      START_NEW_APPLICATION: START,
      renderNotificationBanner: true,
      eligibility: true,
      SUMMARY_LIST: summaryList,
    });
  } catch (err) {
    console.error('Error getting check your answers - eligibility', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = req.params;

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`);
  } catch (err) {
    console.error('Error posting check your answers - eligibility', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
