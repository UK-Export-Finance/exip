import { addMonths, format } from 'date-fns';
import insurance from '../../../../pages/insurance';
import partials from '../../../../partials';
import { PAGES, TASKS } from '../../../../content-strings';
import { APPLICATION, DATE_FORMAT, ROUTES } from '../../../../constants';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.ALL_SECTIONS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - All sections - new application', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`,
      backLink: ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE,
      assertSubmitButton: false,
      assertBackLink: false,
    });
  });

  describe('task list', () => {
    describe('`initial checks` group', () => {
      it('should render a group heading', () => {
        cy.navigateToUrl(url);

        const expected = `1. ${TASKS.LIST.INITIAL_CHECKS.HEADING}`;

        cy.checkText(taskList.initialChecks.groupHeading(), expected);
      });

      describe('tasks', () => {
        it('should render a `check eligibility` task with `completed` status, no link', () => {
          cy.navigateToUrl(url);

          const task = taskList.initialChecks.tasks.eligibility;

          const expectedText = TASKS.LIST.INITIAL_CHECKS.TASKS.ELIGIBILITY;

          cy.checkText(
            task.text(),
            expectedText,
          );

          cy.checkText(task.status(), TASKS.STATUS.COMPLETED);

          task.link().should('not.exist');
        });
      });
    });

    describe('`prepare application` group', () => {
      it('should render a group heading', () => {
        cy.navigateToUrl(url);

        const expected = `2. ${TASKS.LIST.PREPARE_APPLICATION.HEADING}`;

        cy.checkText(taskList.prepareApplication.groupHeading(), expected);
      });

      describe('tasks', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('should render a `type of policy` task with link and `not started` status', () => {
          const task = taskList.prepareApplication.tasks.policy;

          const expectedHref = `${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY.TYPE_OF_POLICY}`;
          const expectedText = TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY;

          cy.checkLink(
            task.link(),
            expectedHref,
            expectedText,
          );

          cy.checkText(task.status(), TASKS.STATUS.NOT_STARTED_YET);
        });

        it('should render a `your business` task with link and `not started` status', () => {
          const task = taskList.prepareApplication.tasks.business;

          const expectedHref = `${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER}`;
          const expectedText = TASKS.LIST.PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS;

          cy.checkLink(
            task.link(),
            expectedHref,
            expectedText,
          );

          cy.checkText(task.status(), TASKS.STATUS.NOT_STARTED_YET);
        });

        it('should render a `your buyer` task with link and `not started` status', () => {
          const task = taskList.prepareApplication.tasks.buyer;

          const expectedText = TASKS.LIST.PREPARE_APPLICATION.TASKS.BUYER;
          const expectedHref = `${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION}`;

          cy.checkLink(
            task.link(),
            expectedHref,
            expectedText,
          );

          cy.checkText(task.status(), TASKS.STATUS.NOT_STARTED_YET);
        });
      });
    });

    describe('`submit application` group', () => {
      it('should render a group heading', () => {
        cy.navigateToUrl(url);

        const expected = `3. ${TASKS.LIST.SUBMIT_APPLICATION.HEADING}`;
        cy.checkText(taskList.submitApplication.groupHeading(), expected);
      });

      describe('tasks', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('should render a `check answers` task with no link and `cannot start` status', () => {
          const task = taskList.submitApplication.tasks.checkAnswers;

          const expectedText = TASKS.LIST.SUBMIT_APPLICATION.TASKS.CHECK_ANSWERS;
          cy.checkText(task.text(), expectedText);

          task.link().should('not.exist');

          cy.checkText(task.status(), TASKS.STATUS.CANNOT_START);
        });

        it('should render a `declarations and submit` task with no link and `cannot start yet` status', () => {
          const task = taskList.submitApplication.tasks.declarationsAndSubmit;

          const expectedText = TASKS.LIST.SUBMIT_APPLICATION.TASKS.DECLARATIONS_AND_SUBMIT;
          cy.checkText(task.text(), expectedText);

          task.link().should('not.exist');

          cy.checkText(task.status(), TASKS.STATUS.CANNOT_START);
        });
      });
    });
  });

  describe('submission deadline', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render a heading', () => {
      insurance.allSectionsPage.submissionDeadlineHeading().should('exist');
      cy.checkText(insurance.allSectionsPage.submissionDeadlineHeading(), CONTENT_STRINGS.DEADLINE_TO_SUBMIT);
    });

    it('should render correct submission deadline', () => {
      insurance.allSectionsPage.submissionDeadline().should('exist');
      const timestamp = addMonths(new Date(), APPLICATION.SUBMISSION_DEADLINE_IN_MONTHS);

      const expected = format(new Date(timestamp), DATE_FORMAT.DEFAULT);
      cy.checkText(insurance.allSectionsPage.submissionDeadline(), expected);
    });
  });

  describe('reference number', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render a heading', () => {
      insurance.allSectionsPage.yourReferenceNumberHeading().should('exist');
      cy.checkText(insurance.allSectionsPage.yourReferenceNumberHeading(), CONTENT_STRINGS.REFERENCE_NUMBER);
    });

    it('should render correct reference number', () => {
      insurance.allSectionsPage.yourReferenceNumber().should('exist');

      const expectedReferenceNumber = String(referenceNumber);

      cy.checkText(insurance.allSectionsPage.yourReferenceNumber(), expectedReferenceNumber);
    });
  });
});
