import { FIELDS, PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import companiesHouse from '../../../../helpers/companies-house-search';
import mapCompaniesHouseData from '../../../../helpers/mappings/map-companies-house-data';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';

const {
  ELIGIBILITY: { COMPANIES_HOUSE_NUMBER },
} = INSURANCE_FIELD_IDS;

const {
  PROBLEM_WITH_SERVICE,
  INSURANCE: {
    ELIGIBILITY: { COMPANY_DETAILS },
  },
} = ROUTES;

export const FIELD_ID = COMPANIES_HOUSE_NUMBER;

export const PAGE_VARIABLES = {
  FIELD: {
    ID: FIELD_ID,
    ...FIELDS[FIELD_ID],
  },
};

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER;

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_SEARCH;

export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
    ...PAGE_VARIABLES,
    submittedValues: req.session.submittedData.insuranceEligibility,
  });

export const post = async (req: Request, res: Response) => {
  try {
    const payload = constructPayload(req.body, [FIELD_ID]);

    /**
     * Check that a companies house number has been provided.
     * If not, render the template with validation errors.
     */
    const validationErrors = generateValidationErrors(payload);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...PAGE_VARIABLES,
        validationErrors,
      });
    }

    /**
     * 1) Call companies house API (via our own API)
     */
    const response = await companiesHouse.search(payload);

    // const { apiError, companiesHouseNumber, company } = response;
    // const company } = response;

    // if (apiError) {
    //   return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${COMPANIES_HOUSE_UNAVAILABLE}`);
    // }

    const companyObj = { ...response.company };

    const mappedCompanyDetails = mapCompaniesHouseData(companyObj);

    req.session.submittedData = {
      ...req.session.submittedData,
      insuranceEligibility: updateSubmittedData(mappedCompanyDetails, req.session.submittedData.insuranceEligibility),
    };

    return res.redirect(COMPANY_DETAILS);
  } catch (err) {
    console.error('Error calling companies house %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
