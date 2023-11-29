import { PAGES } from '../../../../../content-strings';
import { TEMPLATES } from '../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CURRENCY;

const { PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

/**
 * gets the template for turnover currency page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders turnover currency page with/without previously submitted details
 */
export const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CURRENCY,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
    });
  } catch (err) {
    console.error('Error getting turnover currency %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
