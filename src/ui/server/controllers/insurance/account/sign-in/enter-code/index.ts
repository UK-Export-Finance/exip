import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import { sanitiseData, sanitiseValue } from '../../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import securityCodeValidationErrors from './validation/rules/security-code';
import canCreateAnApplication from '../../../../../helpers/can-create-an-application';
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
    PROBLEM_WITH_SERVICE,
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

  const flash = req.flash('successBanner');

  const renderSuccessBanner = flash.includes('newSecurityCodeSent') || false;

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    ...PAGE_VARIABLES,
    userName: getUserNameFromSession(req.session.user),
    renderSuccessBanner,
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

    const securityCode = sanitiseValue(FIELD_ID, req.body[FIELD_ID]);

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

    const response = await api.keystone.account.verifyAccountSignInCode(req.session.accountId, String(securityCode));

    // valid sign in code - update the session and redirect to the dashboard
    if (response.success) {
      const { accountId, firstName, lastName, email, token, expires } = response;

      req.session.user = {
        id: accountId,
        firstName,
        lastName,
        email,
        token,
        expires,
      };

      /**
       * If there are eligibility answers in the session:
       * 1) Create an application
       * 2) Wipe the eligibility answers in the session.
       */
      if (canCreateAnApplication(req.session)) {
        const eligibilityAnswers = sanitiseData(req.session.submittedData.insuranceEligibility);

        const application = await api.keystone.application.create(eligibilityAnswers, accountId);

        if (!application) {
          console.error('Error creating application');
          return res.redirect(PROBLEM_WITH_SERVICE);
        }

        req.session.submittedData.insuranceEligibility = {};
      }

      // otherwise, redirect to the next part of the flow - dashboard
      return res.redirect(DASHBOARD);
    }

    // incorrect sign in code - force validation errors by mimicking empty form submission
    validationErrors = securityCodeValidationErrors({}, {});

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
    console.error('Error verifying account sign in code', { err });
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
