import { Request, Response } from 'express';
import { ACCOUNT, FIELD_IDS } from '../constants';
import encryptPassword from '../helpers/encrypt-password';
import application from './mock-application';
import cisCountries from './mock-CIS-countries';
import currencies from './mock-currencies';
import company from './mock-company';
import companySicCode from './mock-company-sic-code';
import nominatedLossPayee from './mock-nominated-loss-payee';
import { Account } from '../types';

const {
  ACCOUNT: { PASSWORD_RESET_HASH },
} = FIELD_IDS.INSURANCE;

const now = new Date();

export const mockAccount = {
  firstName: 'first',
  lastName: 'last',
  email: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
  ...encryptPassword(String(process.env.MOCK_ACCOUNT_PASSWORD)),
  isVerified: true,
  verificationHash: 'mockVerificationHash',
  verificationExpiry: new Date(now.setMinutes(now.getMinutes() + 1)).toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  [PASSWORD_RESET_HASH]: 'mockResetHash',
  passwordResetExpiry: ACCOUNT.PASSWORD_RESET_EXPIRY(),
  isBlocked: false,
} as Account;

export const mockOTP = {
  securityCode: '123456',
  salt: 'mockSalt',
  hash: 'mockHash',
  expiry: new Date(),
};

export const mockIV = 'SVheFWN4nT+2pac4';

export const mockApplication = application;

export const mockCisCountries = cisCountries;

export const mockCompany = company;
export const mockCompanySicCode = companySicCode;

export const mockNominatedLossPayee = nominatedLossPayee;

export const mockBuyer = {
  companyOrOrganisationName: 'Mock buyer',
  exporterIsConnectedWithBuyer: true,
};

export const mockLossPayeeFinancialDetailsUk = {
  accountNumber: '12345678',
  sortCode: '123456',
  bankAddress: 'Mock UK financial address',
};

export const mockLossPayeeFinancialDetailsUkVector = {
  accountNumberVector: '1q4WRqCAFFLtGrot',
  sortCodeVector: '2q4WRqCAFFLtGrep',
};

export const mockLossPayeeFinancialDetailsInternational = {
  iban: '12345678910111213',
  bicSwiftCode: 'BKENGB2L123',
  bankAddress: 'Mock UK financial address',
};

export const mockLossPayeeFinancialDetailsInternationalVector = {
  bicSwiftCodeVector: '3q4WRqCAFFLtGrot',
  ibanVector: '4q4WRqCAFFLtGrep',
};

export const mockCountries = [
  {
    name: 'Abu Dhabi',
    isoCode: 'XAD',
  },
  {
    name: 'Algeria',
    isoCode: 'DZA',
  },
  {
    name: 'Greenland',
    isoCode: 'GRL',
  },
];

export const mockCurrencies = currencies;

export const mockApplicationDeclaration = {
  agreeToConfidentiality: true,
  agreeToAntiBribery: true,
  hasAntiBriberyCodeOfConduct: true,
  willExportWithAntiBriberyCodeOfConduct: true,
  agreeToConfirmationAndAcknowledgements: true,
  agreeHowDataWillBeUsed: true,
};

export const mockInsuranceFeedbackEmail = {
  satisfaction: 'satisfied',
  improvement: 'test',
  otherComments: 'comments',
};

export const mockInsuranceFeedback = {
  ...mockInsuranceFeedbackEmail,
  service: 'Insurance',
  referralUrl: 'www.gov.uk',
  product: 'EXIP',
};

export const mockSendEmailResponse = { success: true, emailRecipient: mockAccount.email };

export const mockUrlOrigin = 'https://mock-origin.com';

export const mockReq = {
  headers: {},
} as Request;

export const mockRes = () => {
  const res = {} as Response;

  res.json = jest.fn();
  res.redirect = jest.fn();
  res.render = jest.fn();
  res.send = jest.fn();
  res.status = jest.fn(() => res);

  return res;
};

export const mockSpyPromise = () => jest.fn().mockResolvedValue({});
