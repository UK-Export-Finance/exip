import { heading } from '../../pages/shared';
import partials from '../../partials';
import {
  ORGANISATION,
  LINKS,
  PAGES,
  TASKS,
} from '../../../../content-strings';
import { ROUTES } from '../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../support/forms';
import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
  completeOtherPartiesForm,
  completeLetterOfCreditForm,
  completePreCreditPeriodForm,
  completeCompaniesHouseNumberForm,
  completeEligibleToApplyOnlineForm,
} from '../../../support/insurance/eligibility/forms';
import getApplicationId from '../../helpers/get-application-id';

const CONTENT_STRINGS = PAGES.INSURANCE.ALL_SECTIONS;

context('Insurance - All sections - new application', () => {
  let applicationId;

  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();
    completeExporterLocationForm();
    completeUkGoodsAndServicesForm();
    completeInsuredAmountForm();
    completeInsuredPeriodForm();
    completeOtherPartiesForm();
    completeLetterOfCreditForm();
    completePreCreditPeriodForm();
    completeCompaniesHouseNumberForm();
    completeEligibleToApplyOnlineForm();

    getApplicationId().then((id) => {
      applicationId = id;

      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${applicationId}${ROUTES.INSURANCE.ALL_SECTIONS}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 70,
    });
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    const expectedUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE}`;

    cy.url().should('include', expectedUrl);

    // go back to page
    cy.visit(`${ROUTES.INSURANCE.ROOT}/${applicationId}${ROUTES.INSURANCE.ALL_SECTIONS}`, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.PAGE_TITLE);
    });
  });

  describe('task list', () => {
    describe('`initial checks` group', () => {
      it('should render a group heading', () => {
        partials.insurancePartials.taskList.initialChecks.groupHeading().invoke('text').then((text) => {
          const expected = `1. ${TASKS.LIST.INITIAL_CHECKS.HEADING}`;

          expect(text.trim()).equal(expected);
        });
      });

      describe('tasks', () => {
        it('should render a `check eligibility` task with link and `completed` status', () => {
          const task = partials.insurancePartials.taskList.initialChecks.tasks.eligibility;

          task.link().invoke('text').then((text) => {
            const expected = TASKS.LIST.INITIAL_CHECKS.TASKS.ELIGIBILITY;

            expect(text.trim()).equal(expected);
          });

          task.link().should('have.attr', 'href', '#');

          task.status().invoke('text').then((text) => {
            const expected = TASKS.STATUS.COMPLETED;

            expect(text.trim()).equal(expected);
          });
        });
      });
    });

    describe('`prepare application` group', () => {
      it('should render a group heading', () => {
        partials.insurancePartials.taskList.prepareApplication.groupHeading().invoke('text').then((text) => {
          const expected = `2. ${TASKS.LIST.PREPARE_APPLICATION.HEADING}`;

          expect(text.trim()).equal(expected);
        });
      });

      describe('tasks', () => {
        it('should render a `type of policy and exports` task with link and `not started` status', () => {
          const task = partials.insurancePartials.taskList.prepareApplication.tasks.policyTypeAndExports;

          task.link().invoke('text').then((text) => {
            const expected = TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY_TYPE_AND_EXPORTS;

            expect(text.trim()).equal(expected);
          });

          task.link().should('have.attr', 'href', '#');

          task.status().invoke('text').then((text) => {
            const expected = TASKS.STATUS.NOT_STARTED_YET;

            expect(text.trim()).equal(expected);
          });
        });

        it('should render a `your business` task with link and `not started` status', () => {
          const task = partials.insurancePartials.taskList.prepareApplication.tasks.exporterBusiness;

          task.link().invoke('text').then((text) => {
            const expected = TASKS.LIST.PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS;

            expect(text.trim()).equal(expected);
          });

          task.link().should('have.attr', 'href', '#');

          task.status().invoke('text').then((text) => {
            const expected = TASKS.STATUS.NOT_STARTED_YET;

            expect(text.trim()).equal(expected);
          });
        });

        it('should render a `your buyer` task with link and `not started` status', () => {
          const task = partials.insurancePartials.taskList.prepareApplication.tasks.buyer;

          task.link().invoke('text').then((text) => {
            const expected = TASKS.LIST.PREPARE_APPLICATION.TASKS.BUYER;

            expect(text.trim()).equal(expected);
          });

          task.link().should('have.attr', 'href', '#');

          task.status().invoke('text').then((text) => {
            const expected = TASKS.STATUS.NOT_STARTED_YET;

            expect(text.trim()).equal(expected);
          });
        });
      });
    });

    describe('`submit application` group', () => {
      it('should render a group heading', () => {
        partials.insurancePartials.taskList.submitApplication.groupHeading().invoke('text').then((text) => {
          const expected = `3. ${TASKS.LIST.SUBMIT_APPLICATION.HEADING}`;

          expect(text.trim()).equal(expected);
        });
      });

      describe('tasks', () => {
        it('should render a `declarations` task with no link and `cannot start yet` status', () => {
          const task = partials.insurancePartials.taskList.submitApplication.tasks.declarations;

          task.text().invoke('text').then((text) => {
            const expected = TASKS.LIST.SUBMIT_APPLICATION.TASKS.DECLARATIONS;

            expect(text.trim()).equal(expected);
          });

          task.link().should('not.exist');

          task.status().invoke('text').then((text) => {
            const expected = TASKS.STATUS.CANNOT_START;

            expect(text.trim()).equal(expected);
          });
        });

        it('should render a `check answers and submit` task with no link and `cannot start` status', () => {
          const task = partials.insurancePartials.taskList.submitApplication.tasks.checkAnswersAndSubmit;

          task.text().invoke('text').then((text) => {
            const expected = TASKS.LIST.SUBMIT_APPLICATION.TASKS.CHECK_ANSWERS_AND_SUBMIT;

            expect(text.trim()).equal(expected);
          });

          task.link().should('not.exist');

          task.status().invoke('text').then((text) => {
            const expected = TASKS.STATUS.CANNOT_START;

            expect(text.trim()).equal(expected);
          });
        });
      });
    });
  });
});
