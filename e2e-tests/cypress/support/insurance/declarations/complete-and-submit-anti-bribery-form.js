import { FIELD_IDS } from '../../../../constants';
import { submitButton } from '../../../e2e/pages/shared';
import { antiBriberyPage } from '../../../e2e/pages/insurance/declarations';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_ANTI_BRIBERY;

const field = antiBriberyPage[FIELD_ID];

export default () => {
  field.input().click();

  submitButton().click();
};
