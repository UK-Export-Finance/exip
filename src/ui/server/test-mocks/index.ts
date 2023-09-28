import { Request, Response } from '../../types';
import mockAccount from './mock-account';
import mockAnswers from './mock-answers';
import mockSession from './mock-session';
import mockQuote from './mock-quote';
import mockCountries from './mock-countries';
import mockCurrencies from './mock-currencies';
import mockCompany from './mock-company';
import mockApplication, { mockBusiness } from './mock-application';
import mockApplications from './mock-applications';
import mockEligibility from './mock-eligibility';
import mockUrlOrigin from './mock-url-origin';
import mockPhoneNumbers from './mock-phone-numbers';
import mockSicCodes from './mock-sic-codes';
import mockBusinessNatureOfBusiness from './mock-business-nature-of-business';
import mockBusinessTurnover from './mock-business-turnover';
import mockBroker from './mock-broker';
import mockBuyer from './mock-buyer';
import mockDeclarations from './mock-declarations';
import { mockInsuranceFeedback } from './mock-feedback';
import mockContact from './mock-contact';
import { PRODUCT } from '../content-strings';
import { INTEGRITY } from '../constants';

const { JS, GOVUK, FORM, COOKIES, GA, MOJ, ACCESSIBILITY } = INTEGRITY;

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
    hostname: 'mock.com',
    method: 'GET',
    originalUrl: 'mock?mockQueryParam',
    baseUrl: 'mock',
    params: {
      referenceNumber: mockApplication.referenceNumber.toString(),
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
    csrfToken: 'mock',
    meta: {
      URL: 'mock.com/route',
      TITLE: PRODUCT.DESCRIPTION.GENERIC,
      ORGANISATION: PRODUCT.DESCRIPTION.ORGANISATION,
    },
    SRI: {
      JS,
      ACCESSIBILITY,
      MOJ,
      GOVUK,
      FORM,
      COOKIES,
      GA,
    },
  };

  return res;
};

const mockNext = jest.fn();

export {
  mockAccount,
  mockAnswers,
  mockApplication,
  mockApplications,
  mockBroker,
  mockBusiness,
  mockContact,
  mockBusinessNatureOfBusiness,
  mockBusinessTurnover,
  mockBuyer,
  mockCountries,
  mockCompany,
  mockCurrencies,
  mockDeclarations,
  mockEligibility,
  mockInsuranceFeedback,
  mockNext,
  mockUrlOrigin,
  mockSession,
  mockSicCodes,
  mockQuote,
  mockPhoneNumbers,
  mockReq,
  mockRes,
};
