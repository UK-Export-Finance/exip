import { PAGES } from '../../../../content-strings';
import { pageVariables, post } from '.';
import { Request, Response } from '../../../../../types';
import { TEMPLATES, ROUTES, FIELD_IDS } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import natureofBusinessValidation from './validation';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const { GOODS_OR_SERVICES } = EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS;

const { NATURE_OF_YOUR_BUSINESS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { NAURE_OF_YOUR_BUSINESS: TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES } = ROUTES.INSURANCE;

const { TURNOVER_ROOT } = EXPORTER_BUSINESS_ROUTES;

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

  describe('post', () => {
    describe('when there are validation errors', () => {
      describe('when body is empty', () => {
        it('should render template with validation errors', async () => {
          req.body = {};

          const submittedValues = {
            [GOODS_OR_SERVICES]: req.body[GOODS_OR_SERVICES],
          };

          await post(req, res);

          const validationErrors = natureofBusinessValidation(req.body);

          expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
            ...insuranceCorePageVariables({
              PAGE_CONTENT_STRINGS: NATURE_OF_YOUR_BUSINESS,
              BACK_LINK: req.headers.referer,
            }),
            ...pageVariables(mockApplication.referenceNumber),
            validationErrors,
            submittedValues,
          });
        });
      });

      describe('when body has empty required inputs', () => {
        it('should render template with validation errors', async () => {
          req.body = {
            [GOODS_OR_SERVICES]: '',
          };

          const submittedValues = {
            [GOODS_OR_SERVICES]: req.body[GOODS_OR_SERVICES],
          };

          await post(req, res);

          const validationErrors = natureofBusinessValidation(req.body);

          expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
            ...insuranceCorePageVariables({
              PAGE_CONTENT_STRINGS: NATURE_OF_YOUR_BUSINESS,
              BACK_LINK: req.headers.referer,
            }),
            ...pageVariables(mockApplication.referenceNumber),
            validationErrors,
            submittedValues,
          });
        });
      });
    });

    describe('when there are no validation errors', () => {
      it('should redirect to next page', async () => {
        req.body = {
          [GOODS_OR_SERVICES]: 'test',
        };

        await post(req, res);

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(TURNOVER_ROOT);
      });
    });

    describe('when application does not exist', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
