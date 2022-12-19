import { Request, Response } from '../../../../../types';
import { pageVariables, post } from '.';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import generateValidationErrors from '../../../../helpers/validation';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';
import { sanitiseValue } from '../../../../helpers/sanitise-data';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE,
    YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS },
  },
} = FIELD_IDS.INSURANCE;

const { COMPANY_DETAILS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { COMPANY_DETAILS: companyDetailsTemplate } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS: EXPORTER_BUSINESS_ERROR } = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/companies-details', () => {
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
    const errorMessageTradingName = EXPORTER_BUSINESS_ERROR[TRADING_NAME].IS_EMPTY;
    const errorMessageTradingAddress = EXPORTER_BUSINESS_ERROR[TRADING_ADDRESS].IS_EMPTY;
    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        req.body = {};

        const submittedValues = {
          [COMPANY_HOUSE.INPUT]: req.body[COMPANY_HOUSE.INPUT],
          [TRADING_NAME]: sanitiseValue(req.body[TRADING_NAME]),
          [TRADING_ADDRESS]: sanitiseValue(req.body[TRADING_ADDRESS]),
        };

        await post(req, res);

        const errorMessageCompanyHouseIncorrect = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;

        let validationErrors = generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessageCompanyHouseIncorrect, {});
        validationErrors = generateValidationErrors(TRADING_NAME, errorMessageTradingName, validationErrors);
        validationErrors = generateValidationErrors(TRADING_ADDRESS, errorMessageTradingAddress, validationErrors);

        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplication.referenceNumber),
          validationErrors,
          submittedValues,
        });
      });
    });

    describe('when there is no application', () => {
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
