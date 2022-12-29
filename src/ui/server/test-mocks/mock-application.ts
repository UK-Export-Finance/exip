import { add, addMonths } from 'date-fns';
import { APPLICATION } from '../constants';
import mockCountries from './mock-countries';
import { Application } from '../../types';

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
  policyAndExport: {
    id: 'clav8by1i0007kgoqies0dbfc',
    policyType: APPLICATION.POLICY_TYPE.MULTI,
    requestedStartDate: new Date(),
    contractCompletionDate: add(new Date(), { days: 1 }),
  },
} as Application;

export default mockApplication;
