import { PAGES } from '../../../../../content-strings';
import { TEMPLATES } from '../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import ACCOUNT_FIELD_IDS from '../../../../../constants/field-ids/insurance/account';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import constructPayload from '../../../../../helpers/construct-payload';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import generateAccountAlreadyExistsValidation from './validation/account-already-exists/invalid-password';
import accountAlreadyExistsAlreadyVerifiedValidation from './validation/account-already-exists/already-verified';
import saveData from './save-data';
import canCreateAnApplication from '../../../../../helpers/can-create-an-application';
import application from '../../../../../helpers/create-an-application';
import { Request, Response } from '../../../../../../types';

const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD } = ACCOUNT_FIELD_IDS;

const {
  ACCOUNT: {
    CREATE: { CONFIRM_EMAIL },
    SIGN_IN,
    SUSPENDED: { EMAIL_SENT },
  },
  DASHBOARD,
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

export const FIELD_IDS = [FIRST_NAME, LAST_NAME, EMAIL, PASSWORD];

/**
 * PAGE_VARIABLES
 * Page fields
 * @returns {object} Page variables
 */
export const PAGE_VARIABLES = {
  FIELDS: {
    FIRST_NAME: {
      ID: FIRST_NAME,
      ...FIELDS.CREATE.YOUR_DETAILS[FIRST_NAME],
    },
    LAST_NAME: {
      ID: LAST_NAME,
      ...FIELDS.CREATE.YOUR_DETAILS[LAST_NAME],
    },
    EMAIL: {
      ID: EMAIL,
      ...FIELDS[EMAIL],
    },
    PASSWORD: {
      ID: PASSWORD,
      ...FIELDS.CREATE.YOUR_DETAILS[PASSWORD],
    },
  },
  SIGN_IN_LINK: SIGN_IN.ROOT,
};

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.CREATE.YOUR_DETAILS;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.YOUR_DETAILS;

/**
 * get
 * Render the Do you have an account page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Do you have an account page
 */
export const get = (req: Request, res: Response) => {
  if (req.session.user?.id) {
    /**
     * User is already signed in.
     * Redirect to the dashboard.
     */
    return res.redirect(DASHBOARD);
  }

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    ...PAGE_VARIABLES,
    userName: getUserNameFromSession(req.session.user),
  });
};

/**
 * post
 * Check  Do you have an account page validation errors and if successful, redirect to the next part of the flow.
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
      userName: getUserNameFromSession(req.session.user),
      submittedValues: payload,
      validationErrors,
    });
  }

  try {
    // save the account
    const urlOrigin = req.headers.origin;

    const saveResponse = await saveData.account(urlOrigin, payload);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { success, isVerified, isBlocked } = saveResponse;

    if (!success) {
      if (isVerified) {
        validationErrors = accountAlreadyExistsAlreadyVerifiedValidation();
      } else {
        validationErrors = generateAccountAlreadyExistsValidation();
      }

      if (validationErrors) {
        return res.render(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...PAGE_VARIABLES,
          userName: getUserNameFromSession(req.session.user),
          submittedValues: payload,
          validationErrors,
        });
      }
    }

    const accountId = saveResponse.id;

    /**
     * Store the account ID in local session,
     * for consumption in the next part of the flow.
     */
    req.session.accountIdToConfirm = accountId;

    /**
     * If there are eligibility answers in the session:
     * 1) Create an application
     * 2) Redirect to the next part of the flow - CONFIRM_EMAIL
     */
    if (canCreateAnApplication(req.session)) {
      console.info('Account - your details - can create an application for user %s', accountId);

      const createdApplication = await application.create(req.session.submittedData.insuranceEligibility, accountId);

      if (!createdApplication.success) {
        console.error('Error creating application');
        return res.redirect(PROBLEM_WITH_SERVICE);
      }

      if (createdApplication.success) {
        req.session.submittedData.insuranceEligibility = {};
      }
    }

    if (isBlocked) {
      return res.redirect(EMAIL_SENT);
    }

    return res.redirect(CONFIRM_EMAIL);
  } catch (error) {
    console.error('Error creating account %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
