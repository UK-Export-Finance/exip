import buyerCountryPage from './buyerCountry';
import cannotApplyPage from './cannotApply';
import exporterLocationPage from './exporterLocation';
import needToStartAgainPage from './needToStartAgain';
import ukGoodsOrServicesPage from './ukGoodsOrServices';

const backLink = () => cy.get('[data-cy="back-link"]');
const heading = () => cy.get('[data-cy="heading"]');
const headingCaption = () => cy.get('[data-cy="heading-caption"]');
const yesNoRadioHint = () => cy.get('[data-cy="yes-no-input-hint"]');
const yesRadio = () => cy.get('[data-cy="yes"]');
const yesRadioInput = () => cy.get('[data-cy="yes-input"]');
const noRadio = () => cy.get('[data-cy="no"]');
const noRadioInput = () => cy.get('[data-cy="no-input"]');
const inlineErrorMessage = () => cy.get('[data-cy="inline-error-message"]');
const submitButton = () => cy.get('[data-cy="submit-button"]');
const saveAndBackButton = () => cy.get('[data-cy="save-and-back-button"]');
const singleInputField = (fieldId) => ({
  label: () => cy.get(`[data-cy="${fieldId}-label"]`),
  input: () => cy.get(`[data-cy="${fieldId}-input"]`),
  errorMessage: () => cy.get(`[data-cy="${fieldId}-error-message"]`),
});

export {
  backLink,
  heading,
  headingCaption,
  yesNoRadioHint,
  yesRadio,
  yesRadioInput,
  noRadio,
  noRadioInput,
  inlineErrorMessage,
  submitButton,
  saveAndBackButton,
  singleInputField,
  buyerCountryPage,
  cannotApplyPage,
  exporterLocationPage,
  needToStartAgainPage,
  ukGoodsOrServicesPage,
};
