import { TEMPLATES, ROUTES } from '../../../../../constants';
import { FIELD_IDS } from '..';
import generateValidationErrors from '../validation';
import mapAndSave from '../../map-and-save/business';
import constructPayload from '../../../../../helpers/construct-payload';
import { Request, ResponseInsurance } from '../../../../../../types';

const { NATURE_OF_YOUR_BUSINESS: NATURE_OF_YOUR_BUSINESS_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

export const TEMPLATE = NATURE_OF_YOUR_BUSINESS_TEMPLATE;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

/**
 * saves and goes back to all sections from nature of your business page unless there are API errors
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

    const saveResponse = await mapAndSave.business(payload, application, validationErrors);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (error) {
    console.error('Error updating application - your business - nature of your business (save and back) %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { post };
