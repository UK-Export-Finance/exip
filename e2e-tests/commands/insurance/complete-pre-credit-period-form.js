import { field } from '../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import mockApplication from '../../fixtures/application';

const { CREDIT_PERIOD_WITH_BUYER } = POLICY_FIELD_IDS;
/**
 * completePreCreditPeriodForm
 * Complete the "pre-credit period" form
 * @param {Boolean} needPreCreditPeriod: If a pre-credit period is required - default false
 * @param {String} description: Custom "credit period with buyer" description value
 */
const completePreCreditPeriodForm = ({
  needPreCreditPeriod = false,
  description = mockApplication.POLICY[CREDIT_PERIOD_WITH_BUYER],
}) => {
  if (needPreCreditPeriod) {
    cy.clickYesRadioInput();

    const descriptionField = field(CREDIT_PERIOD_WITH_BUYER);

    cy.keyboardInput(descriptionField.textarea(), description);
  } else {
    cy.clickNoRadioInput();
  }
};

export default completePreCreditPeriodForm;
