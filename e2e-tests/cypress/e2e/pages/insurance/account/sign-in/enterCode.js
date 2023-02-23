import { FIELD_IDS } from '../../../../../../constants';

const {
  INSURANCE: {
    ACCOUNT: { SECURITY_CODE },
  },
} = FIELD_IDS;

const enterCodePage = {
  [SECURITY_CODE]: {
    label: () => cy.get(`[data-cy="${SECURITY_CODE}-label"]`),
    input: () => cy.get(`[data-cy="${SECURITY_CODE}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${SECURITY_CODE}-error-message"]`),
  },
  requestNewCodeLink: () => cy.get('[data-cy="request-new-code"]'),
};

export default enterCodePage;
