import { add } from 'date-fns';
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
  policyAndExport: {
    id: 'clav8by1i0007kgoqies0dbfc',
    policyType: 'Multiple contract policy',
    requestedStartDate: new Date(),
    contractCompletionDate: add(new Date(), { days: 1 }),
  },
} as Application;

export default mockApplication;
