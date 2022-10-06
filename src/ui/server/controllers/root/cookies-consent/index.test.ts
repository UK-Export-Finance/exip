import post from '.';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/cookies-consentt', () => {
  let req: Request;
  let res: Response;

  const mockFlash = jest.fn();

  beforeEach(() => {
    req = mockReq();
    req.flash = mockFlash;

    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should add cookieConsentNewDecision to session', () => {
    post(req, res);

    // @ts-ignore
    expect(req.session.cookieConsentNewDecision).toEqual(true);
  });

  it('should redirect with req.headers.referer', () => {
    post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(req.headers.referer);
  });
});
