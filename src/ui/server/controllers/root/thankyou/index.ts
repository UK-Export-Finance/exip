import { Request, Response } from '../../../../types';

/**
 * get
 *  Handles the GET request for the thank you page.
 *
 * This controller sets the response type to plain text and writes a thank you message
 * with a placeholder for the date, name, and description.
 *
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} All sections page
 */
export const get = (req: Request, res: Response) => {
  res.type('text/plain');

  res.write('# We would like to thank the following:');
  res.write('\n');
  res.write('# [DD-MM-YYYY] : Name : description');

  res.send();
};
