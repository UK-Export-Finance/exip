import { FIELD_IDS } from '../../../../constants';
import { workingWithBuyer } from '../../../e2e/pages/insurance/your-buyer';
import { submitButton } from '../../../e2e/pages/shared';

const {
  WORKING_WITH_BUYER: {
    CONNECTED_WITH_BUYER,
    TRADED_WITH_BUYER,
  },
} = FIELD_IDS.INSURANCE.YOUR_BUYER;

export default () => {
  workingWithBuyer[CONNECTED_WITH_BUYER].yesRadioInput().click();
  workingWithBuyer[TRADED_WITH_BUYER].yesRadioInput().click();

  submitButton().click();
};
