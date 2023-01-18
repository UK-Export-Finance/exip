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
  policyType: APPLICATION.POLICY_TYPE.MULTI,
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
    id: 'clav8by1i0007kgoqies0deee',
    address: {
      id: 'clcyj96p0002440oqoblaeht2',
    },
  },
};

export const mockApplicationMultiplePolicy = {
  ...mockApplication,
  policyAndExport: mockMultiplePolicyAndExport,
} as Application;


export default mockApplication;
