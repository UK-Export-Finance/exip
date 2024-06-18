import { singleInputField } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { taskList } = partials.insurancePartials;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: { CONFIDENTIALITY },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIDENTIALITY;

const task = taskList.submitApplication.tasks.declarationsAndSubmit;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Declarations - Confidentiality page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      // go to the page we want to test.
      task.link().click();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`;

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
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the status of task `declarations` as `not started yet`', () => {
      cy.checkTaskDeclarationsAndSubmitStatusIsNotStartedYet();
    });
  });

  describe('when submitting an answer via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      singleInputField(FIELD_ID).label().click();

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should update the status of task `declarations` to `in progress`', () => {
      cy.checkTaskDeclarationsAndSubmitStatusIsInProgress();
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      task.link().click();

      cy.assertRadioOptionIsChecked(singleInputField(FIELD_ID).input());
    });
  });
});
