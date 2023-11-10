import { field } from '../../pages/shared';
import { SHARED_CONTRACT_POLICY } from '../../constants/field-ids/insurance/policy';

const { CREDIT_PERIOD_WITH_BUYER: FIELD_ID } = SHARED_CONTRACT_POLICY;

const creditPeriodWithBuyerFormField = {
  ...field(FIELD_ID),
  hint: {
    intro: () => cy.get(`[data-cy="${FIELD_ID}-hint-intro"]`),
    listItem: (index) => cy.get(`[data-cy="${FIELD_ID}-hint-list-item-${index}"]`),
  },
};

export default creditPeriodWithBuyerFormField;
