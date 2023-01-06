import { ROUTES } from '../../../../../constants';
import { Request, Response } from '../../../../../../types';
import hasFormData from '../../../../../helpers/has-form-data';
import generateValidationErrors from '../validation';
import mapAndSave from '../../map-and-save';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS },
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
    const { application } = res.locals;

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = req.params;

    if (hasFormData(req.body)) {
      const validationErrors = generateValidationErrors(req.body);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await mapAndSave.policyAndExport(req.body, application, validationErrors);
      } else {
        saveResponse = await mapAndSave.policyAndExport(req.body, application);
      }

      if (!saveResponse) {
        return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
      }
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating application', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
