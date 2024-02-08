import { Request, Response } from '../../../../../../types';
import { ROUTES } from '../../../../../constants';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../../map-and-save/jointly-insured-party';
import { FIELD_ID, ERROR_MESSAGE } from '..';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

/**
 * saves and goes back to all sections from Policy - Another company page unless there are API errors
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

    const payload = constructPayload(body, [FIELD_ID]);

    // run validation on inputs
    const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

    if (!validationErrors) {
      // runs save and go back command
      const saveResponse = await mapAndSave.jointlyInsuredParty(payload, application);

      if (!saveResponse) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }
    }

    // redirect to all sections page
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating application - policy - another company (save and back) %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { post };
