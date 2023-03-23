import { FIELD_IDS } from '../../../../constants';
import { submitButton } from '../../../e2e/pages/shared';
import { howYourDataWillBeUsedPage } from '../../../e2e/pages/insurance/declarations';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_HOW_YOUR_DATA_WILL_BE_USED;

const field = howYourDataWillBeUsedPage[FIELD_ID];

export default () => {
  field.input().click();

  submitButton().click();
};
