import get from './index';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';
import { addYear, getISO8601 } from '../../../helpers/date/iso-8601';

describe('controllers/.well-known/security.txt', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    it('should render /.well-known/security.txt with text/plain content type', () => {
      get(req, res);

      expect(res.type).toHaveBeenCalledWith('text/plain');
    });

    it('should return /.well-known/security.txt with expected content', () => {
      const oneYearInFutureDate = addYear(1);
      const IsoExpiryDate = getISO8601(oneYearInFutureDate);

      get(req, res);

      expect(res.write).toHaveBeenCalledWith('Contact: https://www.gov.uk/contact/govuk\n');
      expect(res.write).toHaveBeenCalledWith('Contact: https://hackerone.com/7af14fd9-fe4e-4f39-bea1-8f8a364061b8/embedded_submissions/new\n');
      expect(res.write).toHaveBeenCalledWith(
        'Contact: https://forms.office.com/pages/responsepage.aspx?id=jhOEgACUnkCm2ka1KB4LCi7SbbFdjaZCuuaGbE7xK1BUQ0ZIOEZLMDdXUjhLTDNRMzVXOUNVQzZNMy4u\n',
      );
      expect(res.write).toHaveBeenCalledWith(`Expires: ${IsoExpiryDate}\n`);
      expect(res.write).toHaveBeenCalledWith('Acknowledgments: https://get-a-quote-for-export-credit-insurance.service.gov.uk/thanks.txt\n');
      expect(res.write).toHaveBeenCalledWith('Preferred-Languages: en\n');
      expect(res.write).toHaveBeenCalledWith('Canonical: https://get-a-quote-for-export-credit-insurance.service.gov.uk/.well-known/security.txt\n');
      expect(res.write).toHaveBeenCalledWith('Policy: https://www.gov.uk/guidance/report-a-vulnerability-on-a-ukef-system\n');
      expect(res.write).toHaveBeenCalledWith('Hiring: https://www.civilservicejobs.service.gov.uk/\n');
    });

    it('should return /.well-known/security.txt', () => {
      get(req, res);

      expect(res.send).toHaveBeenCalledTimes(1);
    });
  });
});
