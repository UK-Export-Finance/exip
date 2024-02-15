import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { radios } from '../../../pages/shared';

const {
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

/**
 * clickAlternativeCurrencyRadioOption
 * Click an "alternative currency" radio option.
 */
const clickAlternativeCurrencyRadioOption = (fieldId = ALTERNATIVE_CURRENCY_CODE) => {
  const { option } = radios(fieldId);

  option.label().click();
};

export default clickAlternativeCurrencyRadioOption;
