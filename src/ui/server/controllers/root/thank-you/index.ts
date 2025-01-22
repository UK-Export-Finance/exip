import { Request, Response } from '../../../../types';

/**
 * get
 * Handles the GET request for the thank you page, this page
 * shows the timestamp, name and description of any vulnerability
 * reported to UKEF.
 *
 * This controller sets the response type to plain text and writes a thank you message
 * with a placeholder for the date, name, and description.
 *
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} thanks.txt file
 */
export const get = (req: Request, res: Response) => {
  res.type('text/plain');

  res.write('# We would like to thank the following:');
  res.write('\n');
  res.write('# [DD-MM-YYYY] : Name : description');

  res.send();
};
