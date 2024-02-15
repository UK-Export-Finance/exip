import { FIELD_IDS } from '../../../constants';
import { singleInputField } from '../../../pages/shared';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_ANTI_BRIBERY;

export default () => {
  singleInputField(FIELD_ID).label().click();

  cy.clickSubmitButton();
};
