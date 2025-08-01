import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { objectHasKeysAndValues } from '../../../../helpers/object';
import generateValidationErrors from './validation';
import { isMultiplePolicyType, isSinglePolicyType } from '../../../../helpers/policy-type';
import constructPayload from '../../../../helpers/construct-payload';
import mapAndSave from '../map-and-save/policy';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, ResponseInsurance } from '../../../../../types';

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  POLICY: {
    TYPE_OF_POLICY_SAVE_AND_BACK,
    SINGLE_CONTRACT_POLICY,
    SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
    MULTIPLE_CONTRACT_POLICY,
    MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  TYPE_OF_POLICY: { POLICY_TYPE: FIELD_ID },
} = POLICY_FIELD_IDS;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {number} referenceNumber: Application reference number
 * @returns {object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD: FIELDS[FIELD_ID],
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.TYPE_OF_POLICY;

export const FIELD_IDS = [FIELD_ID];

/**
 * get
 * Get the application and render the Type of policy page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} Type of policy page
 */
export const get = (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.TYPE_OF_POLICY,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(application.referenceNumber),
    userName: getUserNameFromSession(req.session.user),
    application: mapApplicationToFormFields(res.locals.application),
  });
};

/**
 * post
 * Check Type of policy validation errors and if successful, send to the API and redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = application;

  const payload = constructPayload(req.body, FIELD_IDS);

  // check for form errors.
  const validationErrors = generateValidationErrors(payload);

  if (objectHasKeysAndValues(validationErrors)) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.TYPE_OF_POLICY,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(application.referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      validationErrors,
    });
  }

  try {
    // save the application
    const saveResponse = await mapAndSave.policy(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const singlePolicyRoute = `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`;
    const multiplePolicyRoute = `${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}`;

    /**
     * If the route is a "change" route,
     * redirect to the appropriate "change" route (single or multiple policy route).
     */
    if (isChangeRoute(req.originalUrl)) {
      if (isSinglePolicyType(payload[FIELD_ID])) {
        return res.redirect(`${singlePolicyRoute}/change`);
      }

      if (isMultiplePolicyType(payload[FIELD_ID])) {
        return res.redirect(`${multiplePolicyRoute}/change`);
      }
    }

    /**
     * If the route is a "check and change" route,
     * redirect to the application's "check your answers - policy type" (single or multiple) route.
     */
    if (isCheckAndChangeRoute(req.originalUrl)) {
      if (isSinglePolicyType(payload[FIELD_ID])) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`);
      }

      if (isMultiplePolicyType(payload[FIELD_ID])) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`);
      }
    }

    /**
     * Otherwise, the route is not a "change" or "check and change".
     * User is going through the initial policy type flow,
     * Therefore, redirect to the next part of the flow (single or multiple policy route).
     */
    if (isSinglePolicyType(payload[FIELD_ID])) {
      return res.redirect(singlePolicyRoute);
    }

    if (isMultiplePolicyType(payload[FIELD_ID])) {
      return res.redirect(multiplePolicyRoute);
    }

    return res.redirect(PROBLEM_WITH_SERVICE);
  } catch (error) {
    console.error('Error updating application - policy - type of policy %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
