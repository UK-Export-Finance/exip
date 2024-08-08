import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import sectionStartPageVariables from '../../../helpers/page-variables/core/insurance/section-start';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../types';

const {
  EXPORT_CONTRACT: { HOW_WAS_THE_CONTRACT_AWARDED },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

export const TEMPLATE = TEMPLATES.SHARED_PAGES.SECTION_START;

/**
 * get
 * Render the "Insurance export contract - start" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Export contract - start page
 */
export const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    return res.render(TEMPLATE, {
      ...sectionStartPageVariables({
        REFERENCE_NUMBER: referenceNumber,
        START_NOW_ROUTE: HOW_WAS_THE_CONTRACT_AWARDED,
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORT_CONTRACT.ROOT,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
    });
  } catch (error) {
    console.error('Error getting credit control %O', error);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
