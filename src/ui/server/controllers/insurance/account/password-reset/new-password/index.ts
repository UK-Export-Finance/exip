import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

const {
  ACCOUNT: { PASSWORD: FIELD_ID },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    ACCOUNT: {
      PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT, SUCCESS, LINK_EXPIRED },
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
    ...FIELDS.NEW_PASSWORD[FIELD_ID],
  },
};

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.PASSWORD_RESET.NEW_PASSWORD;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.NEW_PASSWORD;

/**
 * get
 * Verify the token is valid and if so, render the New password page.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} New password page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.redirect(PASSWORD_RESET_ROOT);
    }

    const response = await api.keystone.account.verifyPasswordResetToken(token);

    if (!response.success || response.expired) {
      return res.redirect(LINK_EXPIRED);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...PAGE_VARIABLES,
    });
  } catch (err) {
    console.error('Error verifying account password reset token', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check New password validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or validation errors
 */
export const post = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.redirect(PASSWORD_RESET_ROOT);
    }

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

    const password = String(sanitiseValue(FIELD_ID, req.body[FIELD_ID]));

    const response = await api.keystone.account.passwordReset(token, password);

    if (response.success) {
      // set a success flag for consumption in the next part of the flow.
      req.session.passwordResetSuccess = true;

      return res.redirect(SUCCESS);
    }

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  } catch (err) {
    console.error('Error verifying account sign in code', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
