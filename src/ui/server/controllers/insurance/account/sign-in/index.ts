import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import api from '../../../../api';
import { Request, Response } from '../../../../../types';

const {
  ACCOUNT: { EMAIL, PASSWORD },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    ACCOUNT: {
      SIGN_IN: { ENTER_CODE },
    },
  },
} = ROUTES;

/**
 * PAGE_VARIABLES
 * Page fields
 * @returns {Object} Page variables
 */
export const PAGE_VARIABLES = {
  FIELDS: {
    EMAIL: {
      ID: EMAIL,
      ...FIELDS[EMAIL],
    },
    PASSWORD: {
      ID: PASSWORD,
      ...FIELDS.SIGN_IN[PASSWORD],
    },
  },
};

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.SIGN_IN.ROOT;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SIGN_IN.ROOT;

/**
 * get
 * Render the Sign in page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Sign in page
 */
export const get = (req: Request, res: Response) => {
  const flash = req.flash('successBanner');

  const renderSuccessBanner = flash.includes('newAccountVerified') || false;

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    ...PAGE_VARIABLES,
    renderSuccessBanner,
  });
};

/**
 * post
 * Check Sign in validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
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

  try {
    // validate credentials
    const email = req.body[EMAIL];
    const password = req.body[PASSWORD];

    const response = await api.keystone.account.signIn(email, password);

    if (response.success) {
      req.session.accountId = response.accountId;

      return res.redirect(ENTER_CODE);
    }

    // invalid credentials.
    // TODO: render the page with validation errors
    return res.redirect('/invalid-credentials');
  } catch (err) {
    console.error('Error signing in account', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
