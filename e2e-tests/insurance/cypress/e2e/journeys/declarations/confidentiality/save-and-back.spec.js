import { singleInputField } from '../../../../../../pages/shared';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: { CONFIDENTIALITY },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIDENTIALITY;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Declarations - Confidentiality page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({});
      cy.completeAndSubmitCheckYourAnswers();

      // go to the page we want to test.
      cy.clickTaskDeclarationsAndSubmit();

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

    it('should retain the status of task `declarations and submit` as `not started yet`', () => {
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

    it('should retain the status of task `check your answers` as `completed`', () => {
      cy.checkTaskCheckAnswersStatusIsComplete();
    });

    it('should retain the status of task `declarations and submit` as `in progress`', () => {
      cy.checkTaskDeclarationsAndSubmitStatusIsInProgress();
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.clickTaskDeclarationsAndSubmit();

      cy.assertRadioOptionIsChecked(singleInputField(FIELD_ID).input());
    });
  });
});
