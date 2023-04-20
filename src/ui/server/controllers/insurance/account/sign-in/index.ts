import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import { sanitiseData } from '../../../../helpers/sanitise-data';
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
    DASHBOARD,
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
  if (req.session.user?.id) {
    // user is already signed in
    return res.redirect(DASHBOARD);
  }

  const successFlash = req.flash('successBanner');
  const renderSuccessBanner = successFlash.includes('newAccountVerified') || false;

  const importantFlash = req.flash('importantBanner');
  const renderImportantBanner = importantFlash.includes('successfulSignOut') || false;

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    ...PAGE_VARIABLES,
    userName: getUserNameFromSession(req.session.user),
    renderSuccessBanner,
    renderImportantBanner,
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
  let validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...PAGE_VARIABLES,
      userName: getUserNameFromSession(req.session.user),
      submittedValues: req.body,
      validationErrors,
    });
  }

  try {
    // validate credentials
    const sanitisedData = sanitiseData(req.body);

    const email = sanitisedData[EMAIL];
    const password = sanitisedData[PASSWORD];

    const response = await api.keystone.account.signIn(email, password);

    if (response.success) {
      req.session.accountId = response.accountId;

      return res.redirect(ENTER_CODE);
    }

    // invalid credentials - force validation errors by mimicking empty form submission
    validationErrors = generateValidationErrors({});

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...PAGE_VARIABLES,
      userName: getUserNameFromSession(req.session.user),
      submittedValues: req.body,
      validationErrors,
    });
  } catch (err) {
    console.error('Error signing in account', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
