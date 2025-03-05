import { ROUTES } from '../../../../../constants';
import { FIELD_IDS } from '..';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../validation';
import mapAndSave from '../../map-and-save/policy-contact';
import { Request, ResponseInsurance } from '../../../../../../types';

const {
  INSURANCE: { INSURANCE_ROOT, PROBLEM_WITH_SERVICE, ALL_SECTIONS },
} = ROUTES;

/**
 * post
 * Save valid name on policy fields and redirect to all-sections
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: ResponseInsurance) => {
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
  } catch (error) {
    console.error('Error updating application - policy - name on policy - save and back %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
