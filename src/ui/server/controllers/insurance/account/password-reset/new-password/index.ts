import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import api from '../../../../../api';
import cannotUseNewPasswordValidation from './validation/cannot-use-new-password';
import { Request, Response } from '../../../../../../types';

const {
  INSURANCE: {
    ACCOUNT: {
      PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT, SUCCESS, EXPIRED_LINK, INVALID_LINK },
    },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

export const FIELD_ID = FIELD_IDS.INSURANCE.ACCOUNT.PASSWORD;

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

    const sanitisedToken = String(sanitiseValue({ value: token }));

    const response = await api.keystone.account.verifyPasswordResetToken(sanitisedToken);

    if (response.expired && response.accountId) {
      return res.redirect(`${EXPIRED_LINK}?id=${response.accountId}`);
    }

    if (response.invalid || !response.success) {
      return res.redirect(INVALID_LINK);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...PAGE_VARIABLES,
    });
  } catch (err) {
    console.error('Error verifying account password reset token %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
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

    const sanitisedToken = String(sanitiseValue({ value: token }));
    const payload = constructPayload(req.body, [FIELD_ID]);

    const validationErrors = generateValidationErrors(payload);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
        submittedValues: payload,
        validationErrors,
      });
    }

    const sanitisedPassword = String(sanitiseValue({ value: payload[FIELD_ID] }));

    const response = await api.keystone.account.passwordReset(sanitisedToken, sanitisedPassword);

    if (response.success) {
      // set a success flag for consumption in the next part of the flow.
      req.session.passwordResetSuccess = true;

      return res.redirect(SUCCESS);
    }

    if (response.hasBeenUsedBefore) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
        submittedValues: payload,
        validationErrors: cannotUseNewPasswordValidation(),
      });
    }

    return res.redirect(PROBLEM_WITH_SERVICE);
  } catch (err) {
    console.error('Error verifying account sign in code %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
