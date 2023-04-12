import { PAGES } from '../../../../content-strings';
import { TEMPLATES, ROUTES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../../types';

const { FEEDBACK_CONFIRMATION_PAGE } = PAGES;
const { FEEDBACK_CONFIRMATION: FEEDBACK_TEMPLATE } = TEMPLATES.INSURANCE;

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
        PAGE_CONTENT_STRINGS: FEEDBACK_CONFIRMATION_PAGE,
        BACK_LINK: req.headers.referer,
      }),
    });
  } catch (err) {
    console.error('Error getting insurance feedback page', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

/**
 * posts the feedback form
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders insurance feedback page
 */
const post = (req: Request, res: Response) => {
  try {
    const backToServiceUrl = req.flash('feedbackFrom');

    return res.redirect(backToServiceUrl);
  } catch (err) {
    console.error('Error posting insurance feedback page', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { get, post };
