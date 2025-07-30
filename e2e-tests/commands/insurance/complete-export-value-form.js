import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import { multipleContractPolicyExportValuePage } from '../../pages/insurance/policy';
import { field } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  EXPORT_VALUE: {
    MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
} = POLICY_FIELD_IDS;

/**
 * completeExportValueForm
 * Complete the "Export value" form
 * @param {string} totalSalesToBuyer: Total sales to the buyer
 * @param {string} maximumBuyerWillOwe: Maximum buyer will owe
 */
const completeExportValueForm = ({
  totalSalesToBuyer = application.POLICY[TOTAL_SALES_TO_BUYER],
  maximumBuyerWillOwe = application.POLICY[MAXIMUM_BUYER_WILL_OWE],
}) => {
  cy.keyboardInput(field(TOTAL_SALES_TO_BUYER).input(), totalSalesToBuyer);

  cy.keyboardInput(multipleContractPolicyExportValuePage[MAXIMUM_BUYER_WILL_OWE].input(), maximumBuyerWillOwe);
};

export default completeExportValueForm;
