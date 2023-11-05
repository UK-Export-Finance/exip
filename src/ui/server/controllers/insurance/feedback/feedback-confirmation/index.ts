import { PAGES } from '../../../../content-strings';
import { TEMPLATES, ROUTES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';

const { FEEDBACK_SENT_PAGE } = PAGES;
const { FEEDBACK_SENT: FEEDBACK_TEMPLATE } = TEMPLATES.INSURANCE;

export const TEMPLATE = FEEDBACK_TEMPLATE;

/**
 * gets the template for the feedback page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders insurance feedback page
 */
const get = (req: Request, res: Response) => {
  try {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: FEEDBACK_SENT_PAGE,
        BACK_LINK: req.headers.referer,
      }),
      // flash from feedback-form controller to redirect back to service
      BACK_TO_SERVICE_URL: req.flash('serviceOriginUrl'),
      userName: getUserNameFromSession(req.session.user),
    });
  } catch (err) {
    console.error('Error getting insurance feedback page %O', err);
    return res.redirect(ROUTES.INSURANCE.PROBLEM_WITH_SERVICE);
  }
};

export { get };
