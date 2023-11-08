import { FIELD_IDS } from '..';
import { ROUTES } from '../../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../../constants/field-ids/insurance/business';
import constructPayload from '../../../../../helpers/construct-payload';
import companyDetailsValidation from '../validation/company-details';
import mapAndSave from '../../map-and-save/company-details';
import { Request, Response } from '../../../../../../types';

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

const { COMPANY_DETAILS: COMPANY_DETAILS_ROUTE, COMPANY_DETAILS_SAVE_AND_BACK } = EXPORTER_BUSINESS_ROUTES;

const pageVariables = (referenceNumber: number) => ({
  POST_ROUTES: {
    COMPANY_DETAILS: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROUTE}`,
    SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_SAVE_AND_BACK}`,
  },
  FIELDS: BUSINESS_FIELD_IDS,
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

    const payload = constructPayload(body, FIELD_IDS);

    const validationErrors = companyDetailsValidation(payload);

    // runs save and go back command
    const saveResponse = await mapAndSave.companyDetails(payload, application, validationErrors);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    // redirect to all sections page
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating application - your business - company details (save and back) %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, post };
