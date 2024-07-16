import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { Request, Response } from '../../../../types';

const {
  ELIGIBILITY: { CHECK_IF_ELIGIBLE },
} = INSURANCE_ROUTES;

/**
 * get
 * Redirect an MVP_INSURANCE_ROOT START_ROOT URL to CHECK_IF_ELIGIBLE
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect}
 */
const get = (req: Request, res: Response) => res.redirect(CHECK_IF_ELIGIBLE);

export default get;
