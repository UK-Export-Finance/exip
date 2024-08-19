import { PAGES } from '../../../../content-strings';
import { FIELDS_ELIGIBILITY as FIELDS } from '../../../../content-strings/fields/insurance/eligibility';
import { ERROR_MESSAGES } from '../../../../content-strings/error-messages';
import { ROUTES, TEMPLATES } from '../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../helpers/companies-house-search/validation';
import generateValidationErrorsHelper from '../../../../helpers/validation';
import companiesHouse from '../../../../helpers/companies-house-search';
import mapCompaniesHouseData from '../../../../helpers/mappings/map-companies-house-data';
import saveData from '../save-data/companies-house-search-data';
import { CompaniesHouseResponse, Request, Response } from '../../../../../types';

const {
  ELIGIBILITY: {
    COMPANIES_HOUSE: { COMPANY_NUMBER },
  },
} = INSURANCE_FIELD_IDS;

const {
  PROBLEM_WITH_SERVICE,
  INSURANCE: {
    ELIGIBILITY: { COMPANY_NOT_ACTIVE_EXIT, COMPANIES_HOUSE_UNAVAILABLE_EXIT },
    EXPORTER_BUSINESS: { COMPANY_DETAILS_ROOT },
    INSURANCE_ROOT,
  },
} = ROUTES;

export const FIELD_ID = COMPANY_NUMBER;

export const PAGE_VARIABLES = {
  FIELD: {
    ID: FIELD_ID,
    ...FIELDS[FIELD_ID],
  },
};

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.ENTER_COMPANIES_HOUSE_NUMBER;

export const TEMPLATE = TEMPLATES.INSURANCE.EXPORTER_BUSINESS.ENTER_COMPANIES_HOUSE_NUMBER;

/**
 * get
 * Render the "Companies house search" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Companies house search page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
    ...PAGE_VARIABLES,
  });

/**
 * post
 * Post the "Companies house search" form
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or validation errors
 */
export const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    const payload = constructPayload(req.body, [FIELD_ID]) as CompaniesHouseResponse;

    /**
     * Check that a companies house number has been provided.
     * If not, render the template with validation errors.
     */
    const formValidationErrors = generateValidationErrors(payload);

    if (formValidationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...PAGE_VARIABLES,
        validationErrors: formValidationErrors,
        submittedValues: payload,
      });
    }

    /**
     * 1) Call companies house API (via our own API)
     * 2) If notFound is returned, render the page with validation errors.
     * 3) If apiError is returned, redirect to COMPANIES_HOUSE_UNAVAILABLE.
     * 4) If the company is not active, redirect to COMPANY_NOT_ACTIVE.
     */
    const response = await companiesHouse.search(payload[FIELD_ID]);

    if (response.notFound) {
      const errorMessage = ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].NOT_FOUND;

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...PAGE_VARIABLES,
        validationErrors: generateValidationErrorsHelper(FIELD_ID, errorMessage, {}),
        submittedValues: payload,
      });
    }

    if (response.apiError) {
      return res.redirect(COMPANIES_HOUSE_UNAVAILABLE_EXIT);
    }

    if (!response.isActive) {
      return res.redirect(COMPANY_NOT_ACTIVE_EXIT);
    }

    const mappedData = mapCompaniesHouseData(response);

    const saveResponse = await saveData.companyDetailsPostMigration(application, mappedData);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROOT}`);
  } catch (error) {
    console.error('Error updating application - your business - company house search (post data migration) %O', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
