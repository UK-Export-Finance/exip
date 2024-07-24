import partials from '../../../../../../../partials';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const { taskList } = partials.insurancePartials;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: { CODE_OF_CONDUCT },
    CONFIRMATION_AND_ACKNOWLEDGEMENTS,
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

        cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

        // go to the page we want to test.
        taskList.submitApplication.tasks.declarationsAndSubmit.link().click();

        cy.completeAndSubmitDeclarationConfidentiality();
        cy.completeAndSubmitDeclarationAntiBribery();

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

    it(`should redirect to ${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`, () => {
      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`;

      cy.assertUrl(expectedUrl);
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.clickBackLink();

      cy.assertNoRadioOptionIsChecked();
    });
  },
);
