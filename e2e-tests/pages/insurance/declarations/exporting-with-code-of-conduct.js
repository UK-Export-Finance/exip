import { FIELD_IDS } from '../../../constants';

const {
  INSURANCE: {
    DECLARATIONS: { WILL_EXPORT_WITH_CODE_OF_CONDUCT },
  },
} = FIELD_IDS;

const exportingWithCodeOfConductPage = {
  [WILL_EXPORT_WITH_CODE_OF_CONDUCT]: {
    label: () => cy.get(`[data-cy="${WILL_EXPORT_WITH_CODE_OF_CONDUCT}-label"]`),
    input: () => cy.get(`[data-cy="${WILL_EXPORT_WITH_CODE_OF_CONDUCT}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${WILL_EXPORT_WITH_CODE_OF_CONDUCT}-error-message"]`),
  },
};

export default exportingWithCodeOfConductPage;
