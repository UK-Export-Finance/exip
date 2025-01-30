import { LINKS } from '../../../content-strings';
import { Request, ResponseInsurance } from '../../../../types';

/**
 * Redirect to LINKS.EXTERNAL.FULL_APPLICATION
 * In version 1/MVP, we had our own start page.
 * In version 2/No PDF, the start page is hosted on GOV.uk.
 * This redirect ensures that any users who visit the URL,
 * are redirect to the start page.
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.redirect}
 */
export const get = (req: Request, res: ResponseInsurance) => res.redirect(LINKS.EXTERNAL.FULL_APPLICATION);

export default get;
