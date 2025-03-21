import cookieParser from 'cookie-parser';
import { PRODUCT } from '../content-strings';
import { INTEGRITY } from '../constants';
import mockAccount from './mock-account';
import mockAnswers from './mock-answers';
import mockSession from './mock-session';
import mockQuote from './mock-quote';
export * from './mock-countries';
import mockCountriesAndCurrencies from './mock-countries-and-currencies';
import mockCurrencies, { EUR, HKD, JPY, GBP, USD, mockCurrenciesResponse, mockCurrenciesEmptyResponse } from './mock-currencies';
import mockCompaniesHouseResponse from './mock-companies-house-response';
import mockCompany from './mock-company';
import mockCreateApplicationResponse from './mock-create-application-response';
import mockApplication, {
  mockExportContract,
  mockExportContractAgent,
  mockExportContractAgentIsNotUsing,
  mockExportContractAgentIsUsing,
  mockApplicationAgentServiceChargeEmpty,
  mockApplicationAgentServiceEmpty,
  mockApplicationMultiplePolicy,
  mockApplicationNominatedLossPayeeAppointedEmptyData,
  mockApplicationNominatedLossPayeeNotAppointedFullFinancialInternationalData,
  mockApplicationNominatedLossPayeeNotAppointedFullFinancialUkData,
  mockApplicationTotalContractValueThresholdTrue,
  mockApplicationTotalContractValueThresholdFalse,
  mockBusiness,
  mockCompanyDifferentTradingAddress,
  mockExportContractAgentService,
  mockExportContractAgentServiceCharge,
  mockNominatedLossPayee,
  referenceNumber,
} from './mock-application';
import mockApplications from './mock-applications';
import mockEligibility from './mock-eligibility';
import mockErrorMessagesObject from './mock-error-messages-object';
import mockErrors from './mock-errors';
import mockUrlOrigin from './mock-url-origin';
import mockPhoneNumbers from './mock-phone-numbers';
import mockSicCodes from './mock-sic-codes';
import mockBusinessNatureOfBusiness from './mock-business-nature-of-business';
import mockBusinessTurnover from './mock-business-turnover';
import mockBroker from './mock-broker';
import mockBuyer, { mockBuyerTradingHistory, mockBuyerRelationship, mockBuyerContact, mockBuyerOutstandingOrOverduePayments } from './mock-buyer';
import { mockInsuranceFeedback } from './mock-feedback';
import mockJointlyInsuredParty from './mock-jointly-insured-party';
import mockLossPayeeDetails from './mock-loss-payee-details';
import mockLossPayeeFinancialDetailsInternational from './mock-loss-payee-financial-details-international';
import mockLossPayeeFinancialDetailsUk from './mock-loss-payee-financial-details-uk';
import mockContact from './mock-contact';
import mockOrdnanceSurveyAddressResponse from './mock-ordnance-survey-address-response';
import mockValidEmail from './mock-valid-email';
import { Request, Response, ResponseInsurance } from '../../types';

const { JS, GOVUK, FORM, COOKIES, GA, GA_TAG_MANAGER, ACCESSIBILITY } = INTEGRITY;

const mockNext = jest.fn();

const mockReq = () => {
  const req = {
    body: {},
    cookies: {},
    csrfToken: () => 'mock',
    flash: jest.fn(),
    headers: {
      referer: 'mock.com/route',
      origin: 'https://mock.com',
      host: 'mock-host.com',
    },
    signedCookies: cookieParser(''),
    hostname: 'mock.com',
    method: 'GET',
    originalUrl: 'mock?mockQueryParam',
    baseUrl: 'mock',
    params: {
      referenceNumber: String(referenceNumber),
    },
    query: {},
    redirect: jest.fn(),
    session: {
      submittedData: {
        quoteEligibility: {},
        insuranceEligibility: {},
      },
    },
  } as Request;

  return req;
};

/**
 * mockRes
 * Mock response object
 * @returns {Response}
 */
const mockRes = (): Response => ({
  redirect: jest.fn(),
  render: jest.fn(),
  removeHeader: jest.fn(),
  setHeader: jest.fn(),
  status: jest.fn(),
  type: jest.fn(),
  write: jest.fn(),
  send: jest.fn(),
  locals: {
    csrfToken: 'mock',
    meta: {
      URL: 'mock.com/route',
      TITLE: PRODUCT.DESCRIPTION.GENERIC,
      ORGANISATION: PRODUCT.DESCRIPTION.ORGANISATION,
    },
    SRI: {
      JS,
      ACCESSIBILITY,
      GOVUK,
      FORM,
      COOKIES,
      GA,
      GA_TAG_MANAGER,
    },
  },
});

/**
 * mockResInsurance
 * Mock response object for "insurance" routes
 * @returns {ResponseInsurance}
 */
const mockResInsurance = (): ResponseInsurance => ({
  ...mockRes(),
  locals: {
    ...mockRes().locals,
    application: mockApplication,
  },
});

const mockErrorMessage = 'Mock error';

const mockSpyPromise = () => jest.fn().mockResolvedValue({});

const mockSpyPromiseRejection = jest.fn().mockRejectedValue(new Error(mockErrorMessage));

export {
  EUR,
  HKD,
  JPY,
  GBP,
  USD,
  mockAccount,
  mockAnswers,
  mockApplication,
  mockExportContract,
  mockExportContractAgent,
  mockExportContractAgentIsNotUsing,
  mockExportContractAgentIsUsing,
  mockApplicationAgentServiceChargeEmpty,
  mockApplicationAgentServiceEmpty,
  mockApplicationMultiplePolicy,
  mockApplicationNominatedLossPayeeAppointedEmptyData,
  mockApplicationNominatedLossPayeeNotAppointedFullFinancialInternationalData,
  mockApplicationNominatedLossPayeeNotAppointedFullFinancialUkData,
  mockApplications,
  mockApplicationTotalContractValueThresholdTrue,
  mockApplicationTotalContractValueThresholdFalse,
  mockBroker,
  mockBusiness,
  mockContact,
  mockBusinessNatureOfBusiness,
  mockBusinessTurnover,
  mockBuyer,
  mockBuyerContact,
  mockBuyerOutstandingOrOverduePayments,
  mockBuyerRelationship,
  mockBuyerTradingHistory,
  mockCountriesAndCurrencies,
  mockCompaniesHouseResponse,
  mockCompany,
  mockCreateApplicationResponse,
  mockCurrencies,
  mockCurrenciesResponse,
  mockCurrenciesEmptyResponse,
  mockCompanyDifferentTradingAddress,
  mockEligibility,
  mockErrorMessage,
  mockErrorMessagesObject,
  mockErrors,
  mockExportContractAgentService,
  mockExportContractAgentServiceCharge,
  mockInsuranceFeedback,
  mockJointlyInsuredParty,
  mockNext,
  mockLossPayeeDetails,
  mockLossPayeeFinancialDetailsInternational,
  mockLossPayeeFinancialDetailsUk,
  mockNominatedLossPayee,
  mockOrdnanceSurveyAddressResponse,
  mockUrlOrigin,
  mockSession,
  mockSicCodes,
  mockQuote,
  mockPhoneNumbers,
  mockReq,
  mockRes,
  mockResInsurance,
  mockSpyPromise,
  mockSpyPromiseRejection,
  mockValidEmail,
  referenceNumber,
};
