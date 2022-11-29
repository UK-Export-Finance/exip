import buyerCountryPage from './buyerCountry';
import cannotApplyPage from './cannotApply';
import exporterLocationPage from './exporterLocation';
import needToStartAgainPage from './needToStartAgain';
import ukGoodsOrServicesPage from './ukGoodsOrServices';

const heading = () => cy.get('[data-cy="heading"]');
const yesNoRadioHint = () => cy.get('[data-cy="yes-no-input-hint"]');
const yesRadio = () => cy.get('[data-cy="yes"]');
const yesRadioInput = () => cy.get('[data-cy="yes-input"]');
const noRadio = () => cy.get('[data-cy="no"]');
const noRadioInput = () => cy.get('[data-cy="no-input"]');
const inlineErrorMessage = () => cy.get('[data-cy="inline-error-message"]');
const submitButton = () => cy.get('[data-cy="submit-button"]');

export {
  heading,
  yesNoRadioHint,
  yesRadio,
  yesRadioInput,
  noRadio,
  noRadioInput,
  inlineErrorMessage,
  submitButton,
  buyerCountryPage,
  cannotApplyPage,
  exporterLocationPage,
  needToStartAgainPage,
  ukGoodsOrServicesPage,
};
