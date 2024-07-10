import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import hasFormData from '../../../../../helpers/has-form-data';
import { FIELD_IDS } from '..';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../validation';
import mapAndSave from '../../map-and-save/export-contract-agent';
import { Request, Response } from '../../../../../../types';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;
/**
 * post
 * Save any valid "Agent details" form fields and if successful, redirect to the all sections page
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

    /**
     * If form data is populated:
     * 1) generate a payload.
     * 2) generate validation errors.
     * 3) call mapAndSave
     * 4) redirect
     */
    if (hasFormData(req.body)) {
      const payload = constructPayload(req.body, FIELD_IDS);

      const validationErrors = generateValidationErrors(payload);

      const saveResponse = await mapAndSave.exportContractAgent(payload, application, validationErrors);

      if (!saveResponse) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating application - export contract - agent details (save and back) %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
