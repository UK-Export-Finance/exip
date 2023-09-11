import FIELD_IDS from '../../constants/field-ids/insurance';
import { SubmittedDataInsuranceEligibility } from '../../../types';

const { BUYER_COUNTRY_ISO_CODE } = FIELD_IDS.ELIGIBILITY;

const mapEligibilityAnswers = (answers: SubmittedDataInsuranceEligibility) => {
  if (answers.buyerCountry) {
    const { buyerCountry, ...otherAnswers } = answers;

    const mapped = {
      ...otherAnswers,
      [BUYER_COUNTRY_ISO_CODE]: buyerCountry?.isoCode,
    };

    return mapped;
  }

  return answers;
};

export default mapEligibilityAnswers;
