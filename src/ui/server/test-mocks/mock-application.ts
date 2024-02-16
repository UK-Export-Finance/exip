import dotenv from 'dotenv';
import { add, addMonths } from 'date-fns';
import { APPLICATION } from '../constants';
import mockEligibility from './mock-eligibility';
import mockAccount from './mock-account';
import mockCountries from './mock-countries';
import mockContact from './mock-contact';
import companyMock from './mock-company';
import { Application } from '../../types';
import broker from './mock-broker';
import buyer from './mock-buyer';
import mockJointlyInsuredParty from './mock-jointly-insured-party';
import mockNominatedLossPayee from './mock-nominated-loss-payee';
import { GBP, EUR } from '../constants/supported-currencies';

dotenv.config();

const mockGenericPolicy = {
  id: 'clav8by1i0007kgoqies0dbfc',
  requestedStartDate: add(new Date(), { months: 1 }),
  policyCurrencyCode: GBP,
  needPreCreditPeriodCover: false,
  creditPeriodWithBuyer: 'Mock credit period description',
  jointlyInsuredParty: mockJointlyInsuredParty,
};

export const mockSinglePolicy = {
  ...mockGenericPolicy,
  policyType: APPLICATION.POLICY_TYPE.SINGLE,
  contractCompletionDate: add(new Date(), { months: 3 }),
  totalValueOfContract: 1500,
};

export const mockMultiplePolicy = {
  ...mockGenericPolicy,
  policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
  totalMonthsOfCover: 5,
  totalSalesToBuyer: 1500,
  maximumBuyerWillOwe: 1000,
};

export const mockExportContract = {
  id: 'clldfm6pt000noqa6fs6cj5xn',
  goodsOrServicesDescription: 'Mock description',
  finalDestinationKnown: false,
  finalDestinationCountryCode: mockCountries[0].isoCode,
};

export const mockOwner = {
  id: mockAccount.id,
};

export const mockCompanyDifferentTradingAddress = {
  id: 'clf3te7vx1432cfoqp9rboe55',
  fullAddress: 'test',
};

export const mockCompany = {
  id: 'clcyyopn40148m8noyar9wxrn',
  ...companyMock,
  hasDifferentTradingName: false,
  hasDifferentTradingAddress: false,
  dateOfCreation: '2014-04-10T00:00:00.000Z',
  sicCodes: [
    {
      id: 'clcyyxldc0634m8novkr94spo',
      sicCode: '64999',
      industrySectorName: 'Mock industry',
    },
  ],
  differentTradingAddress: mockCompanyDifferentTradingAddress,
  registeredOfficeAddress: {
    id: 'clcyyopna0158m8noaglyy94t',
    addressLine1: 'Line 1',
    addressLine2: 'Line 2',
    careOf: '',
    locality: 'Locality',
    region: 'Region',
    postalCode: 'Post code',
    country: '',
    premises: '',
    __typename: 'CompanyAddress',
  },
  financialYearEndDate: new Date(),
};

export const mockBusiness = {
  id: 'clcyyopna0158m8noaglyy9gg',
  goodsOrServicesSupplied: 'ABC',
  totalYearsExporting: '20',
  totalEmployeesUK: '400',
  estimatedAnnualTurnover: '155220',
  exportsTurnoverPercentage: '20',
  turnoverCurrencyCode: EUR,
  hasCreditControlProcess: true,
};

export const mockBroker = {
  id: 'clcyyopna0158m8noaglyy9gg',
  ...broker,
};

export const mockApplicationBuyer = {
  ...buyer,
};

export const mockSectionReview = {
  id: 'clflcq9w4002moqzlnr5yhamr',
  eligibility: true,
  policy: true,
  business: true,
  buyer: true,
};

export const mockApplicationDeclaration = {
  id: 'clf3te7vx1432cfoqp9rbop73',
  agreeToConfidentiality: true,
  agreeToAntiBribery: true,
  hasAntiBriberyCodeOfConduct: true,
  willExportWithAntiBriberyCodeOfConduct: true,
  agreeToConfirmationAndAcknowledgements: true,
  agreeHowDataWillBeUsed: true,
};

const mockApplication = {
  id: 'clacdgc630000kdoqn7wcgrz1',
  version: APPLICATION.LATEST_VERSION.LATEST_VERSION_NUMBER,
  referenceNumber: 10001,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dealType: APPLICATION.DEAL_TYPE,
  submissionCount: APPLICATION.SUBMISSION_COUNT_DEFAULT,
  submissionDeadline: addMonths(new Date(), APPLICATION.SUBMISSION_DEADLINE_IN_MONTHS).toISOString(),
  submissionType: 'Manual Inclusion Application',
  submissionDate: new Date().toISOString(),
  eligibility: {
    ...mockEligibility,
    id: 'clav8by1g0000kgoq5a2afr1z',
  },
  status: APPLICATION.STATUS.IN_PROGRESS,
  owner: mockOwner,
  nominatedLossPayee: mockNominatedLossPayee,
  policy: mockSinglePolicy,
  policyContact: mockContact,
  exportContract: mockExportContract,
  company: mockCompany,
  business: mockBusiness,
  broker: mockBroker,
  buyer: mockApplicationBuyer,
  sectionReview: mockSectionReview,
  declaration: mockApplicationDeclaration,
  totalContractValueOverThreshold: false,
};

export const mockApplicationMultiplePolicy = {
  ...mockApplication,
  policy: mockMultiplePolicy,
} as Application;

export default mockApplication;
