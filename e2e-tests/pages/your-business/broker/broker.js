import { FIELD_IDS } from '../../../constants/field-ids';
import { yesRadioInput, noRadioInput } from '../../shared';

const {
  BROKER: {
    USING_BROKER,
    LEGEND,
    NAME,
    ADDRESS_LINE_1,
    ADDRESS_LINE_2,
    TOWN,
    COUNTY,
    POSTCODE,
    EMAIL,
    DETAILS,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const brokerPage = {
  [LEGEND]: () => cy.get(`[data-cy="${LEGEND}-legend`),
  [USING_BROKER]: {
    value: () => cy.get(`[data-cy="${USING_BROKER}`),
    yesRadioInput: () => yesRadioInput().eq(0),
    noRadioInput: () => noRadioInput().eq(0),
    errorMessage: () => cy.get(`[data-cy="${USING_BROKER}-error-message`),
  },
  [NAME]: {
    label: () => cy.get(`[data-cy="${NAME}-label`),
    input: () => cy.get(`[data-cy="${NAME}-input`),
    errorMessage: () => cy.get(`[data-cy="${NAME}-error-message`),
  },
  [ADDRESS_LINE_1]: {
    label: () => cy.get(`[data-cy="${ADDRESS_LINE_1}-label`),
    input: () => cy.get(`[data-cy="${ADDRESS_LINE_1}-input`),
    errorMessage: () => cy.get(`[data-cy="${ADDRESS_LINE_1}-error-message`),
  },
  [ADDRESS_LINE_2]: {
    label: () => cy.get(`[data-cy="${ADDRESS_LINE_2}-label`),
    input: () => cy.get(`[data-cy="${ADDRESS_LINE_2}-input`),
  },
  [TOWN]: {
    label: () => cy.get(`[data-cy="${TOWN}-label`),
    input: () => cy.get(`[data-cy="${TOWN}-input`),
    errorMessage: () => cy.get(`[data-cy="${TOWN}-error-message`),
  },
  [COUNTY]: {
    label: () => cy.get(`[data-cy="${COUNTY}-label`),
    input: () => cy.get(`[data-cy="${COUNTY}-input`),
  },
  [POSTCODE]: {
    label: () => cy.get(`[data-cy="${POSTCODE}-label`),
    input: () => cy.get(`[data-cy="${POSTCODE}-input`),
    errorMessage: () => cy.get(`[data-cy="${POSTCODE}-error-message`),
  },
  [EMAIL]: {
    label: () => cy.get(`[data-cy="${EMAIL}-label`),
    input: () => cy.get(`[data-cy="${EMAIL}-input`),
    errorMessage: () => cy.get(`[data-cy="${EMAIL}-error-message`),
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
