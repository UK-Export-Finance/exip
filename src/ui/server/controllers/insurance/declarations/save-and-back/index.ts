import { ROUTES } from '../../../../constants';
import { Request, Response } from '../../../../../types';
import hasFormData from '../../../../helpers/has-form-data';
import save from '../save-data';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS },
} = ROUTES;

/**
 * post
 * Save Declarations - confidentiality field if provided and if successful, redirect to the all sections page
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
      const saveResponse = await save.declaration(application, req.body);

      if (!saveResponse) {
        return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
      }
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating application - declarations (save and back) ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
