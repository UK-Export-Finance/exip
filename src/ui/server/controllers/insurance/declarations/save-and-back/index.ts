import { ROUTES } from '../../../../constants';
import DECLARATIONS_FIELD_IDS from '../../../../constants/field-ids/insurance/declarations';
import hasFormData from '../../../../helpers/has-form-data';
import constructPayload from '../../../../helpers/construct-payload';
import save from '../save-data';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE },
} = ROUTES;

export const FIELD_IDS = Object.values(DECLARATIONS_FIELD_IDS);

/**
 * post
 * Save Declarations - confidentiality field if provided and if successful, redirect to the all sections page
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

      const saveResponse = await save.declaration(application, payload);

      if (!saveResponse) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating application - declarations (save and back) %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
