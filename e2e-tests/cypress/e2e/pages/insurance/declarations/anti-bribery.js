import { FIELD_IDS } from '../../../../../constants';

const {
  INSURANCE: {
    DECLARATIONS: { AGREE_ANTI_BRIBERY },
  },
} = FIELD_IDS;

const antiBriberyPage = {
  listItems: {
    intro: () => cy.get("[data-cy='paragraph-1']"),
    level1: {
      item: (itemNumber) => cy.get(`[data-cy='list-level-1-item-${itemNumber}']`),
    },
    firstLevel2: {
      item: (itemNumber) => cy.get('.lower-alpha-counter-list').first().children(`[data-cy='list-level-2-item-${itemNumber}']`),
    },
    secondLevel2: {
      item: (itemNumber) => cy.get('.lower-alpha-counter-list').last().children(`[data-cy='list-level-2-item-${itemNumber}']`),
    },
  },
  [AGREE_ANTI_BRIBERY]: {
    label: () => cy.get(`[data-cy="${AGREE_ANTI_BRIBERY}-label"]`),
    input: () => cy.get(`[data-cy="${AGREE_ANTI_BRIBERY}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${AGREE_ANTI_BRIBERY}-error-message"]`),
  },
};

export default antiBriberyPage;
