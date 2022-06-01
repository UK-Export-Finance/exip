import { FIELDS } from '../../../constants';

const {
  VALID_COMPANY_BASE,
  VALID_BUYER_BASE,
  TRIED_PRIVATE_COVER,
  FINAL_DESTINATION,
  UK_CONTENT_PERCENTAGE,
  CREDIT_LIMIT,
  PRE_CREDIT_PERIOD,
  CREDIT_PERIOD,
  POLICY_LENGTH,
  POLICY_TYPE,
} = FIELDS;

const checkYourAnswersPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  submitButton: () => cy.get('[data-cy="submit-button"]'),

  summaryLists: {
    company: {
      heading: () => cy.get('[data-cy="summaryList-heading-company"]'),
      [VALID_COMPANY_BASE]: {
        key: () => cy.get(`.${VALID_COMPANY_BASE}-key`),
        value: () => cy.get(`.${VALID_COMPANY_BASE}-value`),
      },
    },
    export: {
      heading: () => cy.get('[data-cy="summaryList-heading-export"]'),
      [VALID_BUYER_BASE]: {
        key: () => cy.get(`.${VALID_BUYER_BASE}-key`),
        value: () => cy.get(`.${VALID_BUYER_BASE}-value`),
      },
      [TRIED_PRIVATE_COVER]: {
        key: () => cy.get(`.${TRIED_PRIVATE_COVER}-key`),
        value: () => cy.get(`.${TRIED_PRIVATE_COVER}-value`),
      },
      [FINAL_DESTINATION]: {
        key: () => cy.get(`.${FINAL_DESTINATION}-key`),
        value: () => cy.get(`.${FINAL_DESTINATION}-value`),
      },
      [UK_CONTENT_PERCENTAGE]: {
        key: () => cy.get(`.${UK_CONTENT_PERCENTAGE}-key`),
        value: () => cy.get(`.${UK_CONTENT_PERCENTAGE}-value`),
      },
    },
    deal: {
      heading: () => cy.get('[data-cy="summaryList-heading-deal"]'),
      [CREDIT_LIMIT]: {
        key: () => cy.get(`.${CREDIT_LIMIT}-key`),
        value: () => cy.get(`.${CREDIT_LIMIT}-value`),
      },
      [PRE_CREDIT_PERIOD]: {
        key: () => cy.get(`.${PRE_CREDIT_PERIOD}-key`),
        value: () => cy.get(`.${PRE_CREDIT_PERIOD}-value`),
      },
      [CREDIT_PERIOD]: {
        key: () => cy.get(`.${CREDIT_PERIOD}-key`),
        value: () => cy.get(`.${CREDIT_PERIOD}-value`),
      },
      [POLICY_LENGTH]: {
        key: () => cy.get(`.${POLICY_LENGTH}-key`),
        value: () => cy.get(`.${POLICY_LENGTH}-value`),
      },
      [POLICY_TYPE]: {
        key: () => cy.get(`.${POLICY_TYPE}-key`),
        value: () => cy.get(`.${POLICY_TYPE}-value`),
      },
    },
  },
};

export default checkYourAnswersPage;
