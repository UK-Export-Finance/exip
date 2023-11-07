import { PAGES } from '../../../../content-strings';
import { FIELDS_ELIGIBILITY as FIELDS } from '../../../../content-strings/fields/insurance/eligibility';
import { ROUTES, TEMPLATES } from '../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../helpers/companies-house-search/validation';
import companiesHouse from '../../../../helpers/companies-house-search';
import mapCompaniesHouseData from '../../../../helpers/mappings/map-companies-house-data';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { CompaniesHouseResponse, Request, Response } from '../../../../../types';

const {
  ELIGIBILITY: {
    COMPANIES_HOUSE: { COMPANY_NUMBER },
  },
} = INSURANCE_FIELD_IDS;

const {
  PROBLEM_WITH_SERVICE,
  INSURANCE: {
    ELIGIBILITY: { COMPANY_DETAILS, COMPANY_NOT_ACTIVE, COMPANIES_HOUSE_UNAVAILABLE },
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
        submittedValues: req.body,
      });
    }

    /**
     * 1) Call companies house API (via our own API)
     * 4) If validationErrors are returned, render the page with validation errors.
     * 2) If apiError is returned, redirect to COMPANIES_HOUSE_UNAVAILABLE.
     * 3) If the company is not active, redirect to COMPANY_NOT_ACTIVE.
     * 4) If validationErrors are returned, render the page with validation errors.
     */
    const response = await companiesHouse.search(payload);

    if (response.notFound) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...PAGE_VARIABLES,
        validationErrors: generateValidationErrors({}),
        submittedValues: req.body,
      });
    }

    if (response.apiError) {
      return res.redirect(COMPANIES_HOUSE_UNAVAILABLE);
    }

    if (!response.company?.isActive) {
      return res.redirect(COMPANY_NOT_ACTIVE);
    }

    /**
     * Companies house API call was successful. No errors and the company is active.
     * 1) Map the returned company details.
     * 2) Add mapped data to the session.
     * 3) Redirect to the next part of the flow, COMPANY_DETAILS.
     */
    const companyObj = { ...response.company };

    const mappedCompanyDetails = mapCompaniesHouseData(companyObj);

    const sessionUpdate = { company: mappedCompanyDetails };

    req.session.submittedData = {
      ...req.session.submittedData,
      insuranceEligibility: updateSubmittedData(sessionUpdate, req.session.submittedData.insuranceEligibility),
    };

    return res.redirect(COMPANY_DETAILS);
  } catch (err) {
    console.error('Error calling companies house %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
