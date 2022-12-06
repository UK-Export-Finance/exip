import mockCountries from './mock-countries';
import { Application } from '../../types';

const mockApplication = {
  id: 'clacdgc630000kdoqn7wcgrz1',
  referenceNumber: 10001,
  createdAt: '2022-11-11 10:44:20.762',
  updatedAt: '2022-11-11 10:45:17.489',
  submissionDeadline: '2023-02-11 10:44:20.762',
  submissionType: 'Manual Inclusion Application',
  eligibility: {
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
} as Application;

export default mockApplication;
