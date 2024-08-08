import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES, PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../map-and-save/export-contract-agent';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  EXPORT_CONTRACT: { AGENT_DETAILS, AGENT_DETAILS_CHANGE, AGENT_DETAILS_CHECK_AND_CHANGE, AGENT_SAVE_AND_BACK, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const { USING_AGENT } = EXPORT_CONTRACT_FIELD_IDS;

export const FIELD_ID = USING_AGENT;

export const ERROR_MESSAGE = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT[FIELD_ID].IS_EMPTY;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.AGENT;

export const TEMPLATE = TEMPLATES.SHARED_PAGES.SINGLE_RADIO;

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
  FIELD: {
    ID: FIELD_ID,
    ...FIELDS.PRIVATE_MARKET[FIELD_ID],
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${AGENT_SAVE_AND_BACK}`,
});

/**
 * get
 * Get the application and render the "Agent" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Agent" page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  return res.render(TEMPLATE, {
    ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
    ...pageVariables(application.referenceNumber),
    userName: getUserNameFromSession(req.session.user),
    FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
    applicationAnswer: application.exportContract.agent[FIELD_ID],
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

  const payload = constructPayload(req.body, [FIELD_ID]);

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
      ...pageVariables(referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
      validationErrors,
    });
  }

  try {
    const saveResponse = await mapAndSave.exportContractAgent(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const isUsingAnAgent = payload[FIELD_ID] === 'true';

    /**
     * If the route is a "change" route,
     * the exporter is USING_AGENT,
     * redirect to AGENT_DETAILS form.
     * Otherwise, redirect to CHECK_YOUR_ANSWERS.
     */
    if (isChangeRoute(req.originalUrl)) {
      if (isUsingAnAgent) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${AGENT_DETAILS_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    /**
     * If the route is a "check and change" route,
     * the exporter is USING_AGENT,
     * redirect to AGENT_DETAILS_CHECK_AND_CHANGE form.
     * Otherwise, redirect to CHECK_YOUR_ANSWERS.
     */
    if (isCheckAndChangeRoute(req.originalUrl)) {
      if (isUsingAnAgent) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${AGENT_DETAILS_CHECK_AND_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    /**
     * If the exporter is USING_AGENT,
     * redirect to AGENT_DETAILS form.
     * Otherwise, redirect to CHECK_YOUR_ANSWERS.
     */
    if (isUsingAnAgent) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${AGENT_DETAILS}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
  } catch (error) {
    console.error('Error updating application - export contract - agent %O', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
