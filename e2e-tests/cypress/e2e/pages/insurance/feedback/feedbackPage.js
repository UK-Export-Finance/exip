import { FIELD_IDS } from '../../../../../constants';

const {
  FEEDBACK: {
    SATISFACTION,
    VERY_SATISFIED,
    SATISFIED,
    NEITHER,
    DISSATISFIED,
    VERY_DISSATISIFED,
    IMPROVEMENT,
    OTHER_COMMENTS,
  },
} = FIELD_IDS;

const feedbackPage = {
  [SATISFACTION]: {
    heading: () => cy.get(`[data-cy="${SATISFACTION}-heading"]`),
    label: () => cy.get(`[data-cy="${SATISFACTION}-label"]`),
    [VERY_SATISFIED]: {
      label: () => cy.get(`[data-cy="${VERY_SATISFIED}-label"]`),
      input: () => cy.get(`[data-cy="${VERY_SATISFIED}-input"]`),
    },
    [SATISFIED]: {
      label: () => cy.get(`[data-cy="${SATISFIED}-label"]`),
      input: () => cy.get(`[data-cy="${SATISFIED}-input"]`),
    },
    [NEITHER]: {
      label: () => cy.get(`[data-cy="${NEITHER}-label"]`),
      input: () => cy.get(`[data-cy="${NEITHER}-input"]`),
    },
    [DISSATISFIED]: {
      label: () => cy.get(`[data-cy="${DISSATISFIED}-label"]`),
      input: () => cy.get(`[data-cy="${DISSATISFIED}-input"]`),
    },
    [VERY_DISSATISIFED]: {
      label: () => cy.get(`[data-cy="${VERY_DISSATISIFED}-label"]`),
      input: () => cy.get(`[data-cy="${VERY_DISSATISIFED}-input"]`),
    },
  },
  [IMPROVEMENT]: {
    label: () => cy.get(`[data-cy="${IMPROVEMENT}-label"]`),
    hint: () => cy.get(`[data-cy="${IMPROVEMENT}-hint"]`),
    input: () => cy.get(`[data-cy="${IMPROVEMENT}"]`),
    errorMessage: () => cy.get(`[data-cy="${IMPROVEMENT}-error"]`),
  },
  [OTHER_COMMENTS]: {
    label: () => cy.get(`[data-cy="${OTHER_COMMENTS}-label"]`),
    hint: () => cy.get(`[data-cy="${OTHER_COMMENTS}-hint"]`),
    input: () => cy.get(`[data-cy="${OTHER_COMMENTS}"]`),
    errorMessage: () => cy.get(`[data-cy="${OTHER_COMMENTS}-error"]`),
  },
};

export default feedbackPage;
