import partials from '../../../../../../partials/insurance';
import { saveAndBackButton, noRadioInput, yesRadioInput } from '../../../../../../pages/shared';
import { TASKS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  ALL_SECTIONS,
  EXPORTER_BUSINESS: { CREDIT_CONTROL },
} = INSURANCE_ROUTES;

const { STATUS: { IN_PROGRESS, COMPLETED } } = TASKS;

const task = partials.taskList.prepareApplication.tasks.business;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Credit control - Save and go back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});
      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();

      url = `${baseUrl}${ROOT}/${referenceNumber}${CREDIT_CONTROL}`;
      allSectionsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when submitting an empty form via `save and go back` button', () => {
    before(() => {
      cy.navigateToUrl(url);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(allSectionsUrl);
    });

    it(`should retain the status of task 'your business' as '${IN_PROGRESS}'`, () => {
      cy.navigateToUrl(allSectionsUrl);

      cy.checkTaskStatus(task, IN_PROGRESS);
    });
  });

  describe('when submitting the answer as `yes` via `save and go back` button', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(url);

      yesRadioInput().click();
      saveAndBackButton().click();

      cy.assertUrl(allSectionsUrl);
    });

    it(`should change the status of task 'your business' as '${COMPLETED}'`, () => {
      cy.navigateToUrl(allSectionsUrl);

      cy.checkTaskStatus(task, COMPLETED);
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      cy.assertYesRadioOptionIsChecked();
    });
  });

  describe('when submitting the answer as `no` via `save and go back` button', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(url);

      noRadioInput().click();
      saveAndBackButton().click();

      cy.assertUrl(allSectionsUrl);
    });

    it(`should change the status of task 'your business' as '${COMPLETED}'`, () => {
      cy.navigateToUrl(allSectionsUrl);

      cy.checkTaskStatus(task, COMPLETED);
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      cy.assertNoRadioOptionIsChecked();
    });
  });
});
