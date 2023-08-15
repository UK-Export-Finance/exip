import { FIELD_IDS } from '../../../constants';
import { singleInputField, submitButton } from '../../../pages/shared';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_HOW_YOUR_DATA_WILL_BE_USED;

const field = singleInputField(FIELD_ID);

export default () => {
  field.input().click();

  submitButton().click();
};
