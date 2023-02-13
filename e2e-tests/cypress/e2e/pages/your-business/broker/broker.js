import { FIELD_IDS } from '../../../../../constants/field-ids';
import { yesRadioInput, noRadioInput } from '../../shared';

const {
  BROKER: {
    USING_BROKER,
    HEADING,
    NAME,
    ADDRESS_LINE_1,
    ADDRESS_LINE_2,
    TOWN,
    COUNTY,
    POSTCODE,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const broker = {
  [HEADING]: () => cy.get(`[data-cy="${HEADING}-heading`),
  [USING_BROKER]: {
    value: () => cy.get(`[data-cy="${USING_BROKER}`),
    yesRadioInput: () => yesRadioInput().eq(0),
    noRadioInput: () => noRadioInput().eq(0),
    errorMessage: () => cy.get(`[data-cy="${USING_BROKER}-error`),
  },
  [NAME]: {
    label: () => cy.get(`[data-cy="${NAME}-label`),
    input: () => cy.get(`[data-cy="${NAME}`),
    errorMessage: () => cy.get(`[data-cy="${NAME}-error`),
  },
  [ADDRESS_LINE_1]: {
    label: () => cy.get(`[data-cy="${ADDRESS_LINE_1}-label`),
    input: () => cy.get(`[data-cy="${ADDRESS_LINE_1}`),
    errorMessage: () => cy.get(`[data-cy="${ADDRESS_LINE_1}-error`),
  },
  [ADDRESS_LINE_2]: {
    label: () => cy.get(`[data-cy="${ADDRESS_LINE_2}-label`),
    input: () => cy.get(`[data-cy="${ADDRESS_LINE_2}`),
  },
  [TOWN]: {
    label: () => cy.get(`[data-cy="${TOWN}-label`),
    input: () => cy.get(`[data-cy="${TOWN}`),
    errorMessage: () => cy.get(`[data-cy="${TOWN}-error`),
  },
  [COUNTY]: {
    label: () => cy.get(`[data-cy="${COUNTY}-label`),
    input: () => cy.get(`[data-cy="${COUNTY}`),
  },
  [POSTCODE]: {
    label: () => cy.get(`[data-cy="${POSTCODE}-label`),
    input: () => cy.get(`[data-cy="${POSTCODE}`),
  },
};

export default broker;
