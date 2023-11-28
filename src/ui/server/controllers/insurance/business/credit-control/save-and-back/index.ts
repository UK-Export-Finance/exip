import { Request, Response } from '../../../../../../types';
import { TEMPLATES, ROUTES } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../../map-and-save/business';
import { FIELD_ID } from '..';

const { BROKER: BROKER_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

export const TEMPLATE = BROKER_TEMPLATE;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

/**
 * saves and goes back to all sections from credit control page unless there are API errors
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

    const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS[FIELD_ID].IS_EMPTY);

    if (!validationErrors) {
      /**
       * call mapAndSave to call the API.
       */
      const saveResponse = await mapAndSave.business(payload, application);

      if (!saveResponse) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }
    }

    // redirect to all sections page
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating application - your business - credit control (save and back) %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { post };
