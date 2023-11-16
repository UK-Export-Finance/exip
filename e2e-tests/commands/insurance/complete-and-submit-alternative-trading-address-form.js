import { submitButton, field as fieldSelector } from '../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';

const {
  EXPORTER_BUSINESS: {
    ALTERNATIVE_TRADING_ADDRESS,
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeAndSubmitAlternativeTradingAddressForm
 * Complet and submit the "alternative trading address" form in the "your business" section.
 */
const completeAndSubmitAlternativeTradingAddressForm = () => {
  fieldSelector(ALTERNATIVE_TRADING_ADDRESS).textarea().type('test');
  submitButton().click();
};

export default completeAndSubmitAlternativeTradingAddressForm;
