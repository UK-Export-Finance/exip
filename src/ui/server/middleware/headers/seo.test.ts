import { mockReq, mockRes } from '../../test-mocks';
import { Request, Response } from '../../../types';
import { seo } from './seo';

describe('middleware/seo', () => {
  const req: Request = mockReq();
  const res: Response = mockRes();

  const setHeaderSpy = jest.fn();
  const nextSpy = jest.fn();

  beforeEach(() => {
    res.setHeader = setHeaderSpy;

    seo(req, res, nextSpy);
  });

  describe('response', () => {
    it('should set `X-Robots-Tag` header', () => {
      expect(setHeaderSpy).toHaveBeenCalledWith('X-Robots-Tag', 'noindex, nofollow, noarchive, noimageindex, nosnippet');
    });

    it('should call next()', () => {
      expect(nextSpy).toHaveBeenCalledTimes(1);
    });
  });
});
