import { FIELD_IDS } from '..';
import { ROUTES } from '../../../../../constants';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../validation';
import mapAndSave from '../../map-and-save/buyer-trading-history';
import { Request, Response } from '../../../../../../types';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

/**
 * saves and goes back to all sections from trading history page unless there are API errors
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

    const payload = constructPayload(req.body, FIELD_IDS);

    // run validation on inputs
    const validationErrors = generateValidationErrors(payload);

    // runs save and go back command
    const saveResponse = await mapAndSave.buyerTradingHistory(payload, application, validationErrors);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    // redirect to all sections page
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating application - Your buyer - Trading history (save and back) %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { post };
