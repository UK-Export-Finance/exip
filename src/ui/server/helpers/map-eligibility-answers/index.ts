import { FIELD_IDS } from '../../constants';
import mapTotalContractValue from '../map-total-contract-value';
import { SubmittedDataInsuranceEligibility } from '../../../types';

const {
  INSURANCE: {
    ELIGIBILITY: { BUYER_COUNTRY_ISO_CODE, TOTAL_CONTRACT_VALUE_ID },
  },
} = FIELD_IDS;

const mapEligibilityAnswers = (answers: SubmittedDataInsuranceEligibility) => {
  if (answers.buyerCountry) {
    const { buyerCountry, wantCoverOverMaxAmount, ...otherAnswers } = answers;

    const wantCoverOverMaxAmountBoolean = Boolean(wantCoverOverMaxAmount);

    const mapped = {
      ...otherAnswers,
      [BUYER_COUNTRY_ISO_CODE]: buyerCountry?.isoCode,
      [TOTAL_CONTRACT_VALUE_ID]: mapTotalContractValue(wantCoverOverMaxAmountBoolean),
    };

    return mapped;
  }

  return answers;
};

export default mapEligibilityAnswers;
