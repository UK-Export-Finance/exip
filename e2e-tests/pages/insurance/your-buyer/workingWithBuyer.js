import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';
import { yesRadioInput, noRadioInput } from '../../shared';

const {
  WORKING_WITH_BUYER: {
    TRADED_WITH_BUYER,
  },
} = FIELD_IDS;

const workingWithBuyer = {
  [TRADED_WITH_BUYER]: {
    label: () => cy.get(`[data-cy="${TRADED_WITH_BUYER}-label"]`),
    hint: () => cy.get(`[data-cy="${TRADED_WITH_BUYER}-hint"]`),
    yesRadioInput: () => yesRadioInput().first(),
    noRadioInput: () => noRadioInput().first(),
    errorMessage: () => cy.get(`[data-cy="${TRADED_WITH_BUYER}-error-message"]`),
  },
};

export default workingWithBuyer;
