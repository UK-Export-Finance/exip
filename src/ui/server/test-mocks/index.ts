import cookieParser from 'cookie-parser';
import { PRODUCT } from '../content-strings';
import { INTEGRITY } from '../constants';
import mockAccount from './mock-account';
import mockAnswers from './mock-answers';
import mockSession from './mock-session';
import mockQuote from './mock-quote';
import mockCountries from './mock-countries';
import mockCurrencies, { EUR, HKD, JPY, GBP, USD, mockCurrenciesResponse, mockCurrenciesEmptyResponse } from './mock-currencies';
import mockCompaniesHouseResponse from './mock-companies-house-response';
import mockCompany from './mock-company';
import mockApplication, {
  mockApplicationAgentServiceChargeEmpty,
  mockApplicationMultiplePolicy,
  mockApplicationTotalContractValueThresholdTrue,
  mockApplicationTotalContractValueThresholdFalse,
  mockBusiness,
  mockCompanyDifferentTradingAddress,
  mockExportContractAgentService,
  mockExportContractAgentServiceCharge,
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
import mockBuyer, { mockBuyerTradingHistory, mockBuyerRelationship, mockBuyerContact } from './mock-buyer';
import mockDeclarations from './mock-declarations';
import { mockInsuranceFeedback } from './mock-feedback';
import mockJointlyInsuredParty from './mock-jointly-insured-party';
import mockLossPayeeDetails from './mock-loss-payee-details';
import mockLossPayeeFinancialDetailsInternational from './mock-loss-payee-financial-details-international';
import mockLossPayeeFinancialDetailsUk from './mock-loss-payee-financial-details-uk';
import mockNominatedLossPayee from './mock-nominated-loss-payee';
import mockContact from './mock-contact';
import mockValidEmail from './mock-valid-email';
import { Request, Response } from '../../types';

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

const mockRes = () => {
  const res = {} as Response;

  res.redirect = jest.fn();
  res.render = jest.fn();
  res.removeHeader = jest.fn();
  res.setHeader = jest.fn();
  res.status = jest.fn();

  res.locals = {
    application: mockApplication,
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
  };

  return res;
};

const mockSpyPromise = () => jest.fn(() => Promise.resolve({}));

export {
  EUR,
  HKD,
  JPY,
  GBP,
  USD,
  mockAccount,
  mockAnswers,
  mockApplication,
  mockApplicationAgentServiceChargeEmpty,
  mockApplicationMultiplePolicy,
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
  mockBuyerRelationship,
  mockBuyerTradingHistory,
  mockCountries,
  mockCompaniesHouseResponse,
  mockCompany,
  mockCurrencies,
  mockCurrenciesResponse,
  mockCurrenciesEmptyResponse,
  mockDeclarations,
  mockCompanyDifferentTradingAddress,
  mockEligibility,
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
  mockUrlOrigin,
  mockSession,
  mockSicCodes,
  mockQuote,
  mockPhoneNumbers,
  mockReq,
  mockRes,
  mockSpyPromise,
  mockValidEmail,
  referenceNumber,
};
