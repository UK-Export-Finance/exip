import { brokerPage } from '../../pages/your-business';
import { field, submitButton } from '../../pages/shared';
import { FIELD_IDS } from '../../constants';
import application from '../../fixtures/application';

const {
  BROKER: {
    USING_BROKER,
    NAME,
    ADDRESS_LINE_1,
    ADDRESS_LINE_2,
    TOWN,
    COUNTY,
    EMAIL,
    POSTCODE,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

/**
 * completeAndSubmitBrokerForm
 * Runs through the "using broker" journey
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to "no".
 */
const completeAndSubmitBrokerForm = ({
  usingBroker = false,
}) => {
  if (usingBroker) {
    brokerPage[USING_BROKER].yesRadio().click();
    cy.keyboardInput(field(NAME).input(), application.EXPORTER_BROKER[NAME]);
    cy.keyboardInput(field(ADDRESS_LINE_1).input(), application.EXPORTER_BROKER[ADDRESS_LINE_1]);
    cy.keyboardInput(field(ADDRESS_LINE_2).input(), application.EXPORTER_BROKER[ADDRESS_LINE_2]);
    cy.keyboardInput(field(TOWN).input(), application.EXPORTER_BROKER[TOWN]);
    cy.keyboardInput(field(COUNTY).input(), application.EXPORTER_BROKER[COUNTY]);
    cy.keyboardInput(field(EMAIL).input(), application.EXPORTER_BROKER[EMAIL]);
    cy.keyboardInput(field(POSTCODE).input(), application.EXPORTER_BROKER[POSTCODE]);
  } else {
    brokerPage[USING_BROKER].noRadio().click();
  }

  submitButton().click();
};

export default completeAndSubmitBrokerForm;
