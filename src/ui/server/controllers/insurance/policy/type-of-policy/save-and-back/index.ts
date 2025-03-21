import { ROUTES } from '../../../../../constants';
import hasFormData from '../../../../../helpers/has-form-data';
import { FIELD_IDS } from '..';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../validation';
import callMapAndSave from '../../call-map-and-save';
import { Request, ResponseInsurance } from '../../../../../../types';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE },
} = ROUTES;

/**
 * post
 * Save any valid Type of policy fields and if successful, redirect to the all sections page
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

    if (hasFormData(req.body)) {
      const payload = constructPayload(req.body, FIELD_IDS);

      const saveResponse = await callMapAndSave(payload, application, generateValidationErrors(payload));

      if (!saveResponse) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (error) {
    console.error('Error updating application - policy - type of policy (save and back) %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
