import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import { sanitiseValue } from '../../../../helpers/sanitise-data';
import api from '../../../../api';
import accountDoesNotExistValidation from './validation/account-does-not-exist';
import { Request, Response } from '../../../../../types';

const {
  ACCOUNT: { EMAIL },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    ACCOUNT: {
      PASSWORD_RESET: { LINK_SENT },
      SUSPENDED: { ROOT: SUSPENDED_ROOT },
    },
  },
} = ROUTES;

export const FIELD_ID = EMAIL;

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
    console.info('Posting account password reset form');

    const payload = constructPayload(req.body, [FIELD_ID]);

    let validationErrors = generateValidationErrors(payload);

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

    const urlOrigin = req.headers.origin;

    const email = String(sanitiseValue({ value: payload[FIELD_ID] }));

    const response = await api.keystone.account.sendEmailPasswordResetLink(urlOrigin, email);

    if (response.isBlocked) {
      return res.redirect(`${SUSPENDED_ROOT}?id=${response.accountId}`);
    }

    if (response.success) {
      // store the email address in local session, for consumption in the next part of the flow.
      req.session.emailAddressForPasswordReset = email;

      return res.redirect(LINK_SENT);
    }

    // no account found
    validationErrors = accountDoesNotExistValidation();

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...PAGE_VARIABLES,
      submittedValues: payload,
      validationErrors,
    });
  } catch (err) {
    console.error('Error posting account password reset form %O', err);
    return res.redirect(ROUTES.INSURANCE.PROBLEM_WITH_SERVICE);
  }
};
