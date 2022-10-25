import { FIELD_IDS } from '../../../../constants';

const needToStartAgainPage = {
  reason: () => cy.get('[data-cy="reason"]'),
};

export default needToStartAgainPage;
