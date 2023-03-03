import { Request, Response } from '../../../../../../types';
import { ROUTES } from '../../../../../constants';
import generateValidationErrors from '../validation';
import mapAndSave from '../../map-and-save';

const { INSURANCE_ROOT, ALL_SECTIONS } = ROUTES.INSURANCE;

/**
 * saves and goes back to all sections from working with buyer page unless there are database errors
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} redirects to all sections page on success
 */
const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    const { referenceNumber } = req.params;

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const { body } = req;
    // run validation on inputs
    const validationErrors = generateValidationErrors(body);

    // runs save and go back commmand
    const saveResponse = await mapAndSave.yourBuyer(body, application, validationErrors);

    if (!saveResponse) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    // redirect to all sections page
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating application - your buyer - working with buyer (save and back)', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { post };
