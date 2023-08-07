import { YOUR_BUYER as FIELD_IDS } from '../../../../../constants/field-ids/insurance/your-buyer';
import { yesRadioInput, noRadioInput } from '../../shared';

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
    COUNTRY,
    REGISTRATION_NUMBER,
    WEBSITE,
    FIRST_NAME,
    LAST_NAME,
    POSITION,
    EMAIL,
    CAN_CONTACT_BUYER,
  },
} = FIELD_IDS;

const companyOrOrganisation = {
  [NAME]: {
    label: () => cy.get(`[data-cy="${NAME}-label"]`),
    input: () => cy.get(`[data-cy="${NAME}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${NAME}-error-message"]`),
  },
  [ADDRESS]: {
    label: () => cy.get(`[data-cy="${ADDRESS}-label"]`),
    input: () => cy.get(`[data-cy="${ADDRESS}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${ADDRESS}-error-message"]`),
  },
  [COUNTRY]: {
    heading: () => cy.get(`[data-cy="${COUNTRY}-heading"]`),
    value: () => cy.get(`[data-cy="${COUNTRY}"]`),
  },
  [REGISTRATION_NUMBER]: {
    label: () => cy.get(`[data-cy="${REGISTRATION_NUMBER}-label"]`),
    input: () => cy.get(`[data-cy="${REGISTRATION_NUMBER}-input"]`),
  },
  [WEBSITE]: {
    label: () => cy.get(`[data-cy="${WEBSITE}-label"]`),
    input: () => cy.get(`[data-cy="${WEBSITE}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${WEBSITE}-error-message"]`),
  },
  [FIRST_NAME]: {
    legend: () => cy.get(`[data-cy="${FIRST_NAME}-legend"]`),
    hint: () => cy.get(`[data-cy="${FIRST_NAME}-hint"]`),
    label: () => cy.get(`[data-cy="${FIRST_NAME}-label"]`),
    input: () => cy.get(`[data-cy="${FIRST_NAME}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIRST_NAME}-error-message"]`),
  },
  [LAST_NAME]: {
    label: () => cy.get(`[data-cy="${LAST_NAME}-label"]`),
    input: () => cy.get(`[data-cy="${LAST_NAME}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${LAST_NAME}-error-message"]`),
  },
  [POSITION]: {
    label: () => cy.get(`[data-cy="${POSITION}-label"]`),
    input: () => cy.get(`[data-cy="${POSITION}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${POSITION}-error-message"]`),
  },
  [EMAIL]: {
    label: () => cy.get(`[data-cy="${EMAIL}-label"]`),
    input: () => cy.get(`[data-cy="${EMAIL}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${EMAIL}-error-message"]`),
  },
  [CAN_CONTACT_BUYER]: {
    label: () => cy.get(`[data-cy="${CAN_CONTACT_BUYER}-label"]`),
    hint: () => cy.get('[data-cy="yes-no-input-hint"]'),
    yesRadioInput: () => yesRadioInput().first(),
    noRadioInput: () => noRadioInput().first(),
    errorMessage: () => cy.get(`[data-cy="${CAN_CONTACT_BUYER}-error-message"]`),
  },
};

export default companyOrOrganisation;
