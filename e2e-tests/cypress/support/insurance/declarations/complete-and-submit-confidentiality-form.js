import { FIELD_IDS } from '../../../../constants';
import { submitButton } from '../../../e2e/pages/shared';
import { confidentialityPage } from '../../../e2e/pages/insurance/declarations';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIDENTIALITY;

const field = confidentialityPage[FIELD_ID];

export default () => {
  field.input().click();

  submitButton().click();
};
