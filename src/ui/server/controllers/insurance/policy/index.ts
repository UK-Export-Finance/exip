import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import sectionStartPageVariables from '../../../helpers/page-variables/core/insurance/section-start';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, ResponseInsurance } from '../../../../types';

const {
  POLICY: { TYPE_OF_POLICY },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

export const TEMPLATE = TEMPLATES.SHARED_PAGES.SECTION_START;

/**
 * get
 * Render the "Insurance policy - start" page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} Insurance policy - start page
 */
export const get = (req: Request, res: ResponseInsurance) => {
  try {
    const { application } = res.locals;

    return res.render(TEMPLATE, {
      ...sectionStartPageVariables({
        REFERENCE_NUMBER: application.referenceNumber,
        START_NOW_ROUTE: TYPE_OF_POLICY,
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.ROOT,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
    });
  } catch (error) {
    console.error('Error getting credit control %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
