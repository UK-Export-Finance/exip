import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../../types';

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = INSURANCE_ROUTES;

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.INVALID_LINK;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.INVALID_LINK;

/**
 * get
 * Render the generic "Account - invalid link" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Generic "Account - invalid link" page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    SIGN_IN_URL: SIGN_IN_ROOT,
  });
