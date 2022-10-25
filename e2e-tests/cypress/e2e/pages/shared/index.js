const buyerCountryPage = require('./buyerCountry');
const cannotApplyPage = require('./cannotApply');
const exporterLocationPage = require('./exporterLocation');
const ukGoodsOrServicesPage = require('./ukGoodsOrServices');

module.exports = {
  heading: () => cy.get('[data-cy="heading"]'),
  yesRadio: () => cy.get(`[data-cy="yes"]`),
  yesRadioInput: () => cy.get(`[data-cy="yes-input"]`),
  noRadio: () => cy.get(`[data-cy="no"]`),
  noRadioInput: () => cy.get(`[data-cy="no-input"]`),
  inlineErrorMessage: () => cy.get(`[data-cy="inline-error-message"]`),
  submitButton: () => cy.get('[data-cy="submit-button"]'),
  buyerCountryPage,
  cannotApplyPage,
  exporterLocationPage,
  ukGoodsOrServicesPage,
};
