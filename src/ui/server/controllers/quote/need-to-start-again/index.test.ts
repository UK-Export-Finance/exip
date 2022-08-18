import { get, post } from '.';
import { FOOTER, LINKS, PAGES, PRODUCT } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/need-to-start-again', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        CONTENT_STRINGS: {
          LINKS,
          PRODUCT,
          FOOTER,
          ...PAGES.NEED_TO_START_AGAIN,
        },
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.NEED_TO_START_AGAIN, expectedVariables);
    });
  });

  describe('post', () => {
    it(`should redirect to ${ROUTES.QUOTE.BUYER_COUNTRY}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.BUYER_COUNTRY);
    });
  });
});
