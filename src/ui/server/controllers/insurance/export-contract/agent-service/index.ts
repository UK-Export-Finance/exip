import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/export-contract-agent-service';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  EXPORT_CONTRACT: { CHECK_YOUR_ANSWERS, AGENT_CHARGES, AGENT_SERVICE_SAVE_AND_BACK, AGENT_CHARGES_CHANGE, AGENT_CHARGES_CHECK_AND_CHANGE },
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const {
  AGENT_SERVICE: { IS_CHARGING, SERVICE_DESCRIPTION },
} = EXPORT_CONTRACT_FIELD_IDS;

export const FIELD_IDS = [IS_CHARGING, SERVICE_DESCRIPTION];

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_SERVICE;

export const TEMPLATE = TEMPLATES.INSURANCE.EXPORT_CONTRACT.AGENT_SERVICE;

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
};

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    IS_CHARGING: {
      ID: IS_CHARGING,
      ...FIELDS.AGENT_SERVICE[IS_CHARGING],
    },
    SERVICE_DESCRIPTION: {
      ID: SERVICE_DESCRIPTION,
      ...FIELDS.AGENT_SERVICE[SERVICE_DESCRIPTION],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${AGENT_SERVICE_SAVE_AND_BACK}`,
});

/**
 * get
 * Get the application and render the "Agent service" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Agent service" page
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
    application: mapApplicationToFormFields(application),
  });
};

/**
 * post
 * Check for validation errors and if successful, redirect to the next part of the flow.
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

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
        HTML_FLAGS,
      }),
      ...pageVariables(application.referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      submittedValues: sanitiseData(payload),
      validationErrors,
    });
  }

  try {
    const saveResponse = await mapAndSave.exportContractAgentService(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const agentIsCharging = payload[IS_CHARGING] === 'true';

    /**
     * If the route is a "change" route,
     * the agent is IS_CHARGING,
     * redirect to AGENT_CHARGES_CHANGE form.
     * Otherwise, redirect to CHECK_YOUR_ANSWERS.
     */
    if (isChangeRoute(req.originalUrl)) {
      if (agentIsCharging) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      if (agentIsCharging) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES_CHECK_AND_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    /**
     * If the agent is IS_CHARGING,
     * redirect to AGENT_CHARGES form.
     * Otherwise, redirect to CHECK_YOUR_ANSWERS.
     */
    if (agentIsCharging) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
  } catch (err) {
    console.error('Error updating application - export contract - agent service %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
