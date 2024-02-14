import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';
import { yesRadio, noRadio } from '../../shared';

const {
  WORKING_WITH_BUYER: {
    CONNECTED_WITH_BUYER,
    TRADED_WITH_BUYER,
  },
} = FIELD_IDS;

const workingWithBuyer = {
  [CONNECTED_WITH_BUYER]: {
    label: () => cy.get(`[data-cy="${CONNECTED_WITH_BUYER}-label"]`),
    hint: () => cy.get(`[data-cy="${CONNECTED_WITH_BUYER}-hint"]`),
    yesRadio: () => yesRadio().label().eq(0),
    noRadio: () => noRadio().label().eq(0),
    yesRadioInput: () => yesRadio().input().eq(0),
    noRadioInput: () => noRadio().input().eq(0),
    errorMessage: () => cy.get(`[data-cy="${CONNECTED_WITH_BUYER}-error-message"]`),
  },
  [TRADED_WITH_BUYER]: {
    label: () => cy.get(`[data-cy="${TRADED_WITH_BUYER}-label"]`),
    hint: () => cy.get(`[data-cy="${TRADED_WITH_BUYER}-hint"]`),
    yesRadio: () => yesRadio().label().eq(1),
    noRadio: () => noRadio().label().eq(1),
    yesRadioInput: () => yesRadio().input().eq(1),
    noRadioInput: () => noRadio().input().eq(1),
    errorMessage: () => cy.get(`[data-cy="${TRADED_WITH_BUYER}-error-message"]`),
  },
};

export default workingWithBuyer;
