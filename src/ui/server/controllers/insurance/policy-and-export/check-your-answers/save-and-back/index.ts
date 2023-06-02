import { ROUTES } from '../../../../../constants';
import { Request, Response } from '../../../../../../types';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS },
} = ROUTES;

/**
 * post
 * Redirect to the all sections page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = async (req: Request, res: Response) => {
  const { referenceNumber } = req.params;

  return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
};
