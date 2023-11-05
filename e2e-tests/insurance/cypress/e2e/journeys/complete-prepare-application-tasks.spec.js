import partials from '../../../../partials';
import { TASKS } from '../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
} = INSURANCE_ROUTES;

const {
  STATUS: { COMPLETED, NOT_STARTED_YET },
} = TASKS;

const { taskList } = partials.insurancePartials;

const { prepareApplication, submitApplication } = taskList;

context('Insurance - Complete `prepare your application` tasks', () => {
  let referenceNumber;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      allSectionsUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.navigateToUrl(allSectionsUrl);

      cy.assertUrl(allSectionsUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(allSectionsUrl);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('`prepare application` tasks', () => {
    it(`renders a 'type of policy' task with a status of ${COMPLETED}`, () => {
      cy.checkText(prepareApplication.tasks.policy.status(), COMPLETED);
    });

    it(`renders a 'your business' task with a status of ${COMPLETED}`, () => {
      cy.checkText(prepareApplication.tasks.business.status(), COMPLETED);
    });

    it(`renders a 'your buyer' task with a status of ${COMPLETED}`, () => {
      cy.checkText(prepareApplication.tasks.buyer.status(), COMPLETED);
    });
  });

  describe('`submit application` tasks', () => {
    it(`renders a 'check your answers' task with a status of ${NOT_STARTED_YET}`, () => {
      cy.checkText(submitApplication.tasks.checkAnswers.status(), NOT_STARTED_YET);
    });

    it(`renders a 'declarations' task with a status of ${NOT_STARTED_YET}`, () => {
      cy.checkText(submitApplication.tasks.declarationsAndSubmit.status(), NOT_STARTED_YET);
    });
  });
});
