import { FIELD_VALUES } from '../../constants';
import { submitButton } from '../../pages/shared';

/**
 * completeAndSubmitExportValueForm
 * Complete and submit the "Export value" form
 * @param {Object} Object with flags completing and submitting export value form
 * - policyType: type of policy
 * - policyMaximumValue: should submit an application with the maximum value of 500000
 */
const completeAndSubmitExportValueForm = ({ policyType = FIELD_VALUES.POLICY_TYPE.SINGLE }) => {
  cy.completeExportValueForm({ policyType });
  submitButton().click();
};

export default completeAndSubmitExportValueForm;
