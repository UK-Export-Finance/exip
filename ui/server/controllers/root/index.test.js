const { get } = require('.');
const { mockReq, mockRes } = require('../../test-mocks');
const { ROUTES } = require('../../constants');

describe('controllers/root', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    it('should add an empty submittedData object to the session', () => {
      req.session = {
        submittedData: {
          test: true,
        },
      };

      get(req, res);

      expect(req.session.submittedData).toEqual({});
    });

    it(`should redirect to ${ROUTES.BUYER_COUNTRY}`, () => {
      get(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ROUTES.BUYER_COUNTRY);
    });
  });
});
