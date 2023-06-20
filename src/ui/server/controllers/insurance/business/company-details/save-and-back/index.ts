import { Request, Response } from '../../../../../../types';
import { ROUTES, FIELD_IDS } from '../../../../../constants';
import companiesHouseSearch from '../helpers/companies-house-search.helper';
import companyDetailsValidation from '../validation/company-details';
import mapAndSave from '../../map-and-save/company-details';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

const { COMPANY_HOUSE_SEARCH, COMPANY_DETAILS: COMPANY_DETAILS_ROUTE, NO_COMPANIES_HOUSE_NUMBER, COMPANY_DETAILS_SAVE_AND_BACK } = EXPORTER_BUSINESS_ROUTES;

const pageVariables = (referenceNumber: number) => ({
  POST_ROUTES: {
    COMPANIES_HOUSE: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_HOUSE_SEARCH}`,
    COMPANY_DETAILS: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROUTE}`,
    SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_SAVE_AND_BACK}`,
    NO_COMPANIES_HOUSE_NUMBER: `${INSURANCE_ROOT}/${referenceNumber}${NO_COMPANIES_HOUSE_NUMBER}`,
  },
  FIELDS: EXPORTER_BUSINESS,
});

/**
 * saves and goes back to all sections from company details page unless there are database errors
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} redirects to all sections page on success
 */
const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    const { referenceNumber } = req.params;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { body } = req;
    // runs companiesHouse validation and api call first for companiesHouse input
    const response = await companiesHouseSearch(body);
    let { validationErrors } = response;
    const { company } = response;

    // run validation on other fields on page
    validationErrors = companyDetailsValidation(body, validationErrors);

    // body for update containing companies house info and request body
    const updateBody = {
      ...body,
      ...company,
    };

    // runs save and go back commmand
    const saveResponse = await mapAndSave.companyDetails(updateBody, application, validationErrors);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    // redirect to all sections page
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating application - your business - company details (save and back)', { err });

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, post };
