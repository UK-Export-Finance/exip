import dotenv from 'dotenv';
import { APPLICATION, COVER_PERIOD, TOTAL_CONTRACT_VALUE, EUR, GBP } from '../constants';
import mockCountries from './mock-countries';
import { Application, ApplicationPolicyContact } from '../types';
import broker from './mock-broker';
import buyer from './mock-buyer';
import mockCompanySicCode from './mock-company-sic-code';

dotenv.config();

const date = new Date();
const month = date.getMonth();

export const mockApplicationEligibility = {
  buyerCountry: mockCountries[0],
  coverPeriod: {
    valueId: COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID,
  },
  coverPeriodId: COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID,
  hasCompaniesHouseNumber: true,
  hasEndBuyer: false,
  hasMinimumUkGoodsOrServices: true,
  otherPartiesInvolved: false,
  paidByLetterOfCredit: false,
  totalContractValue: {
    valueId: TOTAL_CONTRACT_VALUE.LESS_THAN_500K.DB_ID,
  },
  totalContractValueId: TOTAL_CONTRACT_VALUE.LESS_THAN_500K.DB_ID,
  validExporterLocation: true,
};

const mockGenericPolicy = {
  requestedStartDate: new Date(date.setMonth(month + 1)),
  policyCurrencyCode: GBP,
};

export const mockSinglePolicy = {
  ...mockGenericPolicy,
  policyType: APPLICATION.POLICY_TYPE.SINGLE,
  contractCompletionDate: new Date(date.setMonth(month + 3)),
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
  goodsOrServicesDescription: 'Mock description',
  finalDestinationCountryCode: mockCountries[0].isoCode,
};

export const mockAccount = {
  id: 'clfv9uv6v00csoqz2pm7nftfv',
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

export const mockPolicyContact = {
  firstName: 'Bob',
  lastName: 'Smith',
  email: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
  position: 'CEO',
  isSameAsOwner: true,
} as ApplicationPolicyContact;

export const mockBusiness = {
  goodsOrServicesSupplied: 'ABC',
  totalYearsExporting: 20,
  totalEmployeesUK: 400,
  estimatedAnnualTurnover: 155220,
  exportsTurnoverPercentage: 20,
  turnoverCurrencyCode: EUR,
  hasCreditControlProcess: true,
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

export const mockLossPayeeFinancialDetailsUkVector = {
  accountNumberVector: 'AAaaAAA1aA+1aaa1',
  sortCodeVector: 'BBbbBBB2bB+2bbb2',
};

export const mockLossPayeeFinancialDetailsUk = {
  accountNumber: 'AAaaa1A1AAaaAAa1AaAaAaaaAaAaaaAaAAAaAaAaAaA=',
  sortCode: 'BBbbb2B1BBbbBBb2BbBbBbbbBbBbbbBbBBBbBbBbBbB',
  bankAddress: 'Mock UK financial address',
  vector: mockLossPayeeFinancialDetailsUkVector,
};

export const mockLossPayeeFinancialDetailsInternationalVector = {
  ibanVector: 'CCccCCC3cC+3ccc3',
  bicSwiftCodeVector: 'DDddDDD4dD+4ddd4',
};

export const mockLossPayeeFinancialDetailsInternational = {
  iban: 'Ccccc3C3CCccCCc3CcCcCcccCcCcccCcCCCcCcCcCcC=',
  bicSwiftCode: 'DDddd4D4DDddDDd4DdDdDdddDdDdddDdDDdDdDdDdD',
  bankAddress: 'Mock international financial address',
  vector: mockLossPayeeFinancialDetailsInternationalVector,
};

export const mockNominatedLossPayee = {
  id: '123',
  isAppointed: false,
  financialUk: {
    id: '2345',
    ...mockLossPayeeFinancialDetailsUk,
  },
  financialInternational: {
    id: '2345',
    ...mockLossPayeeFinancialDetailsInternational,
  },
};

const mockApplication = {
  id: 'clacdgc630000kdoqn7wcgrz1',
  version: APPLICATION.LATEST_VERSION.VERSION_NUMBER,
  referenceNumber: 10001,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dealType: APPLICATION.DEAL_TYPE,
  submissionCount: 1,
  submissionDate: new Date(),
  submissionDeadline: new Date(date.setMonth(month + APPLICATION.SUBMISSION_DEADLINE_IN_MONTHS)).toISOString(),
  submissionType: 'Manual Inclusion Application',
  eligibility: {
    id: 'clav8by1g0000kgoq5a2afr1z',
    ...mockApplicationEligibility,
  },
  status: APPLICATION.STATUS.SUBMITTED,
  owner: mockAccount,
  policy: {
    id: 'clav8by1i0007kgoqies0dbfc',
    ...mockSinglePolicy,
  },
  exportContract: mockExportContract,
  company: mockCompany,
  companySicCodes: [mockCompanySicCode, mockCompanySicCode],
  companyAddress: mockCompany.registeredOfficeAddress,
  business: {
    id: 'clcyyopna0158m8noaglyy9gg',
    ...mockBusiness,
  },
  broker: mockBroker,
  buyer: mockApplicationBuyer,
  sectionReview: mockSectionReview,
  declaration: mockApplicationDeclaration,
  policyContact: mockPolicyContact,
  nominatedLossPayee: mockNominatedLossPayee,
} as Application;

export const mockApplicationMultiplePolicy = {
  ...mockApplication,
  policy: mockMultiplePolicy,
} as Application;

export default mockApplication;
