import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import sectionStartPageVariables from '../../../helpers/page-variables/core/insurance/section-start';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, ResponseInsurance } from '../../../../types';
import { referenceNumber, mockReq, mockResInsurance } from '../../../test-mocks';

const {
  EXPORTER_BUSINESS: { COMPANY_DETAILS_ROOT },
} = INSURANCE_ROUTES;

describe('controllers/insurance/business/index', () => {
  let req: Request;
  let res: ResponseInsurance;

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.SHARED_PAGES.SECTION_START);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...sectionStartPageVariables({
          REFERENCE_NUMBER: referenceNumber,
          START_NOW_ROUTE: COMPANY_DETAILS_ROOT,
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.ROOT,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
      });
    });
  });
});
