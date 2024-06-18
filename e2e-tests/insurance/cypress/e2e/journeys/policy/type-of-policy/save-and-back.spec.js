import { insurance } from '../../../../../../pages';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';

const FIELD_ID = FIELD_IDS.INSURANCE.POLICY.POLICY_TYPE;
const multiplePolicyField = insurance.policy.typeOfPolicyPage[FIELD_ID].multiple;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Type of policy page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});

      url = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY.TYPE_OF_POLICY}`;
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

    it(`should redirect to ${ROUTES.INSURANCE.ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `not started yet`', () => {
      cy.checkTaskPolicyStatusIsNotStartedYet();
    });
  });

  describe('when selecting an answer and submitting the form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();

      cy.startInsurancePolicySection({});

      multiplePolicyField.label().click();
      cy.clickSaveAndBackButton();
    });

    it(`should redirect to ${ROUTES.INSURANCE.ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should update the status of task `type of policy` to `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the originally submitted answer selected', () => {
        cy.startInsurancePolicySection({});

        cy.assertRadioOptionIsChecked(multiplePolicyField.input());
      });
    });
  });
});
