import { FIELD_IDS } from '../../../../../constants/field-ids';
import { yesRadioInput, noRadioInput } from '../../shared';

const {
  BROKER: {
    USING_BROKER,
    BROKER_HEADING,
    BROKER_NAME,
    BROKER_ADDRESS_LINE_1,
    BROKER_ADDRESS_LINE_2,
    BROKER_TOWN,
    BROKER_COUNTY,
    BROKER_POSTCODE,
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
  [BROKER_HEADING]: {
    heading: () => cy.get(`[data-cy="${BROKER_HEADING}-heading`),
  },
  [BROKER_NAME]: {
    label: () => cy.get(`[data-cy="${BROKER_NAME}-label`),
    input: () => cy.get(`[data-cy="${BROKER_NAME}`),
    errorMessage: () => cy.get(`[data-cy="${BROKER_NAME}-error`),
  },
  [BROKER_ADDRESS_LINE_1]: {
    label: () => cy.get(`[data-cy="${BROKER_ADDRESS_LINE_1}-label`),
    input: () => cy.get(`[data-cy="${BROKER_ADDRESS_LINE_1}`),
    errorMessage: () => cy.get(`[data-cy="${BROKER_ADDRESS_LINE_1}-error`),
  },
  [BROKER_ADDRESS_LINE_2]: {
    label: () => cy.get(`[data-cy="${BROKER_ADDRESS_LINE_2}-label`),
    input: () => cy.get(`[data-cy="${BROKER_ADDRESS_LINE_2}`),
  },
  [BROKER_TOWN]: {
    label: () => cy.get(`[data-cy="${BROKER_TOWN}-label`),
    input: () => cy.get(`[data-cy="${BROKER_TOWN}`),
    errorMessage: () => cy.get(`[data-cy="${BROKER_TOWN}-error`),
  },
  [BROKER_COUNTY]: {
    label: () => cy.get(`[data-cy="${BROKER_COUNTY}-label`),
    input: () => cy.get(`[data-cy="${BROKER_COUNTY}`),
  },
  [BROKER_POSTCODE]: {
    label: () => cy.get(`[data-cy="${BROKER_POSTCODE}-label`),
    input: () => cy.get(`[data-cy="${BROKER_POSTCODE}`),
  },
};

export default broker;
