import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import hasFormData from '../../../../../helpers/has-form-data';
import { ERROR_MESSAGE, FIELD_ID } from '..';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../../map-and-save/private-market';
import { Request, ResponseInsurance } from '../../../../../../types';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;
/**
 * post
 * Save any valid "Private market" form fields and if successful, redirect to the all sections page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.redirect} All sections page or error page
 */
export const post = async (req: Request, res: ResponseInsurance) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = req.params;

    /**
     * If form data is populated:
     * 1) generate a payload.
     * 2) generate validation errors.
     * 3) call mapAndSave
     * 4) redirect
     */
    if (hasFormData(req.body)) {
      const payload = constructPayload(req.body, [FIELD_ID]);

      const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

      const saveResponse = await mapAndSave.privateMarket(payload, application, validationErrors);

      if (!saveResponse) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (error) {
    console.error('Error updating application - export contract - private market (save and back) %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
