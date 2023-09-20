import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import ACCOUNT_FIELD_IDS from '../../../../constants/field-ids/insurance/account';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import constructPayload from '../../../../helpers/construct-payload';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import api from '../../../../api';
import { Request, Response } from '../../../../../types';

const { EMAIL, PASSWORD } = ACCOUNT_FIELD_IDS;

const {
  INSURANCE: {
    ACCOUNT: {
      SIGN_IN: { ENTER_CODE },
      CREATE: { CONFIRM_EMAIL_RESENT },
      SUSPENDED: { ROOT: SUSPENDED_ROOT },
    },
    DASHBOARD,
  },
} = ROUTES;

export const FIELD_IDS = [EMAIL, PASSWORD];

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
    /**
     * User is already signed in.
     * Redirect to the dashboard.
     */
    return res.redirect(DASHBOARD);
  }

  const successFlash = req.flash('successBanner');
  const renderSuccessBanner = successFlash.includes('newAccountVerified') || false;

  const importantFlash = req.flash('importantBanner');

  const hasSignedOut = importantFlash.includes('successfulSignOut') || false;

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    ...PAGE_VARIABLES,
    userName: getUserNameFromSession(req.session.user),
    renderSuccessBanner,
    renderImportantBanner: hasSignedOut,
    renderBackLink: !hasSignedOut,
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
  const payload = constructPayload(req.body, FIELD_IDS);

  let validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...PAGE_VARIABLES,
      renderBackLink: true,
      userName: getUserNameFromSession(req.session.user),
      submittedValues: payload,
      validationErrors,
    });
  }

  try {
    // validate credentials
    const sanitisedData = sanitiseData(payload);

    const email = sanitisedData[EMAIL];
    const password = String(sanitisedData[PASSWORD]);

    const urlOrigin = req.headers.origin;

    const response = await api.keystone.account.signIn(urlOrigin, email, password);

    const { accountId } = response;

    if (response.success) {
      req.session.accountId = accountId;

      return res.redirect(ENTER_CODE);
    }

    if (response.resentVerificationEmail) {
      return res.redirect(`${CONFIRM_EMAIL_RESENT}?id=${accountId}`);
    }

    if (response.isBlocked) {
      return res.redirect(`${SUSPENDED_ROOT}?id=${accountId}`);
    }

    // invalid credentials - force validation errors by mimicking empty form submission
    validationErrors = generateValidationErrors({});

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...PAGE_VARIABLES,
      renderBackLink: true,
      userName: getUserNameFromSession(req.session.user),
      submittedValues: payload,
      validationErrors,
    });
  } catch (err) {
    console.error('Error signing in account %O', err);
    return res.redirect(ROUTES.INSURANCE.PROBLEM_WITH_SERVICE);
  }
};
