import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS, ACCOUNT_FIELDS } from '../../../../content-strings/fields/insurance';
import ACCOUNT_FIELD_IDS from '../../../../constants/field-ids/insurance/account';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapNameFields from '../../../../helpers/mappings/map-name-fields';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/policy-contact';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  POLICY: { DIFFERENT_NAME_ON_POLICY_SAVE_AND_BACK, CHECK_YOUR_ANSWERS, PRE_CREDIT_PERIOD },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  DIFFERENT_NAME_ON_POLICY: { POLICY_CONTACT_DETAIL, POSITION },
} = POLICY_FIELD_IDS;
const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    FIRST_NAME: {
      ID: FIRST_NAME,
      ...ACCOUNT_FIELDS[FIRST_NAME],
    },
    LAST_NAME: {
      ID: LAST_NAME,
      ...ACCOUNT_FIELDS[LAST_NAME],
    },
    EMAIL_ADDRESS: {
      ID: EMAIL,
      ...ACCOUNT_FIELDS[EMAIL],
    },
    POSITION: {
      ID: POSITION,
      ...FIELDS.DIFFERENT_NAME_ON_POLICY[POSITION],
    },
    POLICY_CONTACT_DETAIL: {
      ID: POLICY_CONTACT_DETAIL,
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.DIFFERENT_NAME_ON_POLICY;

export const FIELD_IDS = [FIRST_NAME, LAST_NAME, EMAIL, POSITION];

/**
 * get
 * Get the application and render the Different name on policy page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Different name on policy page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.DIFFERENT_NAME_ON_POLICY,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(refNumber),
    userName: getUserNameFromSession(req.session.user),
    application,
    submittedValues: {
      ...application.policyContact,
      ...mapNameFields(application).policyContact,
    },
  });
};

/**
 * post
 * Check Different name on policy validation errors and if successful, redirect to the next part of the flow.
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

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.DIFFERENT_NAME_ON_POLICY,
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
    // save the application
    const saveResponse = await mapAndSave.policyContact(payload, application);
    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`);
  } catch (err) {
    console.error('Error updating application - policy - Different name on policy %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
