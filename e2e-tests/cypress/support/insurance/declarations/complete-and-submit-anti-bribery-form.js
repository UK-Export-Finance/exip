import { FIELD_IDS } from '../../../../constants';
import { singleInputField, submitButton } from '../../../e2e/pages/shared';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_ANTI_BRIBERY;

export default () => {
  singleInputField(FIELD_ID).input().click();

  submitButton().click();
};
