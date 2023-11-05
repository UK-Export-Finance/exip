import { PAGES } from '../../../../content-strings';
import { TEMPLATES, ROUTES } from '../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import { isPopulatedArray } from '../../../../helpers/array';
import mapAndSave from '../map-and-save/company-details';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';
import companiesHouseSearch from './helpers/companies-house-search.helper';

const {
  COMPANIES_HOUSE_NUMBER,
  COMPANY_HOUSE: { COMPANY_NUMBER },
} = BUSINESS_FIELD_IDS;

const { COMPANIES_HOUSE_NUMBER: CONTENT_STRINGS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { COMPANIES_HOUSE_NUMBER: COMPANIES_HOUSE_NUMBER_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

export const TEMPLATE = COMPANIES_HOUSE_NUMBER_TEMPLATE;

export const FIELD_ID = COMPANIES_HOUSE_NUMBER;

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS,
  PROBLEM_WITH_SERVICE,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
} = ROUTES.INSURANCE;

const { COMPANIES_HOUSE_NUMBER_SAVE_AND_BACK, COMPANIES_HOUSE_UNAVAILABLE, CHECK_YOUR_ANSWERS, COMPANY_DETAILS, NO_COMPANIES_HOUSE_NUMBER } = EXPORTER_BUSINESS;

const { COMPANIES_HOUSE_NUMBER: COMPANIES_HOUSE_NUMBER_FIELDS } = FIELDS;

const exitReason = {
  noCompaniesHouseNumber: PAGES.INSURANCE.APPLY_OFFLINE.REASON.NO_COMPANIES_HOUSE_NUMBER,
};

const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    COMPANIES_HOUSE_NUMBER: {
      ID: COMPANIES_HOUSE_NUMBER,
      ...COMPANIES_HOUSE_NUMBER_FIELDS[COMPANIES_HOUSE_NUMBER],
    },
  },
  EXIT_PAGE_URL: `${INSURANCE_ROOT}/${referenceNumber}${NO_COMPANIES_HOUSE_NUMBER}`,
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${COMPANIES_HOUSE_NUMBER_SAVE_AND_BACK}`,
});

/**
 * gets the template for companies house number page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders companies house number page with/without previously submitted number
 */
const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { company } = application;

    // values from application if they exist
    const submittedValues = {
      [COMPANIES_HOUSE_NUMBER]: company?.[COMPANY_NUMBER],
    };

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      submittedValues,
      ...pageVariables(application.referenceNumber),
    });
  } catch (err) {
    console.error('Error getting companies house number page %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

const redirectToExitPage = {
  /**
   * handles redirect to apply offline page if no companies house number link is pressed
   * @param {Express.Request} Express request
   * @param {Express.Response} Express response
   * @returns {Express.Response.redirect} redirects to apply offline page
   */
  noCompaniesHouseNumber: (req: Request, res: Response) => {
    req.flash('exitReason', exitReason.noCompaniesHouseNumber);

    return res.redirect(ROUTES.INSURANCE.APPLY_OFFLINE);
  },
};

/**
 * posts companies house number
 * runs validation and either renders template with errors or redirects to next page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} company details page with or without errors
 */
const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    const payload = constructPayload(req.body, [COMPANIES_HOUSE_NUMBER]);

    // runs companiesHouse validation and api call first for companiesHouse input
    const response = await companiesHouseSearch(payload);

    const { apiError, companiesHouseNumber, company } = response;

    // if error, then there is problem with api/service to redirect
    if (apiError) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${COMPANIES_HOUSE_UNAVAILABLE}`);
    }

    const { validationErrors } = response;

    // populate submittedValues
    const submittedValues = {
      [COMPANIES_HOUSE_NUMBER]: companiesHouseNumber,
    };

    // if any errors then render template with errors
    if (isPopulatedArray(Object.keys(validationErrors))) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(application.referenceNumber),
        validationErrors,
        submittedValues,
      });
    }

    const updateBody = {
      ...payload,
      ...company,
    };

    // if no errors, then runs save api call to db
    const saveResponse = await mapAndSave.companyDetails(updateBody, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS}`);
  } catch (err) {
    console.error('Error updating application - your business - companies house number %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, redirectToExitPage, post };
