import { Request, Response } from '../../../../../../types';
import { TEMPLATES, ROUTES } from '../../../../../constants';
import generateValidationErrors from '../validation';
import turnover from '../../map-and-save/turnover';

const { TURNOVER: TURNOVER_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

export const TEMPLATE = TURNOVER_TEMPLATE;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

/**
 * saves and goes back to all sections from turnover page unless there are database errors
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
    // run validation on inputs
    const validationErrors = generateValidationErrors(body);

    // runs save and go back commmand
    const saveResponse = await turnover.mapAndSave(body, application, validationErrors);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    // redirect to all sections page
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating application - your business - turnover (save and back)', { err });

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { post };
