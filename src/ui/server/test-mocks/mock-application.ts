import dotenv from 'dotenv';
import { add, addMonths } from 'date-fns';
import { APPLICATION } from '../constants';
import mockEligibility from './mock-eligibility';
import mockAccount from './mock-account';
import mockCountries from './mock-countries';
import mockCurrencies from './mock-currencies';
import { Application } from '../../types';
import broker from './mock-broker';
import buyer from './mock-buyer';

dotenv.config();

const mockGenericPolicy = {
  id: 'clav8by1i0007kgoqies0dbfc',
  goodsOrServicesDescription: 'Mock description',
  finalDestinationCountryCode: mockCountries[0].isoCode,
  requestedStartDate: add(new Date(), { months: 1 }),
  creditPeriodWithBuyer: ' Mock free text',
  policyCurrencyCode: mockCurrencies[0].isoCode,
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

export const mockOwner = {
  id: mockAccount.id,
};

export const mockCompany = {
  id: 'clcyyopn40148m8noyar9wxrn',
  companyName: 'Test Name',
  companyNumber: '0123456',
  companyWebsite: '',
  hasDifferentTradingName: false,
  hasDifferentTradingAddress: false,
  dateOfCreation: '2014-04-10T00:00:00.000Z',
  sicCodes: [
    {
      id: 'clcyyxldc0634m8novkr94spo',
      sicCode: '64999',
    },
  ],
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
  __typename: 'Company',
};

export const mockBusiness = {
  id: 'clcyyopna0158m8noaglyy9gg',
  goodsOrServicesSupplied: 'ABC',
  totalYearsExporting: '20',
  totalEmployeesInternational: '1000',
  totalEmployeesUK: '400',
  estimatedAnnualTurnover: '155220',
  exportsTurnoverPercentage: '20',
  businessContactDetail: {
    id: 'clcyyopna0158m8noaglhh5gg',
    firstName: mockAccount.firstName,
    lastName: mockAccount.lastName,
    email: mockAccount.email,
    position: 'CEO',
  },
};

export const mockBroker = {
  id: 'clcyyopna0158m8noaglyy9gg',
  ...broker,
};

export const mockApplicationBuyer = {
  id: 'clcyyopna0158m8noaglyy9aa',
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
  policy: mockSinglePolicy,
  company: mockCompany,
  business: mockBusiness,
  broker: mockBroker,
  buyer: mockApplicationBuyer,
  sectionReview: mockSectionReview,
  declaration: mockApplicationDeclaration,
};

export const mockApplicationMultiplePolicy = {
  ...mockApplication,
  policy: mockMultiplePolicy,
} as Application;

export default mockApplication;
