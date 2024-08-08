import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, TEMPLATES } from '../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../../helpers/construct-payload';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import securityCodeValidationErrors from './validation/rules/access-code';
import canCreateAnApplication from '../../../../../helpers/can-create-an-application';
import application from '../../../../../helpers/create-an-application';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

const {
  ACCOUNT: { ACCESS_CODE },
} = FIELD_IDS.INSURANCE;

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
  INSURANCE_ROOT,
  DASHBOARD,
  ALL_SECTIONS,
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

export const FIELD_ID = ACCESS_CODE;

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
  if (req.session.user?.id) {
    /**
     * User is already signed in.
     * Redirect to the dashboard.
     */
    return res.redirect(DASHBOARD);
  }

  if (!req.session.accountId) {
    /**
     * No account ID is in the session.
     * We cannot make an API call in the POST without this.
     * Therefore, redirect to the sign in route.
     */
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

    const payload = constructPayload(req.body, [FIELD_ID]);

    const submittedCode = payload[FIELD_ID];

    const securityCode = sanitiseValue({
      key: FIELD_ID,
      value: submittedCode,
    });

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

    const response = await api.keystone.account.verifyAccountSignInCode(req.session.accountId, String(securityCode));

    if (response.success) {
      /**
       * Valid sign in code provided.
       * Update the session and redirect to the dashboard
       */

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
       * 2) Redirect to the next part of the flow - ALL_SECTIONS or DASHBOARD
       */
      if (canCreateAnApplication(req.session)) {
        console.info('Account - sign in - enter code - can create an application for user %s', accountId);

        const createdApplication = await application.create(req.session.submittedData.insuranceEligibility, accountId);

        if (!createdApplication.success) {
          console.error('Error creating application');
          return res.redirect(PROBLEM_WITH_SERVICE);
        }

        if (createdApplication.success) {
          req.session.submittedData.insuranceEligibility = {};
        }
      }

      const { applications } = await api.keystone.applications.getAll(req.session.user.id);

      /**
       * If there is only 1 application for the user,
       * Redirect straight to the application's ALL_SECTIONS.
       */
      if (applications && applications.length === 1) {
        const [firstApplication] = applications;

        const { referenceNumber } = firstApplication;

        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
      }

      /**
       * Otherwise, more than 1 application exists.
       * Redirect to DASHBOARD.
       */
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
  } catch (error) {
    console.error('Error verifying account sign in code %O', error);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
