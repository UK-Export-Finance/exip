import { ROUTES } from '../../../../../constants';
import { Request, Response } from '../../../../../../types';
import hasFormData from '../../../../../helpers/has-form-data';
import { FIELD_IDS } from '..';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../validation';
import callMapAndSave from '../../call-map-and-save';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE },
} = ROUTES;

/**
 * post
 * Save any valid Multiple contract policy fields and if successful, redirect to the all sections page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} All sections page or error page
 */
export const post = async (req: Request, res: Response) => {
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
  } catch (err) {
    console.error('Error updating application - policy and exports - multiple contract policy (save and back)', { err });

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
