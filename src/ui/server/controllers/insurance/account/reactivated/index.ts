import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.REACTIVATED;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.REACTIVATED;

const {
  ACCOUNT: { SIGN_IN },
} = INSURANCE_ROUTES;

/**
 * get
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Account reactivated page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    SIGN_IN_LINK: SIGN_IN.ROOT,
  });
