import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { POLICY_AND_EXPORTS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import api from '../../../../api';
import isPopulatedArray from '../../../../helpers/is-populated-array';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { objectHasProperty } from '../../../../helpers/object';
import generateValidationErrors from './validation';
import mapCountries from '../../../../helpers/mappings/map-countries';
import mapAndSave from '../map-and-save';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY_AND_EXPORTS: { ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK, CHECK_YOUR_ANSWERS },
    CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  },
} = ROUTES;

const {
  POLICY_AND_EXPORTS: { ABOUT_GOODS_OR_SERVICES },
} = FIELD_IDS.INSURANCE;

const { DESCRIPTION, FINAL_DESTINATION } = ABOUT_GOODS_OR_SERVICES;

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
    FINAL_DESTINATION: {
      ID: FINAL_DESTINATION,
      ...FIELDS.ABOUT_GOODS_OR_SERVICES[FINAL_DESTINATION],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES;

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
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  try {
    const countries = await api.keystone.countries.getAll();

    if (!isPopulatedArray(countries)) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    let mappedCountries;

    if (objectHasProperty(application.policyAndExport, FINAL_DESTINATION)) {
      mappedCountries = mapCountries(countries, application.policyAndExport[FINAL_DESTINATION]);
    } else {
      mappedCountries = mapCountries(countries);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(refNumber),
      user: req.session.user,
      application,
      countries: mappedCountries,
    });
  } catch (err) {
    console.error('Error getting countries ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
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
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    try {
      const countries = await api.keystone.countries.getAll();

      if (!isPopulatedArray(countries)) {
        return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
      }

      let mappedCountries;

      if (objectHasProperty(req.body, FINAL_DESTINATION)) {
        mappedCountries = mapCountries(countries, req.body[FINAL_DESTINATION]);
      } else {
        mappedCountries = mapCountries(countries);
      }

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        user: req.session.user,
        application,
        submittedValues: req.body,
        countries: mappedCountries,
        validationErrors,
      });
    } catch (err) {
      console.error('Error getting countries ', { err });

      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }
  }

  try {
    // save the application
    const saveResponse = await mapAndSave.policyAndExport(req.body, application);

    if (!saveResponse) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
  } catch (err) {
    console.error('Error updating application - policy and exports - about goods or services', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
