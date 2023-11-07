import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../types';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS },
} = ROUTES;

export const TEMPLATE = TEMPLATES.INSURANCE.COMPLETE_OTHER_SECTIONS;

/**
 * get
 * Render the Complete other sections page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Complete other sections page
 */
export const get = (req: Request, res: Response) => {
  const { referenceNumber } = req.params;

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.COMPLETE_OTHER_SECTIONS,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
    TASK_LIST_URL: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
  });
};
