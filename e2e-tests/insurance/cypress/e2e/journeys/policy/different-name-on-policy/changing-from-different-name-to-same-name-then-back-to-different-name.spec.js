import { summaryList } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const {
  NAME_ON_POLICY: { NAME, SAME_NAME, OTHER_NAME },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(
  `Insurance - Policy - Different name on Policy page - Changing ${OTHER_NAME} to ${SAME_NAME} and then back to ${OTHER_NAME} should not populate fields on different name on policy page`,
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.completeAndSubmitPolicyForms({ formToStopAt: 'lossPayee' });

        url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

        cy.assertUrl(url);
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    describe(`when changing from ${OTHER_NAME} to ${SAME_NAME} and then back to ${OTHER_NAME}`, () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(NAME).changeLink().click();

        cy.completeAndSubmitNameOnPolicyForm({ sameName: true });

        summaryList.field(NAME).changeLink().click();

        cy.completeAndSubmitNameOnPolicyForm({ sameName: false });
      });

      it('should NOT have fields populated on different name on policy page', () => {
        cy.assertDifferentNameOnPolicyFieldValues({});
      });
    });
  },
);
