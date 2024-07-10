import generateRedirectUrl from '../../helpers/generate-redirect-url';
import { Request, Response } from '../../../types';

/**
 * get
 * Redirect an MVP_INSURANCE_ROOT URL to an INSURANCE_ROOT URL
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect}
 */
const get = (req: Request, res: Response) => {
  const newUrl = generateRedirectUrl(req.originalUrl);

  return res.redirect(newUrl);
};

export default get;
