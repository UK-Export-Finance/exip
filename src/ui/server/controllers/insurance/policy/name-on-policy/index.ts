import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { TEMPLATES } from '../../../../constants';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import getNameEmailPositionFromOwnerAndPolicy from '../../../../helpers/get-name-email-position-from-owner-and-policy';
import mapAndSave from '../map-and-save/policy-contact';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  POLICY: { DIFFERENT_NAME_ON_POLICY, DIFFERENT_NAME_ON_POLICY_CHANGE, NAME_ON_POLICY_SAVE_AND_BACK, CHECK_YOUR_ANSWERS, PRE_CREDIT_PERIOD },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

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

  const submittedValues = getNameEmailPositionFromOwnerAndPolicy(application.owner, application.policyContact);

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.NAME_ON_POLICY,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(application.referenceNumber),
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

  const { referenceNumber } = application;

  const payload = constructPayload(req.body, FIELD_IDS);

  const isSameAsOwner = payload[NAME] === SAME_NAME;

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    /**
     * have to get name of owner to render radio (radio uses name and email of owner)
     * combine submitted answers with the payload to ensure that the name shows on the radio
     */
    const nameOfOwner = getNameEmailPositionFromOwnerAndPolicy(application.owner, application.policyContact);

    const submittedValues = {
      ...nameOfOwner,
      ...payload,
    };

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.NAME_ON_POLICY,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(application.referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      application,
      submittedValues,
      validationErrors,
    });
  }

  try {
    let redirectRoute = `${INSURANCE_ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`;

    const differentNameOnPolicyRoute = `${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY}`;

    if (payload[NAME] === OTHER_NAME) {
      redirectRoute = differentNameOnPolicyRoute;
    }

    // save the application
    const saveResponse = await mapAndSave.policyContact(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (isChangeRoute(req.originalUrl)) {
      /**
       * If change route and "not the same as owner" answer is submitted,
       * redirect to different name on policy page with /change in URL.
       * This ensures that the next page can consume /change in the URL
       * and therefore correctly redirect on submission.
       */
      if (!isSameAsOwner) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      /**
       * If check-and-change route and "not the same as owner" answer is submitted,
       * redirect to different name on policy page with /check-and-change in url.
       * This ensures that the next page can consume /check-and-change in the URL
       * and therefore correctly redirect on submission.
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
