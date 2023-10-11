import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { FIELD_IDS } from '..';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../validation';
import { Request, Response } from '../../../../../../types';
import mapAndSave from '../../map-and-save/policy-contact';

const { INSURANCE_ROOT, PROBLEM_WITH_SERVICE, ALL_SECTIONS } = INSURANCE_ROUTES;

/**
 * post
 * Save valid different name on policy fields and redirect to all-sections
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;

  const payload = constructPayload(req.body, FIELD_IDS);

  const validationErrors = generateValidationErrors(payload);

  try {
    // save the application
    const saveResponse = await mapAndSave.policyContact(payload, application, validationErrors);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating application - policy and exports - Different name on policy - save and back %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
