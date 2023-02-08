import { FIELD_IDS } from '../../../../../constants/field-ids';
import { yesRadioInput, noRadioInput } from '../../shared';

const {
  BROKER: {
    USING_BROKER,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const broker = {
  [USING_BROKER]: {
    heading: () => cy.get(`[data-cy="${USING_BROKER}-heading`),
    value: () => cy.get(`[data-cy="${USING_BROKER}`),
    yesRadioInput: () => yesRadioInput().eq(0),
    noRadioInput: () => noRadioInput().eq(0),
    errorMessage: () => cy.get(`[data-cy="${USING_BROKER}-error`),
  },
};

export default broker;
