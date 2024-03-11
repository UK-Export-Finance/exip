import actions from './actions';
import autoCompleteField from './autoCompleteField';
import cannotApplyPage from './cannotApply';
import radios from './radios';
import exporterLocationPage from './exporterLocation';
import needToStartAgainPage from './needToStartAgain';
import summaryList from './summaryList';
import ukGoodsOrServicesPage from './ukGoodsOrServices';
import field from './field';

const allSectionsLink = () => cy.get('[data-cy="all-sections-link"]');
const backLink = () => cy.get('[data-cy="back-link"]');
const body = () => cy.get('[data-cy="body"]');
const form = () => cy.get('[data-cy="form"]');
const heading = () => cy.get('[data-cy="heading"]');
const headingCaption = () => cy.get('[data-cy="heading-caption"]');
const insetText = () => cy.get('[data-cy="inset-text"]');
const insetTextHtml = () => cy.get('[data-cy="inset-text-html"]');
const intro = () => cy.get('[data-cy="intro"]');
const listIntro = () => cy.get('[data-cy="list-intro"]');
const listItem = (index) => cy.get(`[data-cy="list-item-${index}"]`);
const listOutro = () => cy.get('[data-cy="list-outro"]');
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
const outro = () => cy.get('[data-cy="outro"]');
const radioInputs = () => cy.get('.govuk-radios__item > input');
const submitButton = () => cy.get('[data-cy="submit-button"]');
const saveAndBackButton = () => cy.get('[data-cy="save-and-back-button"]');
const startNowLink = () => cy.get('[data-cy="start-now-link"]');
const status = () => cy.get('[data-cy="status"]');
const warning = () => cy.get('[data-cy="warning"]');
const singleInputField = (fieldId) => ({
  legend: () => cy.get(`[data-cy="${fieldId}-legend"]`),
  label: () => cy.get(`[data-cy="${fieldId}-label"]`),
  input: () => cy.get(`[data-cy="${fieldId}-input"]`),
  errorMessage: () => cy.get(`[data-cy="${fieldId}-error-message"]`),
});

export {
  actions,
  allSectionsLink,
  autoCompleteField,
  backLink,
  body,
  form,
  heading,
  headingCaption,
  intro,
  insetText,
  insetTextHtml,
  listIntro,
  listItem,
  listOutro,
  yesNoRadioHint,
  yesRadio,
  yesRadioInput,
  noRadio,
  noRadioInput,
  outro,
  radios,
  radioInputs,
  submitButton,
  saveAndBackButton,
  startNowLink,
  status,
  singleInputField,
  cannotApplyPage,
  exporterLocationPage,
  field,
  needToStartAgainPage,
  summaryList,
  ukGoodsOrServicesPage,
  warning,
};
