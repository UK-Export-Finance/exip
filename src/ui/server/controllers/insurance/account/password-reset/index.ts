import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import { sanitiseValue } from '../../../../helpers/sanitise-data';
import api from '../../../../api';
import { Request, Response } from '../../../../../types';

const {
  ACCOUNT: { EMAIL: FIELD_ID },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    ACCOUNT: {
      PASSWORD_RESET: { LINK_SENT },
    },
  },
} = ROUTES;

/**
 * PAGE_VARIABLES
 * Page fields
 * @returns {Object} Page variables
 */
export const PAGE_VARIABLES = {
  FIELD: {
    ID: FIELD_ID,
    ...FIELDS.PASSWORD_RESET[FIELD_ID],
  },
};

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.PASSWORD_RESET.ROOT;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.ROOT;

/**
 * get
 * Render the Password reset page
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
 * Check Password reset validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or validation errors
 */
export const post = async (req: Request, res: Response) => {
  try {
    const email = String(sanitiseValue(FIELD_ID, req.body[FIELD_ID]));

    const validationErrors = generateValidationErrors(req.body);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
        submittedValues: req.body,
        validationErrors,
      });
    }

    const response = await api.keystone.account.sendEmailPasswordResetLink(email);

    if (response.success) {
      // store the email address in local session, for consumption in the next part of the flow.
      req.session.emailAddressForPasswordReset = email;

      return res.redirect(LINK_SENT);
    }

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  } catch (err) {
    console.error('Error verifying account sign in code', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
