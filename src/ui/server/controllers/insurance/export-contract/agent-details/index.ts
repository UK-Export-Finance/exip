import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import api from '../../../../api';
import { isPopulatedArray } from '../../../../helpers/array';
import mapCountries from '../../../../helpers/mappings/map-countries';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/export-contract-agent';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, ResponseInsurance } from '../../../../../types';

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: { AGENT_SERVICE, AGENT_SERVICE_CHANGE, AGENT_SERVICE_CHECK_AND_CHANGE, AGENT_DETAILS_SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = EXPORT_CONTRACT_FIELD_IDS;

export const FIELD_IDS = [NAME, FULL_ADDRESS, COUNTRY_CODE];

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_DETAILS;

export const TEMPLATE = TEMPLATES.INSURANCE.EXPORT_CONTRACT.AGENT_DETAILS;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {number} referenceNumber: Application reference number
 * @returns {object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    NAME: {
      ID: NAME,
      ...FIELDS.AGENT_DETAILS[NAME],
    },
    FULL_ADDRESS: {
      ID: FULL_ADDRESS,
      ...FIELDS.AGENT_DETAILS[FULL_ADDRESS],
    },
    COUNTRY_CODE: {
      ID: COUNTRY_CODE,
      ...FIELDS.AGENT_DETAILS[COUNTRY_CODE],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${AGENT_DETAILS_SAVE_AND_BACK}`,
});

/**
 * get
 * Get the application and render the "Agent details" page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} "Agent details" page
 */
export const get = async (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  try {
    const countries = await api.keystone.countries.getAll();

    const mappedCountries = mapCountries(countries, application.exportContract.agent[COUNTRY_CODE]);

    if (!isPopulatedArray(countries)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(application.referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      countries: mappedCountries,
    });
  } catch (error) {
    console.error('Error getting countries %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check for validation errors and if successful, redirect to the next part of the flow.
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

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    try {
      const countries = await api.keystone.countries.getAll();

      const mappedCountries = mapCountries(countries, payload[COUNTRY_CODE]);

      if (!isPopulatedArray(countries)) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(application.referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(application),
        submittedValues: payload,
        validationErrors,
        countries: mappedCountries,
      });
    } catch (error) {
      console.error('Error getting countries %o', error);

      return res.redirect(PROBLEM_WITH_SERVICE);
    }
  }

  try {
    const saveResponse = await mapAndSave.exportContractAgent(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    /**
     * If the route is a "change" route,
     * redirect to AGENT_SERVICE_CHANGE.
     */
    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${AGENT_SERVICE_CHANGE}`);
    }

    /**
     * If the route is a "check and change" route,
     * redirect to AGENT_SERVICE_CHECK_AND_CHANGE form.
     * Otherwise, redirect to CHECK_YOUR_ANSWERS.
     */
    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${AGENT_SERVICE_CHECK_AND_CHANGE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${AGENT_SERVICE}`);
  } catch (error) {
    console.error('Error updating application - export contract - agent details %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
