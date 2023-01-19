import { PAGES } from '../../../../content-strings';
import { pageVariables, get } from '.';
import { Request, Response, Application } from '../../../../../types';
import { TEMPLATES, ROUTES, FIELD_IDS } from '../../../../constants';
import { FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const { GOODS_OR_SERVICES } = EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS;

const { NATURE_OF_YOUR_BUSINESS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { NAURE_OF_YOUR_BUSINESS: TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES } = ROUTES.INSURANCE;

const { NATURE_OF_BUSINESS_ROOT } = EXPORTER_BUSINESS_ROUTES;

const { NATURE_OF_YOUR_BUSINESS: NATURE_OF_YOUR_BUSINESS_FIELDS } = FIELDS;

describe('controllers/insurance/business/nature-of-business', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        FIELDS: {
          GOODS_OR_SERVICES: {
            ID: GOODS_OR_SERVICES,
            ...NATURE_OF_YOUR_BUSINESS_FIELDS[GOODS_OR_SERVICES],
          },
        },
        POST_ROUTES: {
          NATURE_OF_BUSINESS: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${NATURE_OF_BUSINESS_ROOT}`,
          SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}`,
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    describe('when the application exists', () => {
      it('should render the nature-of-business template with correct variables', () => {
        const mockApplicationNoData = {
          ...mockApplication,
        } as Application;

        res.locals.application = mockApplicationNoData;

        get(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: NATURE_OF_YOUR_BUSINESS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplicationNoData.referenceNumber),
        });
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
