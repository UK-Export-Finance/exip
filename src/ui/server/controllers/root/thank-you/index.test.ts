import { get } from './index';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/root/thank-you', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    it('should render /thanks.txt file with text/plain content type', () => {
      get(req, res);

      expect(res.type).toHaveBeenCalledWith('text/plain');
    });

    it('should return /thanks.txt file with expected content', () => {
      get(req, res);

      expect(res.write).toHaveBeenCalledWith('# We would like to thank the following:');
      expect(res.write).toHaveBeenCalledWith('\n');
      expect(res.write).toHaveBeenCalledWith('# [DD-MM-YYYY] : Name : description');
    });

    it('should return /thanks.txt file', () => {
      get(req, res);

      expect(res.send).toHaveBeenCalledTimes(1);
    });
  });
});
