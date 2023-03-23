import { FIELD_IDS } from '../../../../../constants';

const {
  INSURANCE: {
    DECLARATIONS: { AGREE_HOW_YOUR_DATA_WILL_BE_USED },
  },
} = FIELD_IDS;

const howYourDataWillBeUsedPage = {
  paragraph: (itemNumber) => cy.get(`[data-cy='paragraph-${itemNumber}']`),
  link: (itemNumber) => cy.get(`[data-cy='paragraph-${itemNumber}-link']`),
  [AGREE_HOW_YOUR_DATA_WILL_BE_USED]: {
    label: () => cy.get(`[data-cy="${AGREE_HOW_YOUR_DATA_WILL_BE_USED}-label"]`),
    input: () => cy.get(`[data-cy="${AGREE_HOW_YOUR_DATA_WILL_BE_USED}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${AGREE_HOW_YOUR_DATA_WILL_BE_USED}-error-message"]`),
  },
};

export default howYourDataWillBeUsedPage;
