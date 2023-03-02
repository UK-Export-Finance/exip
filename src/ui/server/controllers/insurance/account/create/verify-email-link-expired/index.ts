import { TEMPLATES } from '../../../../../constants';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../constants/routes/insurance';
import { PAGES } from '../../../../../content-strings';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.CREATE.VERIFY_EMAIL_LINK_EXPIRED;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.VERIFY_EMAIL_LINK_EXPIRED;

const {
  ACCOUNT: {
    CREATE: { CONFIRM_EMAIL },
  },
} = ROUTES;

/**
 * get
 * Verify email link expired page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Verify email link expired page
 */
export const get = async (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: CONFIRM_EMAIL,
    }),
  });
