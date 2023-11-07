import { FIELD_IDS } from '../../constants';
import mapCoverPeriodId from '../map-cover-period-id';
import mapTotalContractValue from '../map-total-contract-value';
import { SubmittedDataInsuranceEligibility } from '../../../types';

const {
  INSURANCE: {
    ELIGIBILITY: { BUYER_COUNTRY_ISO_CODE, COVER_PERIOD_ID, TOTAL_CONTRACT_VALUE_ID },
  },
} = FIELD_IDS;

const mapEligibilityAnswers = (answers: SubmittedDataInsuranceEligibility) => {
  if (answers.buyerCountry) {
    const { buyerCountry, wantCoverOverMaxPeriod, wantCoverOverMaxAmount, ...otherAnswers } = answers;

    const wantCoverOverMaxPeriodBoolean = Boolean(wantCoverOverMaxPeriod);
    const wantCoverOverMaxAmountBoolean = Boolean(wantCoverOverMaxAmount);

    const mapped = {
      ...otherAnswers,
      [BUYER_COUNTRY_ISO_CODE]: buyerCountry?.isoCode,
      [COVER_PERIOD_ID]: mapCoverPeriodId(wantCoverOverMaxPeriodBoolean),
      [TOTAL_CONTRACT_VALUE_ID]: mapTotalContractValue(wantCoverOverMaxAmountBoolean),
    };

    return mapped;
  }

  return answers;
};

export default mapEligibilityAnswers;
