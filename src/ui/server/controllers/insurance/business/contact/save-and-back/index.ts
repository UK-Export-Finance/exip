import { Request, Response } from '../../../../../../types';
import { ROUTES } from '../../../../../constants';
import generateValidationErrors from '../validation';
import mapAndSave from '../../map-and-save/contact';
const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;
import constructPayload from '../../../../../helpers/construct-payload';
import { FIELD_IDS } from '..';

/**
 * saves and goes back to all sections from contact page unless there are api errors
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

    // run validation on inputs
    const validationErrors = generateValidationErrors(payload);

    // runs save and go back command
    const saveResponse = await mapAndSave.contact(payload, application, validationErrors);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    // redirect to all sections page
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating application - your business - contact (save and back) %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { post };
