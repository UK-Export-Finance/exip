import { FIELD_IDS, TOTAL_CONTRACT_VALUE } from '../../constants';
import { SubmittedDataInsuranceEligibility } from '../../../types';

const {
  INSURANCE: {
    ELIGIBILITY: { BUYER_COUNTRY_ISO_CODE, TOTAL_CONTRACT_VALUE_ID },
  },
} = FIELD_IDS;

export const mapTotalContractValue = (answer: boolean) => {
  if (answer) {
    return TOTAL_CONTRACT_VALUE.LESS_THAN_500K.DB_ID;
  }

  return TOTAL_CONTRACT_VALUE.MORE_THAN_500K.DB_ID;
};

const mapEligibilityAnswers = (answers: SubmittedDataInsuranceEligibility) => {
  if (answers.buyerCountry) {
    const { buyerCountry, wantCoverOverMaxAmount, ...otherAnswers } = answers;

    const mapped = {
      ...otherAnswers,
      [BUYER_COUNTRY_ISO_CODE]: buyerCountry?.isoCode,
      [TOTAL_CONTRACT_VALUE_ID]: mapTotalContractValue(Boolean(wantCoverOverMaxAmount)),
    };

    return mapped;
  }

  return answers;
};

export default mapEligibilityAnswers;
