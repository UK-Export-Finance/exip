import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES, PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/private-market';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: { AGENT, DECLINED_BY_PRIVATE_MARKET_SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  PRIVATE_MARKET: { DECLINED_DESCRIPTION },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: { DECLINED_BY_PRIVATE_MARKET },
  },
} = TEMPLATES;

export const FIELD_ID = DECLINED_DESCRIPTION;

export const ERROR_MESSAGE = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT.PRIVATE_MARKET[FIELD_ID].IS_EMPTY;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.DECLINED_BY_PRIVATE_MARKET;

export const TEMPLATE = DECLINED_BY_PRIVATE_MARKET;

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
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${DECLINED_BY_PRIVATE_MARKET_SAVE_AND_BACK}`,
});

/**
 * get
 * Get the application and render the "Declined by private market" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Declined by private market" page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  return res.render(TEMPLATE, {
    ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer }),
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

  const payload = constructPayload(req.body, [FIELD_ID]);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer }),
      ...pageVariables(referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      submittedValues: payload,
      validationErrors,
    });
  }

  try {
    const saveResponse = await mapAndSave.privateMarket(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${AGENT}`);
  } catch (err) {
    console.error('Error updating application - export contract - declined by private market %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
