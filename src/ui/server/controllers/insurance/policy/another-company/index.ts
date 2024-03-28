import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES, PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../map-and-save/jointly-insured-party';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_ROOT, OTHER_COMPANY_DETAILS, ANOTHER_COMPANY_SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED },
} = POLICY_FIELD_IDS;

const { SHARED_PAGES } = TEMPLATES;

export const FIELD_ID = REQUESTED;

export const PAGE_CONTENT_STRINGS = {
  ...PAGES.INSURANCE.POLICY.ANOTHER_COMPANY,
  HINT: FIELDS.REQUESTED_JOINTLY_INSURED_PARTY[REQUESTED].HINT,
};

const {
  INSURANCE: {
    POLICY: {
      REQUESTED_JOINTLY_INSURED_PARTY: {
        [FIELD_ID]: { IS_EMPTY },
      },
    },
  },
} = ERROR_MESSAGES;

export const ERROR_MESSAGE = IS_EMPTY;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD_ID,
  FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ANOTHER_COMPANY_SAVE_AND_BACK}`,
});

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
};

export const TEMPLATE = SHARED_PAGES.SINGLE_RADIO;

/**
 * get
 * Get the application and render the Policy - Another company page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Policy - Another company page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
      HTML_FLAGS,
    }),
    ...pageVariables(application.referenceNumber),
    userName: getUserNameFromSession(req.session.user),
    submittedValues: application.policy.jointlyInsuredParty,
  });
};

/**
 * post
 * Check Policy - Another company validation errors and if successful, redirect to the next part of the flow.
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

  const payload = constructPayload(req.body, [FIELD_ID]);
  const sanitisedData = sanitiseData(payload);

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
        HTML_FLAGS,
      }),
      ...pageVariables(application.referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      application,
      submittedValues: sanitisedData,
      validationErrors,
    });
  }

  try {
    // save the application
    const saveResponse = await mapAndSave.jointlyInsuredParty(sanitisedData, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const answer = payload[FIELD_ID];

    if (answer === 'true') {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${OTHER_COMPANY_DETAILS}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_ROOT}`);
  } catch (err) {
    console.error('Error updating application - policy - another company %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
