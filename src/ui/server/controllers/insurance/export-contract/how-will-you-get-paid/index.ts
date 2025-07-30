import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/export-contract';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, ResponseInsurance } from '../../../../../types';

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: { HOW_WILL_YOU_GET_PAID_SAVE_AND_BACK, PRIVATE_MARKET, PRIVATE_MARKET_CHANGE, PRIVATE_MARKET_CHECK_AND_CHANGE, AGENT, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: { HOW_WILL_YOU_GET_PAID },
  },
} = TEMPLATES;

export const FIELD_ID = PAYMENT_TERMS_DESCRIPTION;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.HOW_WILL_YOU_GET_PAID;

export const TEMPLATE = HOW_WILL_YOU_GET_PAID;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {number} referenceNumber: Application reference number
 * @returns {object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD: {
    ID: FIELD_ID,
    ...FIELDS.HOW_WILL_YOU_GET_PAID[FIELD_ID],
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${HOW_WILL_YOU_GET_PAID_SAVE_AND_BACK}`,
});

/**
 * get
 * Get the application and render the "How will you get paid" page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} "How will you get paid" page
 */
export const get = (req: Request, res: ResponseInsurance) => {
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
 * Check validation errors and if successful, redirect to the next part of the flow.
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
    // save the application
    const saveResponse = await mapAndSave.exportContract(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { totalContractValueOverThreshold } = application;

    if (isChangeRoute(req.originalUrl)) {
      /**
       * If the URL is a "change" route,
       * and totalContractValue is over the threshold,
       * or the application has been migrated from V1 to V2,
       * redirect to PRIVATE_MARKET with /change in URL.
       * This ensures that the next page can consume /change in the URL
       * and therefore correctly redirect on submission.
       */
      if (totalContractValueOverThreshold) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${PRIVATE_MARKET_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      /**
       * If the URL is a "check and change" route,
       * and totalContractValue is over the threshold,
       * or the application has been migrated from V1 to V2,
       * redirect to PRIVATE_MARKET with /check-and-change in URL.
       * This ensures that the next page can consume /check-and-change in the URL
       * and therefore correctly redirect on submission.
       * Otherwise, redirect to CHECK_AND_CHANGE_ROUTE.
       */
      if (totalContractValueOverThreshold) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${PRIVATE_MARKET_CHECK_AND_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    /**
     * if totalContractValue is over the threshold,
     * redirect to PRIVATE_MARKET.
     * otherwise it should redirect to the AGENT page
     */
    if (totalContractValueOverThreshold) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${PRIVATE_MARKET}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${AGENT}`);
  } catch (error) {
    console.error('Error updating application - export contract - how will you get paid %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
