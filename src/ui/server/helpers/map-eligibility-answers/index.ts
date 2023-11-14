import { FIELD_IDS } from '../../constants';
import mapCoverPeriodId from '../map-cover-period-id';
import { SubmittedDataInsuranceEligibility } from '../../../types';

const {
  INSURANCE: {
    ELIGIBILITY: { BUYER_COUNTRY_ISO_CODE, COVER_PERIOD_ID, TOTAL_CONTRACT_VALUE_ID },
  },
} = FIELD_IDS;

const mapEligibilityAnswers = (answers: SubmittedDataInsuranceEligibility) => {
  if (answers.buyerCountry) {
    const { buyerCountry, wantCoverOverMaxPeriod, totalContractValue, ...otherAnswers } = answers;

    const wantCoverOverMaxPeriodBoolean = Boolean(wantCoverOverMaxPeriod);

    const mapped = {
      ...otherAnswers,
      [BUYER_COUNTRY_ISO_CODE]: buyerCountry?.isoCode,
      [COVER_PERIOD_ID]: mapCoverPeriodId(wantCoverOverMaxPeriodBoolean),
      [TOTAL_CONTRACT_VALUE_ID]: totalContractValue,
    };

    return mapped;
  }

  return answers;
};

export default mapEligibilityAnswers;
