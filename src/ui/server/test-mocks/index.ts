import { Request, Response } from '../../types';
import mockAnswers from './mock-answers';
import mockSession from './mock-session';
import mockQuote from './mock-quote';

const mockReq = () => {
  let req = {} as Request;

  req = {
    session: {
      submittedData: {},
    },
    body: {},
    originalUrl: 'mock',
    flash: jest.fn(),
    headers: {
      referer: '/mock',
    },
    csrfToken: () => 'mock',
  };

  return req;
};

const mockRes = () => {
  const res = {} as Response;

  res.redirect = jest.fn();
  res.render = jest.fn();

  return res;
};

export { mockAnswers, mockSession, mockQuote, mockReq, mockRes };
