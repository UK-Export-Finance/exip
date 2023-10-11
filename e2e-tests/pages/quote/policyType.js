import { field } from '../shared';
import { FIELD_IDS } from '../../constants';

const {
  POLICY_TYPE,
  SINGLE_POLICY_TYPE,
  MULTIPLE_POLICY_TYPE,
} = FIELD_IDS;

const policyTypePage = {
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

export default policyTypePage;
