import { field } from '../shared';
import { FIELD_IDS } from '../../constants';

const {
  ELIGIBILITY: { CREDIT_PERIOD },
} = FIELD_IDS;

const tellUsAboutYourPolicyPage = {
  description: () => cy.get('[data-cy="description"]'),
  [CREDIT_PERIOD]: {
    ...field(CREDIT_PERIOD),
    hintLink: () => cy.get(`[data-cy="${CREDIT_PERIOD}-hint-link"]`),
  },
};

export default tellUsAboutYourPolicyPage;
