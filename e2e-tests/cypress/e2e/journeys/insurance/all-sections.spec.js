import { addMonths, format } from 'date-fns';
import insurance from '../../pages/insurance';
import partials from '../../partials';
import { PAGES, TASKS } from '../../../../content-strings';
import { APPLICATION, ROUTES } from '../../../../constants';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.ALL_SECTIONS;

context('Insurance - All sections - new application', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('renders core page elements', () => {
    cy.assertCorePageElements({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`,
      expectedBackLink: ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE,
    });
  });

  describe('task list', () => {
    describe('`initial checks` group', () => {
      it('should render a group heading', () => {
        const expected = `1. ${TASKS.LIST.INITIAL_CHECKS.HEADING}`;

        cy.checkText(taskList.initialChecks.groupHeading(), expected);
      });

      describe('tasks', () => {
        it('should render a `check eligibility` task with link and `completed` status', () => {
          const task = taskList.initialChecks.tasks.eligibility;
          const expectedLink = TASKS.LIST.INITIAL_CHECKS.TASKS.ELIGIBILITY;

          cy.checkText(task.link(), expectedLink);

          task.link().should('have.attr', 'href', '#');

          const expectedStatus = TASKS.STATUS.COMPLETED;

          cy.checkText(task.status(), expectedStatus);
        });
      });
    });

    describe('`prepare application` group', () => {
      it('should render a group heading', () => {
        const expected = `2. ${TASKS.LIST.PREPARE_APPLICATION.HEADING}`;

        cy.checkText(taskList.prepareApplication.groupHeading(), expected);
      });

      describe('tasks', () => {
        it('should render a `type of policy and exports` task with link and `not started` status', () => {
          const task = taskList.prepareApplication.tasks.policyTypeAndExports;

          const expectedLink = TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY_TYPE_AND_EXPORTS;
          cy.checkText(task.link(), expectedLink);

          const expectedUrl = `${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`;
          task.link().should('have.attr', 'href', expectedUrl);

          const expectedStatus = TASKS.STATUS.NOT_STARTED_YET;

          cy.checkText(task.status(), expectedStatus);
        });

        it('should render a `your business` task with link and `not started` status', () => {
          const task = taskList.prepareApplication.tasks.exporterBusiness;

          const expectedLink = TASKS.LIST.PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS;

          cy.checkText(task.link(), expectedLink);

          const expectedUrl = `${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;
          task.link().should('have.attr', 'href', expectedUrl);

          const expectedStatus = TASKS.STATUS.NOT_STARTED_YET;
          cy.checkText(task.status(), expectedStatus);
        });

        it('should render a `your buyer` task with link and `not started` status', () => {
          const task = taskList.prepareApplication.tasks.buyer;

          const expectedLink = TASKS.LIST.PREPARE_APPLICATION.TASKS.BUYER;
          cy.checkText(task.link(), expectedLink);

          const expectedUrl = `${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION}`;
          task.link().should('have.attr', 'href', expectedUrl);

          const expectedStatus = TASKS.STATUS.NOT_STARTED_YET;
          cy.checkText(task.status(), expectedStatus);
        });
      });
    });

    describe('`submit application` group', () => {
      it('should render a group heading', () => {
        const expected = `3. ${TASKS.LIST.SUBMIT_APPLICATION.HEADING}`;
        cy.checkText(taskList.submitApplication.groupHeading(), expected);
      });

      describe('tasks', () => {
        it('should render a `declarations` task with no link and `cannot start yet` status', () => {
          const task = taskList.submitApplication.tasks.declarations;

          const expectedText = TASKS.LIST.SUBMIT_APPLICATION.TASKS.DECLARATIONS;
          cy.checkText(task.text(), expectedText);

          task.link().should('not.exist');

          const expectedStatus = TASKS.STATUS.CANNOT_START;
          cy.checkText(task.status(), expectedStatus);
        });

        it('should render a `check answers and submit` task with no link and `cannot start` status', () => {
          const task = taskList.submitApplication.tasks.checkAnswersAndSubmit;

          const expectedText = TASKS.LIST.SUBMIT_APPLICATION.TASKS.CHECK_ANSWERS_AND_SUBMIT;
          cy.checkText(task.text(), expectedText);

          task.link().should('not.exist');

          const expectedStatus = TASKS.STATUS.CANNOT_START;
          cy.checkText(task.status(), expectedStatus);
        });
      });
    });
  });

  describe('submission deadline', () => {
    it('should render a heading', () => {
      insurance.allSectionsPage.submissionDeadlineHeading().should('exist');
      cy.checkText(insurance.allSectionsPage.submissionDeadlineHeading(), CONTENT_STRINGS.DEADLINE_TO_SUBMIT);
    });

    it('should render correct submission deadline', () => {
      insurance.allSectionsPage.submissionDeadline().should('exist');
      const timestamp = addMonths(new Date(), APPLICATION.SUBMISSION_DEADLINE_IN_MONTHS);

      const expected = format(new Date(timestamp), 'd MMMM yyyy');
      cy.checkText(insurance.allSectionsPage.submissionDeadline(), expected);
    });
  });

  describe('reference number', () => {
    it('should render a heading', () => {
      insurance.allSectionsPage.yourReferenceNumberHeading().should('exist');
      cy.checkText(insurance.allSectionsPage.yourReferenceNumberHeading(), CONTENT_STRINGS.REFERENCE_NUMBER);
    });

    it('should render correct reference number', () => {
      insurance.allSectionsPage.yourReferenceNumber().should('exist');
      cy.checkText(insurance.allSectionsPage.yourReferenceNumber(), referenceNumber);
    });
  });
});
