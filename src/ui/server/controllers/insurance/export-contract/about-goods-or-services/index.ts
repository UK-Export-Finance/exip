import { ATTRIBUTES, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import api from '../../../../api';
import { isPopulatedArray } from '../../../../helpers/array';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import getCountryByIsoCode from '../../../../helpers/get-country-by-iso-code';
import mapCountries from '../../../../helpers/mappings/map-countries';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import mapAndSave from '../map-and-save/export-contract';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: { ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK, HOW_WILL_YOU_GET_PAID, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION_KNOWN, FINAL_DESTINATION },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: { ABOUT_GOODS_OR_SERVICES },
  },
  PARTIALS: {
    INSURANCE: { EXPORT_CONTRACT },
  },
} = TEMPLATES;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    DESCRIPTION: {
      ID: DESCRIPTION,
      ...FIELDS.ABOUT_GOODS_OR_SERVICES[DESCRIPTION],
    },
    FINAL_DESTINATION_KNOWN: {
      ID: FINAL_DESTINATION_KNOWN,
      ...FIELDS.ABOUT_GOODS_OR_SERVICES[FINAL_DESTINATION_KNOWN],
    },
    FINAL_DESTINATION: {
      ID: FINAL_DESTINATION,
      ...FIELDS.ABOUT_GOODS_OR_SERVICES[FINAL_DESTINATION],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK}`,
});

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.ABOUT_GOODS_OR_SERVICES;

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  CONDITIONAL_YES_HTML: EXPORT_CONTRACT.ABOUT_GOODS_OR_SERVICES.CONDITIONAL_YES_HTML,
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
  LEGEND_CLASS: ATTRIBUTES.CLASSES.LEGEND.M,
};

export const TEMPLATE = ABOUT_GOODS_OR_SERVICES;

export const FIELD_IDS = [DESCRIPTION, FINAL_DESTINATION, FINAL_DESTINATION_KNOWN];

/**
 * get
 * Get the application and render the About goods or services page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} About goods or services page
 */
export const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  try {
    const countries = await api.keystone.countries.getAll();

    if (!isPopulatedArray(countries)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const mappedCountries = mapCountries(countries, application.exportContract[FINAL_DESTINATION]);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
        HTML_FLAGS,
      }),
      ...pageVariables(application.referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      countries: mappedCountries,
    });
  } catch (err) {
    console.error('Error getting countries %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check About goods or services validation errors and if successful, redirect to the next part of the flow.
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

  let countries;

  try {
    countries = await api.keystone.countries.getAll();

    if (validationErrors) {
      if (!isPopulatedArray(countries)) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }

      const submittedCountry = getCountryByIsoCode(countries, payload[FINAL_DESTINATION]);

      const mappedCountries = mapCountries(countries, submittedCountry?.isoCode);

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application,
        submittedValues: sanitiseData(payload),
        countries: mappedCountries,
        validationErrors,
      });
    }
  } catch (err) {
    console.error('Error getting countries %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  try {
    // save the application

    const saveResponse = await mapAndSave.exportContract(payload, application, validationErrors, countries);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${HOW_WILL_YOU_GET_PAID}`);
  } catch (err) {
    console.error('Error updating application - export contract - about goods or services %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
