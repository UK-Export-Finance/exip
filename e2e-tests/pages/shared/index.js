import actions from './actions';
import countryInput from './countryInput';
import cannotApplyPage from './cannotApply';
import exporterLocationPage from './exporterLocation';
import needToStartAgainPage from './needToStartAgain';
import summaryList from './summaryList';
import ukGoodsOrServicesPage from './ukGoodsOrServices';
import field from './field';

const backLink = () => cy.get('[data-cy="back-link"]');
const body = () => cy.get('[data-cy="body"]');
const heading = () => cy.get('[data-cy="heading"]');
const headingCaption = () => cy.get('[data-cy="heading-caption"]');
const yesNoRadioHint = () => cy.get('[data-cy="yes-no-input-hint"]');
const yesRadio = (fieldId) => ({
  label: () => cy.get('[data-cy="yes"]'),
  input: () => cy.get('[data-cy="yes-input"]'),
  hint: () => cy.get(`[data-cy="${fieldId}-hint"]`),
  errorMessage: () => cy.get(`[data-cy="${fieldId}-error-message"]`),
});
const yesRadioInput = () => cy.get('[data-cy="yes-input"]');
const noRadio = (fieldId) => ({
  label: () => cy.get('[data-cy="no"]'),
  input: () => cy.get('[data-cy="no-input"]'),
  hint: () => cy.get(`[data-cy="${fieldId}-hint"]`),
  errorMessage: () => cy.get(`[data-cy="${fieldId}-error-message"]`),
});
const noRadioInput = () => cy.get('[data-cy="no-input"]');
const submitButton = () => cy.get('[data-cy="submit-button"]');
const saveAndBackButton = () => cy.get('[data-cy="save-and-back-button"]');
const status = () => cy.get('[data-cy="status"]');
const singleInputField = (fieldId) => ({
  label: () => cy.get(`[data-cy="${fieldId}-label"]`),
  input: () => cy.get(`[data-cy="${fieldId}-input"]`),
  errorMessage: () => cy.get(`[data-cy="${fieldId}-error-message"]`),
});

export {
  actions,
  backLink,
  body,
  heading,
  headingCaption,
  yesNoRadioHint,
  yesRadio,
  yesRadioInput,
  noRadio,
  noRadioInput,
  submitButton,
  saveAndBackButton,
  status,
  singleInputField,
  countryInput,
  cannotApplyPage,
  exporterLocationPage,
  field,
  needToStartAgainPage,
  summaryList,
  ukGoodsOrServicesPage,
};
