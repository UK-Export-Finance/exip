import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import securityCodeValidationErrors from './validation/rules/security-code';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

const {
  ACCOUNT: { SECURITY_CODE: FIELD_ID },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    ACCOUNT: {
      SIGN_IN: { ROOT: SIGN_IN_ROOT },
    },
    DASHBOARD,
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
    ...FIELDS[FIELD_ID],
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
export const get = (req: Request, res: Response) => {
  if (!req.session.accountId) {
    return res.redirect(SIGN_IN_ROOT);
  }

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    ...PAGE_VARIABLES,
  });
};

/**
 * post
 * Validate sign in code
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or validation errors
 */
export const post = async (req: Request, res: Response) => {
  try {
    if (!req.session.accountId) {
      return res.redirect(SIGN_IN_ROOT);
    }

    const securityCode = req.body[FIELD_ID];

    let validationErrors = generateValidationErrors(req.body);

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

    const response = await api.keystone.account.verifyAccountSignInCode(req.session.accountId, securityCode);

    // valid sign in code - update the session and redirect to the dashboard
    if (response.success) {
      req.session.user = {
        id: response.accountId,
        firstName: response.firstName,
        lastName: response.lastName,
        token: response.token,
        expires: response.expires,
      };

      return res.redirect(DASHBOARD);
    }

    // incorrect sign in code - force validation errors by mimicking empty form submission)
    validationErrors = securityCodeValidationErrors({}, {});

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...PAGE_VARIABLES,
      submittedValues: req.body,
      validationErrors,
    });
  } catch (err) {
    console.error('Error verifying account sign in code', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
