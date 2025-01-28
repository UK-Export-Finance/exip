import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: { CODE_OF_CONDUCT },
    MODERN_SLAVERY,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Declarations - Anti-bribery - Code of conduct page - As an Exporter, I want to confirm my company do not have code of conduct procedure, So that UKEF can have clarity about how my company operates processing my credit insurance application',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({});

        cy.completeAndSubmitDeclarationsForms({ stopSubmittingAfter: 'antiBribery', referenceNumber });

        url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CODE_OF_CONDUCT}`;

        cy.assertUrl(url);
      });
    });

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);

      cy.clickNoRadioInput();
      cy.clickSubmitButton();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    it(`should redirect to ${MODERN_SLAVERY}`, () => {
      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY}`;

      cy.assertUrl(expectedUrl);
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.clickBackLink();

      cy.assertNoRadioOptionIsChecked();
    });

    describe('when going back to the all sections page', () => {
      beforeEach(() => {
        cy.navigateToAllSectionsUrl(referenceNumber);
      });

      it('should retain the status of task `check your answers` as `completed`', () => {
        cy.checkTaskCheckAnswersStatusIsComplete();
      });

      it('should retain the status of task `declarations and submit` as `in progress`', () => {
        cy.checkTaskDeclarationsAndSubmitStatusIsInProgress();
      });
    });
  },
);
