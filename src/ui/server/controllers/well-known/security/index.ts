import { Request, Response } from '../../../../types';
import { addYear, getISO8601 } from '../../../helpers/date/iso-8601';

/**
 * get
 * Handles the GET request to serve the security.txt file.
 *
 * This controller returns a plain text response containing various security-related
 * contact information, acknowledgments, preferred languages, canonical URL, policy,
 * and hiring information.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.send} security.txt file
 */
const get = (req: Request, res: Response) => {
  const oneYearInFutureDate = addYear(1);
  const IsoExpiryDate = getISO8601(oneYearInFutureDate);

  res.type('text/plain');

  res.write('Contact: https://www.gov.uk/contact/govuk\n');
  res.write('Contact: https://hackerone.com/7af14fd9-fe4e-4f39-bea1-8f8a364061b8/embedded_submissions/new\n');
  res.write('Contact: https://forms.office.com/pages/responsepage.aspx?id=jhOEgACUnkCm2ka1KB4LCi7SbbFdjaZCuuaGbE7xK1BUQ0ZIOEZLMDdXUjhLTDNRMzVXOUNVQzZNMy4u\n');
  res.write(`Expires: ${IsoExpiryDate}\n`);
  res.write('Acknowledgments: https://get-a-quote-for-export-credit-insurance.service.gov.uk/thanks.txt\n');
  res.write('Preferred-Languages: en\n');
  res.write('Canonical: https://get-a-quote-for-export-credit-insurance.service.gov.uk/.well-known/security.txt\n');
  res.write('Policy: https://www.gov.uk/guidance/report-a-vulnerability-on-a-ukef-system\n');
  res.write('Hiring: https://www.civilservicejobs.service.gov.uk/\n');

  res.send();
};

export default get;
