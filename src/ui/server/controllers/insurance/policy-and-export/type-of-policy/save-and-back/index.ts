import { ROUTES } from '../../../../../constants';
import { Request, Response } from '../../../../../../types';
import hasFormData from '../../../../../helpers/has-form-data';
import generateValidationErrors from '../validation';
import save from '../../save-data';

const {
  INSURANCE: { INSURANCE_ROOT },
} = ROUTES;

/**
 * post
 * Save any valid Type of policy fields and if successful, redirect to the all sections page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} All sections page or error page
 */
export const post = async (req: Request, res: Response) => {
  try {
    const { referenceNumber } = req.params;

    if (hasFormData(req.body)) {
      const validationErrors = generateValidationErrors(req.body);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.policyAndExport(Number(referenceNumber), req.body, validationErrors.errorList);
      } else {
        saveResponse = await save.policyAndExport(Number(referenceNumber), req.body);
      }

      if (!saveResponse) {
        return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
      }
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating application', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
