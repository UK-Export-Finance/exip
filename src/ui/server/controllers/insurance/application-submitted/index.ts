import { ROUTES, TEMPLATES } from '../../../constants';
import { PAGES } from '../../../content-strings';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.APPLICATION_SUBMITTED;

// TODO: additional checks i.e application is actually submitted

/**
 * get
 * Get the application and render the Application submitted page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Application submitted page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.APPLICATION_SUBMITTED,
      BACK_LINK: req.headers.referer,
    }),
    application,
  });
};
