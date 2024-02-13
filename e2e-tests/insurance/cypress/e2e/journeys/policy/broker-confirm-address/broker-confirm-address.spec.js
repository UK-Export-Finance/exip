import partials from '../../../../../../partials';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
// import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
// import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_CONFIRM_ADDRESS;

// const {
  // BROKER_DETAILS: {
    // FULL_ADDRESS,
  // },
// } = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: {
    BROKER_CONFIRM_ADDRESS_ROOT,
    BROKER_DETAILS_ROOT,
    CHECK_YOUR_ANSWERS
  },
} = INSURANCE_ROUTES;

// const { BROKER_CONFIRM_ADDRESS: FIELD_STRINGS } = FIELDS;

const baseUrl = Cypress.config('baseUrl');

context("As an exporter, I want to be able to review the broker's contact details that I have provided, So that I can confirm my input or amend any errors if needed", () => {
  let referenceNumber;
  let url;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({ sameName: true });
      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});
      cy.completeAndSubmitBrokerForm({ usingBroker: true });
      cy.completeAndSubmitBrokerDetailsForm();

      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_CONFIRM_ADDRESS_ROOT}`;
      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${BROKER_CONFIRM_ADDRESS_ROOT}`,
      backLink: `${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`,
      submitButtonCopy: BUTTONS.USE_THIS_ADDRESS,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    // TODO: test address inset text.
    // TODO: 'use a different address' link.

    // it('renders intro text', () => {
    //   cy.checkIntroText(CONTENT_STRINGS.INTRO);
    // });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS} page`, () => {
      cy.clickSubmitButton();

      cy.assertUrl(checkYourAnswersUrl);
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(url);

        cy.assertBrokerDetailsFieldValues({});
      });
    });
  });
});
