import { field as fieldSelector } from '../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { SINGLE_CONTRACT_POLICY },
} = INSURANCE_ROUTES;

const {
  CONTRACT_POLICY: { REQUESTED_START_DATE },
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Single contract policy page - Save and go back', () => {
  let referenceNumber;
  let url;

  const date = new Date();
  const year = date.getFullYear();
  const futureDate = new Date(date.setFullYear(year + 1));

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'policyType' });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`;

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

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });
  });

  describe('when entering an invalid requested cover start date and submitting the form via `save and go back` button', () => {
    const field = fieldSelector(REQUESTED_START_DATE);

    beforeEach(() => {
      cy.navigateToUrl(url);

      // enter an invalid date
      const now = new Date();
      const day = now.getDate();

      const yesterday = new Date(now.setDate(day - 1));
      const yesterdayMonth = yesterday.getMonth() + 1;

      cy.keyboardInput(field.dayInput(), yesterday.getDate());
      cy.keyboardInput(field.monthInput(), yesterdayMonth);
      cy.keyboardInput(field.yearInput(), yesterday.getFullYear());

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should NOT have saved the submitted values when going back to the page', () => {
      cy.startInsurancePolicySection({});
      cy.clickSubmitButton();

      cy.assertEmptyRequestedStartDateFieldValues({});
    });
  });

  describe('when entering a valid requested cover start date and submitting the form via `save and go back` button', () => {
    const field = fieldSelector(REQUESTED_START_DATE);
    const month = new Date(futureDate).getMonth() + 1;

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.dayInput(), '1');
      cy.keyboardInput(field.monthInput(), month);
      cy.keyboardInput(field.yearInput(), new Date(futureDate).getFullYear());

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should have the submitted values when going back to the page', () => {
      cy.startInsurancePolicySection({});
      cy.clickSubmitButton();

      cy.checkDateFieldValues({
        selector: field,
        day: '1',
        month,
        year: new Date(futureDate).getFullYear(),
      });
    });
  });
});
