import { noRadioInput, yesRadioInput, field } from '../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import mockApplication from '../../fixtures/application';

const { CREDIT_PERIOD_WITH_BUYER } = POLICY_FIELD_IDS;
/**
 * completeAndSubmitPreCreditPeriodForm
 * Complete and submit the "pre-credit period" form
 * @param {Boolean} needPreCreditPeriod - if a pre-credit period is required - default false
 */
const completeAndSubmitPreCreditPeriodForm = ({ needPreCreditPeriod = false }) => {
  if (needPreCreditPeriod) {
    yesRadioInput().click();

    const descriptionField = field(CREDIT_PERIOD_WITH_BUYER);

    const value = mockApplication.POLICY[CREDIT_PERIOD_WITH_BUYER];

    cy.keyboardInput(descriptionField.textarea(), value);
  } else {
    noRadioInput().click();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitPreCreditPeriodForm;
