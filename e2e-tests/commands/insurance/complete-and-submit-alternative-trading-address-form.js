import { submitButton, field as fieldSelector } from '../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import application from '../../fixtures/application';

const {
  EXPORTER_BUSINESS: {
    FULL_ADDRESS,
  },
} = INSURANCE_FIELD_IDS;

const { DIFFERENT_TRADING_ADDRESS } = application;

/**
 * completeAndSubmitAlternativeTradingAddressForm
 * Complet and submit the "alternative trading address" form in the "your business" section.
 */
const completeAndSubmitAlternativeTradingAddressForm = () => {
  fieldSelector(FULL_ADDRESS).textarea().type(DIFFERENT_TRADING_ADDRESS[FULL_ADDRESS]);
  submitButton().click();
};

export default completeAndSubmitAlternativeTradingAddressForm;
