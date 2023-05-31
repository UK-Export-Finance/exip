import dotenv from 'dotenv';
import { add, addMonths } from 'date-fns';
import { APPLICATION, ANSWERS } from '../constants';
import mockCountries from './mock-countries';
import mockCurrencies from './mock-currencies';
import { Application } from '../types';
import broker from './mock-broker';
import buyer from './mock-buyer';
import mockCompanySicCode from './mock-company-sic-code';

dotenv.config();

export const mockApplicationEligibility = {
  buyerCountry: mockCountries[0],
  hasMinimumUkGoodsOrServices: true,
  validExporterLocation: true,
  hasCompaniesHouseNumber: true,
  otherPartiesInvolved: false,
  paidByLetterOfCredit: false,
  needPreCreditPeriodCover: false,
  wantCoverOverMaxAmount: false,
  wantCoverOverMaxPeriod: false,
};

const mockGenericPolicyAndExport = {
  goodsOrServicesDescription: 'Mock description',
  finalDestinationCountryCode: mockCountries[0].isoCode,
  requestedStartDate: add(new Date(), { months: 1 }),
  creditPeriodWithBuyer: ' Mock free text',
  policyCurrencyCode: mockCurrencies[0].isoCode,
};

export const mockSinglePolicyAndExport = {
  ...mockGenericPolicyAndExport,
  policyType: APPLICATION.POLICY_TYPE.SINGLE,
  contractCompletionDate: add(new Date(), { months: 3 }),
  totalValueOfContract: 1500,
};

export const mockMultiplePolicyAndExport = {
  ...mockGenericPolicyAndExport,
  policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
  totalMonthsOfCover: 5,
  totalSalesToBuyer: 1500,
  maximumBuyerWillOwe: 1000,
};

export const mockAccount = {
  id: 'clfv9uv6v00csoqz2pm7nftfv',
};

export const mockCompany = {
  id: 'clcyyopn40148m8noyar9wxrn',
  companyName: 'Test Name',
  companyNumber: '0123456',
  companyWebsite: '',
  hasTradingName: false,
  hasTradingAddress: false,
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

export const mockBusinessContactDetail = {
  firstName: 'Bob',
  lastName: 'Smith',
  email: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
  position: 'CEO',
};

export const mockBusiness = {
  goodsOrServicesSupplied: 'ABC',
  totalYearsExporting: 20,
  totalEmployeesInternational: 1000,
  totalEmployeesUK: 400,
  estimatedAnnualTurnover: 155220,
  exportsTurnoverPercentage: 20,
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
  policyAndExport: true,
  business: true,
  buyer: true,
};

export const mockApplicationDeclaration = {
  id: 'clf3te7vx1432cfoqp9rbop73',
  agreeToConfidentiality: true,
  agreeToAntiBribery: true,
  hasAntiBriberyCodeOfConduct: ANSWERS.YES,
  willExportWithAntiBriberyCodeOfConduct: ANSWERS.YES,
  agreeToConfirmationAndAcknowledgements: true,
  agreeHowDataWillBeUsed: true,
};

const mockApplication = {
  id: 'clacdgc630000kdoqn7wcgrz1',
  version: APPLICATION.LATEST_VERSION.VERSION_NUMBER,
  referenceNumber: 10001,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  submissionDate: new Date(),
  submissionDeadline: addMonths(new Date(), APPLICATION.SUBMISSION_DEADLINE_IN_MONTHS).toISOString(),
  submissionType: 'Manual Inclusion Application',
  eligibility: {
    id: 'clav8by1g0000kgoq5a2afr1z',
    ...mockApplicationEligibility,
  },
  status: APPLICATION.STATUS.SUBMITTED,
  owner: mockAccount,
  policyAndExport: {
    id: 'clav8by1i0007kgoqies0dbfc',
    ...mockSinglePolicyAndExport,
  },
  company: mockCompany,
  companySicCodes: [mockCompanySicCode, mockCompanySicCode],
  companyAddress: mockCompany.registeredOfficeAddress,
  business: {
    id: 'clcyyopna0158m8noaglyy9gg',
    businessContactDetailId: mockBusinessContactDetail.id,
    ...mockBusiness,
    businessContactDetail: {
      id: 'clcyyopna0158m8noaglyy9ab',
      ...mockBusinessContactDetail,
    },
  },
  broker: mockBroker,
  buyer: mockApplicationBuyer,
  sectionReview: mockSectionReview,
  declaration: mockApplicationDeclaration,
} as Application;

export const mockApplicationMultiplePolicy = {
  ...mockApplication,
  policyAndExport: mockMultiplePolicyAndExport,
} as Application;

export default mockApplication;
