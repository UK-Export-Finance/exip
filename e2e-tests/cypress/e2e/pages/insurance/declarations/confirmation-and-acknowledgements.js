import { FIELD_IDS } from '../../../../../constants';

const {
  INSURANCE: {
    DECLARATIONS: { AGREE_CONFIRMATION_ACKNOWLEDGEMENTS },
  },
} = FIELD_IDS;

const confirmationAcknowledgementsPage = {
  listItems: {
    intro: () => cy.get("[data-cy='paragraph-1']"),
    level1: {
      item: (itemNumber) => cy.get(`[data-cy='list-level-1-item-${itemNumber}']`),
    },
    level2: {
      item: (itemNumber) => cy.get(`[data-cy='list-level-2-item-${itemNumber}']`),
    },
  },
  [AGREE_CONFIRMATION_ACKNOWLEDGEMENTS]: {
    label: () => cy.get(`[data-cy="${AGREE_CONFIRMATION_ACKNOWLEDGEMENTS}-label"]`),
    input: () => cy.get(`[data-cy="${AGREE_CONFIRMATION_ACKNOWLEDGEMENTS}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${AGREE_CONFIRMATION_ACKNOWLEDGEMENTS}-error-message"]`),
  },
};

export default confirmationAcknowledgementsPage;
