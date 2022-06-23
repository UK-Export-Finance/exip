const mockAnswers = require('./mock-answers');
const mockSession = require('./mock-session');

const mockReq = () => ({
  session: {},
  body: {},
  originalUrl: 'mock',
  flash: jest.fn(),
  headers: {
    referer: '/mock',
  },
});

const mockRes = () => {
  const res = {};
  res.redirect = jest.fn();
  res.render = jest.fn();

  return res;
};

module.exports = {
  mockReq,
  mockRes,
  mockAnswers,
  mockSession,
};
