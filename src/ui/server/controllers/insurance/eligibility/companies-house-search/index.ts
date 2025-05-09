import { PAGES } from '../../../../content-strings';
import { ELIGIBILITY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/eligibility';
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
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { CompaniesHouseResponse, Request, Response } from '../../../../../types';
import isChangeRoute from '../../../../helpers/is-change-route';

const {
  ELIGIBILITY: {
    COMPANIES_HOUSE: { COMPANY_NUMBER },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    PROBLEM_WITH_SERVICE,
    ELIGIBILITY: { COMPANY_DETAILS, COMPANY_NOT_ACTIVE_EXIT, COMPANIES_HOUSE_UNAVAILABLE_EXIT },
  },
} = ROUTES;

export const FIELD_ID = COMPANY_NUMBER;

export const PAGE_VARIABLES = {
  FIELD: {
    ID: FIELD_ID,
    ...FIELDS[FIELD_ID],
  },
};

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER;

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_SEARCH;

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
    submittedValues: req.session.submittedData.insuranceEligibility?.company || {},
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

    /**
     * Companies house API call was successful. No errors and the company is active.
     * 1) Map the returned company details.
     * 2) Add mapped data to the session.
     * 3) Redirect to the next part of the flow, COMPANY_DETAILS.
     */
    const mappedCompanyDetails = mapCompaniesHouseData(response);

    const sessionUpdate = { company: mappedCompanyDetails };

    req.session.submittedData = {
      ...req.session.submittedData,
      insuranceEligibility: updateSubmittedData(sessionUpdate, req.session.submittedData.insuranceEligibility),
    };

    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${COMPANY_DETAILS}/change`);
    }

    return res.redirect(COMPANY_DETAILS);
  } catch (error) {
    console.error('Error calling companies house %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
