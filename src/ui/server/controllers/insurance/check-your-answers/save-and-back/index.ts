import { ROUTES } from '../../../../constants';
import save from '../save-data';
import { Request, Response } from '../../../../../types';

const {
  PROBLEM_WITH_SERVICE,
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS },
} = ROUTES;

/**
 * post
 * Save check your answers section review and if successful, redirect to the all sections page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} All sections page or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;

  try {
    // save the application
    const saveResponse = await save.sectionReview(application, req.body);

    if (!saveResponse) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating check your answers section review ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
