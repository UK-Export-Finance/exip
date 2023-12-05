import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { yesRadioInput, noRadioInput } from '../../shared';

const {
  POLICY: {
    BROKER: { USING_BROKER, DETAILS },
  },
} = INSURANCE_FIELD_IDS;

const brokerPage = {
  [USING_BROKER]: {
    value: () => cy.get(`[data-cy="${USING_BROKER}`),
    yesRadioInput: () => yesRadioInput().eq(0),
    noRadioInput: () => noRadioInput().eq(0),
    errorMessage: () => cy.get(`[data-cy="${USING_BROKER}-error-message`),
  },
  [DETAILS]: {
    details: () => cy.get(`[data-cy="${DETAILS}`),
    summary: () => cy.get(`[data-cy="${DETAILS}"] summary`),
    line_1: () => cy.get(`[data-cy="${DETAILS}-line-1"]`),
    line_2: () => cy.get(`[data-cy="${DETAILS}-line-2`),
    line_3: () => cy.get(`[data-cy="${DETAILS}-line-3`),
    line_4: () => cy.get(`[data-cy="${DETAILS}-line-4`),
    link: () => cy.get(`[data-cy="${DETAILS}-link`),
  },
};

export default brokerPage;
