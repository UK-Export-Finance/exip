import { Request, Response } from '../../../../types';

/**
 * Handles the GET request for the thank you page.
 *
 * This function sets the response type to plain text and writes a thank you message
 * with a placeholder for the date, name, and description.
 *
 * @param req - The request object.
 * @param res - The response object.
 */
export const get = (req: Request, res: Response) => {
  res.type('text/plain');

  res.write('# We would like to thank the following:');
  res.write('\n');
  res.write('# [DD-MM-YYYY] : Name : description');

  res.send();
};
