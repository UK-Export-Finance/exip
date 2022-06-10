import { FIELD_IDS } from '../../../constants';

const triedToObtainCoverPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  [FIELD_IDS.TRIED_PRIVATE_COVER]: {
    yes: () => cy.get(`[data-cy="${FIELD_IDS.TRIED_PRIVATE_COVER}-yes"]`),
    yesInput: () => cy.get(`[data-cy="${FIELD_IDS.TRIED_PRIVATE_COVER}-yes-input"]`),
    no: () => cy.get(`[data-cy="${FIELD_IDS.TRIED_PRIVATE_COVER}-no"]`),
    noInput: () => cy.get(`[data-cy="${FIELD_IDS.TRIED_PRIVATE_COVER}-no-input"]`),
    notTried: () => cy.get(`[data-cy="${FIELD_IDS.TRIED_PRIVATE_COVER}-not-tried"]`),
    notTriedInput: () => cy.get(`[data-cy="${FIELD_IDS.TRIED_PRIVATE_COVER}-not-tried-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.TRIED_PRIVATE_COVER}-error-message"]`),
  },
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default triedToObtainCoverPage;
