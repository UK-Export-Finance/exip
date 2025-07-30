import { FIELD_IDS } from '..';
import { ROUTES } from '../../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../../constants/field-ids/insurance/business';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../validation';
import mapAndSave from '../../map-and-save/company-details';
import { Request, ResponseInsurance } from '../../../../../../types';

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

const { COMPANY_DETAILS_SAVE_AND_BACK } = EXPORTER_BUSINESS_ROUTES;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @returns {object} Page variables
 */
const pageVariables = (referenceNumber: number) => ({
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_SAVE_AND_BACK}`,
  FIELDS: BUSINESS_FIELD_IDS,
});

/**
 * saves and goes back to all sections from company details page unless there are API errors
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.redirect} redirects to all sections page on success
 */
const post = async (req: Request, res: ResponseInsurance) => {
  try {
    const { application } = res.locals;

    const { referenceNumber } = req.params;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { body } = req;

    const payload = constructPayload(body, FIELD_IDS);

    const validationErrors = generateValidationErrors(payload);

    const saveResponse = await mapAndSave.companyDetails(payload, application, validationErrors);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (error) {
    console.error('Error updating application - your business - company details (save and back) %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, post };
