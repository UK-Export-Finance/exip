import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, ResponseInsurance } from '../../../../types';
import { mockReq, mockResInsurance } from '../../../test-mocks';

describe('controllers/insurance/no-access-to-application', () => {
  let req: Request;
  let res: ResponseInsurance;

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.NO_ACCESS_TO_APPLICATION);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({ PAGE_CONTENT_STRINGS: PAGES.INSURANCE.NO_ACCESS_TO_APPLICATION_PAGE }),
        userName: getUserNameFromSession(req.session.user),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });
  });
});
