import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../../../types';

const {
  ACCOUNT: { SECURITY_CODE },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: { DASHBOARD },
} = ROUTES;

/**
 * PAGE_VARIABLES
 * Page fields
 * @returns {Object} Page variables
 */
export const PAGE_VARIABLES = {
  FIELD: {
    ID: SECURITY_CODE,
    ...FIELDS[SECURITY_CODE],
  },
};

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.SIGN_IN.ENTER_CODE;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SIGN_IN.ENTER_CODE;

/**
 * get
 * Render the Enter code page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Enter code page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    ...PAGE_VARIABLES,
  });

/**
 * post
 * Temporary redirect to the dashboard route.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = (req: Request, res: Response) => res.redirect(DASHBOARD);
