import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import generateAccountAlreadyExistsValidationErrors from './validation/account-already-exists';
import saveData from './save-data';
import canCreateAnApplication from '../../../../../helpers/can-create-an-application';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { CONFIRM_EMAIL },
      SIGN_IN,
    },
    DASHBOARD,
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

/**
 * PAGE_VARIABLES
 * Page fields
 * @returns {Object} Page variables
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
 * Render the Do you already have an account page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Do you already have an account page
 */
export const get = (req: Request, res: Response) => {
  if (req.session.user?.id) {
    // user is already signed in
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
 * Check  Do you already have an account page validation errors and if successful, redirect to the next part of the flow.
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
    // save the account
    const urlOrigin = req.headers.origin;

    const saveResponse = await saveData.account(urlOrigin, req.body);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (!saveResponse.success) {
      validationErrors = generateAccountAlreadyExistsValidationErrors();

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
    }

    const accountId = saveResponse.id;

    /**
     * Store the account ID in local session,
     * for consumption in the next part of the flow.
     */
    req.session.accountIdToConfirm = accountId;

    /**
     * If there are eligibility answers in the session:
     * 1) Add requestedApplicationCreation to the session
     * 2) Create an application
     * 3) Remove requestedApplicationCreation from the session
     * 4) Remove eligibility answers in the session.
     * 5) Redirect to the next part of the flow - "confirm email"
     */
    if (canCreateAnApplication(req.session)) {
      req.session.requestedApplicationCreation = true;

      const eligibilityAnswers = sanitiseData(req.session.submittedData.insuranceEligibility);

      const application = await api.keystone.application.create(eligibilityAnswers, accountId);

      req.session.requestedApplicationCreation = false;

      if (!application) {
        console.error('Error creating application');
        return res.redirect(PROBLEM_WITH_SERVICE);
      }

      req.session.submittedData.insuranceEligibility = {};
    }

    return res.redirect(CONFIRM_EMAIL);
  } catch (err) {
    console.error('Error creating account', { err });

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
