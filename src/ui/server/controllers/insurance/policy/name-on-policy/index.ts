import { ROUTES, TEMPLATES } from '../../../../constants';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import { Request, Response } from '../../../../../types';
import getNameEmailPositionFromOwnerAndPolicy from '../../../../helpers/get-name-email-position-from-owner-and-policy';
import mapAndSave from '../map-and-save/policy-contact';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY: { NAME_ON_POLICY_SAVE_AND_BACK, CHECK_YOUR_ANSWERS, DIFFERENT_NAME_ON_POLICY },
    CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

const {
  NAME_ON_POLICY: { NAME, POSITION, OTHER_NAME, SAME_NAME },
} = POLICY_FIELD_IDS;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    NAME_ON_POLICY: {
      ID: NAME,
      ...FIELDS.NAME_ON_POLICY,
    },
    POSITION: {
      ID: POSITION,
      ...FIELDS.NAME_ON_POLICY[POSITION],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.NAME_ON_POLICY;

export const FIELD_IDS = [NAME, POSITION];

/**
 * get
 * Get the application and render the Name on policy page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Name on policy page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  const submittedValues = getNameEmailPositionFromOwnerAndPolicy(application.owner, application.policyContact);

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.NAME_ON_POLICY,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(refNumber),
    userName: getUserNameFromSession(req.session.user),
    application,
    submittedValues,
  });
};

/**
 * post
 * Check Name on policy validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  const payload = constructPayload(req.body, FIELD_IDS);

  const isSameAsOwner = payload[NAME] === SAME_NAME;

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.NAME_ON_POLICY,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(refNumber),
      userName: getUserNameFromSession(req.session.user),
      application,
      submittedValues: payload,
      validationErrors,
    });
  }

  try {
    let redirectRoute = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    const differentNameOnPolicyRoute = `${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY}`;

    if (payload[NAME] === OTHER_NAME) {
      redirectRoute = differentNameOnPolicyRoute;
    }
    // // save the application
    const saveResponse = await mapAndSave.policyContact(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      /**
       * if check-and-change route
       * if someone else is selected then redirects to different name on policy page with /check-and-change in url
       * ensures that redirects to next page and once submitted, then redirects back to check and change page
       */
      if (!isSameAsOwner) {
        return res.redirect(`${differentNameOnPolicyRoute}/check-and-change`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(redirectRoute);
  } catch (err) {
    console.error('Error updating application - policy - name on policy %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
