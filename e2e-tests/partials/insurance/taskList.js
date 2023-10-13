import { TASKS } from '../../content-strings';

const {
  INITIAL_CHECKS,
  PREPARE_APPLICATION,
  SUBMIT_APPLICATION,
} = TASKS.LIST;

const taskList = {
  initialChecks: {
    groupHeading: () => cy.get(`[data-cy="task-list-group-heading-${INITIAL_CHECKS.HEADING}"]`),
    tasks: {
      eligibility: {
        link: () => cy.get(`[data-cy="task-list-group-${INITIAL_CHECKS.HEADING}-task-${INITIAL_CHECKS.TASKS.ELIGIBILITY}-link"]`),
        text: () => cy.get(`[data-cy="task-list-group-${INITIAL_CHECKS.HEADING}-task-${INITIAL_CHECKS.TASKS.ELIGIBILITY}"]`),
        status: () => cy.get(`[data-cy="task-list-group-${INITIAL_CHECKS.HEADING}-task-${INITIAL_CHECKS.TASKS.ELIGIBILITY}-status"]`),
      },
    },
  },
  prepareApplication: {
    groupHeading: () => cy.get(`[data-cy="task-list-group-heading-${PREPARE_APPLICATION.HEADING}"]`),
    tasks: {
      business: {
        link: () => cy.get(`[data-cy="task-list-group-${PREPARE_APPLICATION.HEADING}-task-${PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS}-link"]`),
        status: () => cy.get(`[data-cy="task-list-group-${PREPARE_APPLICATION.HEADING}-task-${PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS}-status"]`),
      },
      buyer: {
        link: () => cy.get(`[data-cy="task-list-group-${PREPARE_APPLICATION.HEADING}-task-${PREPARE_APPLICATION.TASKS.BUYER}-link"]`),
        status: () => cy.get(`[data-cy="task-list-group-${PREPARE_APPLICATION.HEADING}-task-${PREPARE_APPLICATION.TASKS.BUYER}-status"]`),
      },
      policy: {
        link: () => cy.get(`[data-cy="task-list-group-${PREPARE_APPLICATION.HEADING}-task-${PREPARE_APPLICATION.TASKS.POLICY}-link"]`),
        status: () => cy.get(`[data-cy="task-list-group-${PREPARE_APPLICATION.HEADING}-task-${PREPARE_APPLICATION.TASKS.POLICY}-status"]`),
      },
      exportContract: {
        link: () => cy.get(`[data-cy="task-list-group-${PREPARE_APPLICATION.HEADING}-task-${PREPARE_APPLICATION.TASKS.EXPORT_CONTRACT}-link"]`),
        status: () => cy.get(`[data-cy="task-list-group-${PREPARE_APPLICATION.HEADING}-task-${PREPARE_APPLICATION.TASKS.EXPORT_CONTRACT}-status"]`),
      },
    },
  },
  submitApplication: {
    groupHeading: () => cy.get(`[data-cy="task-list-group-heading-${SUBMIT_APPLICATION.HEADING}"]`),
    tasks: {
      checkAnswers: {
        text: () => cy.get(`[data-cy="task-list-group-${SUBMIT_APPLICATION.HEADING}-task-${SUBMIT_APPLICATION.TASKS.CHECK_ANSWERS}"]`),
        link: () => cy.get(`[data-cy="task-list-group-${SUBMIT_APPLICATION.HEADING}-task-${SUBMIT_APPLICATION.TASKS.CHECK_ANSWERS}-link"]`),
        status: () => cy.get(`[data-cy="task-list-group-${SUBMIT_APPLICATION.HEADING}-task-${SUBMIT_APPLICATION.TASKS.CHECK_ANSWERS}-status"]`),
      },
      declarationsAndSubmit: {
        text: () => cy.get(`[data-cy="task-list-group-${SUBMIT_APPLICATION.HEADING}-task-${SUBMIT_APPLICATION.TASKS.DECLARATIONS_AND_SUBMIT}"]`),
        link: () => cy.get(`[data-cy="task-list-group-${SUBMIT_APPLICATION.HEADING}-task-${SUBMIT_APPLICATION.TASKS.DECLARATIONS_AND_SUBMIT}-link"]`),
        status: () => cy.get(`[data-cy="task-list-group-${SUBMIT_APPLICATION.HEADING}-task-${SUBMIT_APPLICATION.TASKS.DECLARATIONS_AND_SUBMIT}-status"]`),
      },
    },
  },
};

export default taskList;
