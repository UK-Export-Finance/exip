import generateRedirectUrl from '../../helpers/generate-redirect-url';
import isValidReqOriginalUrl from '../../helpers/is-valid-req-original-url';
import { ROUTES } from '../../constants';
import { Request, Response } from '../../../types';

const { PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

/**
 * get
 * Redirect an MVP_INSURANCE_ROOT URL to an INSURANCE_ROOT URL if req.originalUrl is valid
 * Redirect to PROBLEM_WITH_SERVICE if req.originalUrl is invalid
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect}
 */
const get = (req: Request, res: Response) => {
  const { originalUrl } = req;

  const validUrl = isValidReqOriginalUrl(originalUrl);

  if (!validUrl) {
    console.error('Invalid original URL detected in "redirects" controller: %s', originalUrl);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const newUrl = generateRedirectUrl(originalUrl);

  return res.redirect(newUrl);
};

export default get;
