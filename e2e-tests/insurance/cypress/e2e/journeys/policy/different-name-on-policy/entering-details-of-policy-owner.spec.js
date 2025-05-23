import { summaryList, field as fieldSelector } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import mockApplication from '../../../../../../fixtures/application';
import account from '../../../../../../fixtures/account';

const { POLICY_CONTACT } = mockApplication;

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { DIFFERENT_NAME_ON_POLICY, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    NAME_ON_POLICY: { NAME, SAME_NAME },
    DIFFERENT_NAME_ON_POLICY: { POSITION },
  },
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Policy - Different name on Policy page - Entering name of policy owner should change ${NAME} to ${SAME_NAME}`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'nameOnPolicy', sameName: false });
      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`when entering contact details of application owner on "different name on policy" page and proceeding to ${CHECK_YOUR_ANSWERS}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitDifferentNameOnPolicyForm({ firstName: account[FIRST_NAME], lastName: account[LAST_NAME], email: account[EMAIL] });

      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});
      cy.completeAndSubmitBrokerForm({});
      cy.completeAndSubmitLossPayeeForm({});

      summaryList.field(NAME).changeLink().click();
    });

    it(`should have ${SAME_NAME} radio selected and ${POSITION} populated when going back to the page`, () => {
      cy.assertRadioOptionIsChecked(fieldSelector(SAME_NAME).input());

      cy.checkValue(fieldSelector(POSITION), POLICY_CONTACT[POSITION]);
    });
  });
});
