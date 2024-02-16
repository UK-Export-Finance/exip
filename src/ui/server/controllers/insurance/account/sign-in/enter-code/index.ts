import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../../helpers/construct-payload';
import { sanitiseData, sanitiseValue } from '../../../../../helpers/sanitise-data';
import mapEligibilityAnswers from '../../../../../helpers/map-eligibility-answers';
import generateValidationErrors from './validation';
import securityCodeValidationErrors from './validation/rules/access-code';
import canCreateAnApplication from '../../../../../helpers/can-create-an-application';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

const {
  ACCOUNT: { ACCESS_CODE },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    ACCOUNT: {
      SIGN_IN: { ROOT: SIGN_IN_ROOT },
    },
    INSURANCE_ROOT,
    DASHBOARD,
    ALL_SECTIONS,
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

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
       * 1) Sanitise and store eligibility answers.
       * 2) Remove eligibility answers from the session.
       * 3) Create an application
       * 4) Redirect to the next part of the flow - "dashboard"
       */
      if (canCreateAnApplication(req.session)) {
        const sanitisedData = sanitiseData(req.session.submittedData.insuranceEligibility);

        const eligibilityAnswers = mapEligibilityAnswers(sanitisedData);

        req.session.submittedData.insuranceEligibility = {};

        const application = await api.keystone.application.create(eligibilityAnswers, accountId);

        if (!application) {
          console.error('Error creating application');
          return res.redirect(PROBLEM_WITH_SERVICE);
        }
      }

      const { applications } = await api.keystone.applications.getAll(req.session.user.id);

      /**
       * if there is only 1 application for the user
       * then redirect straight to that application's all sections section
       */
      if (applications && applications.length === 1) {
        const referenceNumber = applications[0]?.referenceNumber;
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
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
    console.error('Error verifying account sign in code %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
