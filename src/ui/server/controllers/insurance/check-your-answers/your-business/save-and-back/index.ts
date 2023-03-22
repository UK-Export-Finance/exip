import { Request, Response } from '../../../../../../types';
import { ROUTES } from '../../../../../constants';

const { INSURANCE_ROOT, ALL_SECTIONS } = ROUTES.INSURANCE;

/**
 * saves and goes back to all sections from check your answers your business
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

    // redirect to all sections page
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error on check your answers - policy and exports (save and back) ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { post };
