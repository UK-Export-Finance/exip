import { field as fieldSelector } from '../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import application from '../../fixtures/application';

const {
  FULL_ADDRESS,
} = INSURANCE_FIELD_IDS.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS;

const { DIFFERENT_TRADING_ADDRESS } = application;

/**
 * completeAndSubmitAlternativeTradingAddressForm
 * Complete and submit the "alternative trading address" form in the "your business" section.
 * @param {String} address: Custom address to enter
 */
const completeAndSubmitAlternativeTradingAddressForm = ({
  address = DIFFERENT_TRADING_ADDRESS[FULL_ADDRESS],
}) => {
  fieldSelector(FULL_ADDRESS).textarea().type(address);
  cy.clickSubmitButton();
};

export default completeAndSubmitAlternativeTradingAddressForm;
