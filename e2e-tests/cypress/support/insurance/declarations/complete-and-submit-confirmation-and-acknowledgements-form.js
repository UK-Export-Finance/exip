import { FIELD_IDS } from '../../../../constants';
import { submitButton } from '../../../e2e/pages/shared';
import { confirmationAndAcknowledgementsPage } from '../../../e2e/pages/insurance/declarations';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIRMATION_ACKNOWLEDGEMENTS;

const field = confirmationAndAcknowledgementsPage[FIELD_ID];

export default () => {
  field.input().click();

  submitButton().click();
};
