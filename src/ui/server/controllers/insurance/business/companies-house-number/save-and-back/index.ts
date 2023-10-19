import BUSINESS_FIELD_IDS from '../../../../../constants/field-ids/insurance/business';
import { ROUTES } from '../../../../../constants';
import constructPayload from '../../../../../helpers/construct-payload';
import mapAndSave from '../../map-and-save/company-details';
import { Request, Response } from '../../../../../../types';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

const { COMPANIES_HOUSE_NUMBER } = BUSINESS_FIELD_IDS;

const FIELD_ID = COMPANIES_HOUSE_NUMBER;

/**
 * saves and goes back to all sections from company house number page unless there are database errors
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
    // const response = await companiesHouseSearch(body);
    // const { validationErrors } = response;

    // const { company } = response;

    // const payload = constructPayload(body, [FIELD_ID]);

    // // body for update containing companies house info and request body
    // const updateBody = {
    //   ...payload,
    //   ...company,
    // };

    // // runs save and go back command
    // const saveResponse = await mapAndSave.companyDetails(updateBody, application, validationErrors);

    // if (!saveResponse) {
    //   return res.redirect(PROBLEM_WITH_SERVICE);
    // }

    // redirect to all sections page
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating application - your business - companies house number (save and back) %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { post };
