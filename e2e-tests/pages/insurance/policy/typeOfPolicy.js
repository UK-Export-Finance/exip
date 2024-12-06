import { field } from '../../shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';

const {
  SINGLE_POLICY_TYPE,
  MULTIPLE_POLICY_TYPE,
  TYPE_OF_POLICY: { POLICY_TYPE },
} = POLICY_FIELD_IDS;

const typeOfPolicy = {
  [POLICY_TYPE]: {
    single: {
      ...field(SINGLE_POLICY_TYPE),
      hintListItem: (index) => cy.get(`[data-cy="${SINGLE_POLICY_TYPE}-hint-list-item-${index}"]`),
    },
    multiple: {
      ...field(MULTIPLE_POLICY_TYPE),
      hintListItem: (index) => cy.get(`[data-cy="${MULTIPLE_POLICY_TYPE}-hint-list-item-${index}"]`),
    },
  },
};

export default typeOfPolicy;
