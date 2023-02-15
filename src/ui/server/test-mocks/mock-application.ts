import { add, addMonths } from 'date-fns';
import { APPLICATION } from '../constants';
import mockCountries from './mock-countries';
import mockCurrencies from './mock-currencies';
import { Application } from '../../types';

const mockGenericPolicyAndExport = {
  id: 'clav8by1i0007kgoqies0dbfc',
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

const mockApplication = {
  id: 'clacdgc630000kdoqn7wcgrz1',
  referenceNumber: 10001,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  submissionDeadline: addMonths(new Date(), APPLICATION.SUBMISSION_DEADLINE_IN_MONTHS).toISOString(),
  submissionType: 'Manual Inclusion Application',
  eligibility: {
    id: 'clav8by1g0000kgoq5a2afr1z',
    buyerCountry: mockCountries[0],
    hasMinimumUkGoodsOrServices: true,
    validExporterLocation: true,
    hasCompaniesHouseNumber: true,
    otherPartiesInvolved: false,
    paidByLetterOfCredit: false,
    needPreCreditPeriodCover: false,
    wantCoverOverMaxAmount: false,
    wantCoverOverMaxPeriod: false,
  },
  policyAndExport: mockSinglePolicyAndExport,
  exporterCompany: {
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
      __typename: 'ExporterCompanyAddress',
    },
    financialYearEndDate: new Date(),
    __typename: 'ExporterCompany',
  },
  exporterBusiness: {
    id: 'clcyyopna0158m8noaglyy9gg',
    goodsOrServicesSupplied: 'ABC',
    totalYearsExporting: '20',
    totalEmployeesInternational: '1000',
    totalEmployeesUK: '400',
    estimatedAnnualTurnover: '155220',
    exportsTurnoverPercentage: '20',
  },
  exporterBroker: {
    id: 'clcyyopna0158m8noaglyy4gg',
    isUsingBroker: true,
    brokerName: 'test',
    addressLine1: 'test line 1',
    addressLine2: 'test line 2',
    town: 'town',
    county: 'county',
    postcode: 'SW1A 2AA',
    email: 'test@test.com',
  },
};

export const mockApplicationMultiplePolicy = {
  ...mockApplication,
  policyAndExport: mockMultiplePolicyAndExport,
} as Application;

export default mockApplication;
