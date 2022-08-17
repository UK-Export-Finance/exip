import { Request, Response } from '../../types';
import mockAnswers from './mock-answers';
import mockSession from './mock-session';
import mockQuote from './mock-quote';

const mockReq = () => {
  let req = {} as Request;

  req = {
    body: {},
    csrfToken: () => 'mock',
    flash: jest.fn(),
    headers: {
      referer: '/mock',
    },
    method: 'GET',
    originalUrl: 'mock',
    redirect: jest.fn(),
    session: {
      submittedData: {},
    },
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
