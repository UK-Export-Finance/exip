import { FIELD_IDS } from '../../../../constants';

const needToStartAgainPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  reason: () => cy.get('[data-cy="reason"]'),
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default needToStartAgainPage;
