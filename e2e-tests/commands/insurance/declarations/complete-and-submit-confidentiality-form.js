import { FIELD_IDS } from '../../../constants';
import { singleInputField } from '../../../pages/shared';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIDENTIALITY;

export default () => {
  singleInputField(FIELD_ID).input().click();

  cy.clickSubmitButton();
};
