import partials from '../../../../../../partials';
import { insetText } from '../../../../../../pages/shared';
import { brokerConfirmAddressPage } from '../../../../../../pages/insurance/policy';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import mockApplication from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_CONFIRM_ADDRESS;

const {
  BROKER_DETAILS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  ALL_SECTIONS,
  POLICY: {
    BROKER_CONFIRM_ADDRESS_ROOT,
    BROKER_DETAILS_ROOT,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context("Insurance - Policy - Broker confirm address - As an exporter, I want to be able to review the broker's contact details that I have provided, So that I can confirm my input or amend any errors if needed", () => {
  let referenceNumber;
  let url;
  let checkYourAnswersUrl;
  let brokerDetailsUrl;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm({});
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({ sameName: true });
      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});
      cy.completeAndSubmitBrokerForm({ usingBroker: true });
      cy.completeAndSubmitBrokerDetailsForm();

      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_CONFIRM_ADDRESS_ROOT}`;
      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      brokerDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`;
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

    it(`renders ${FULL_ADDRESS} inset text`, () => {
      const expected = mockApplication.BROKER[FULL_ADDRESS];

      cy.checkText(insetText(), expected);
    });

    describe('`use a different address` link', () => {
      it('renders', () => {
        cy.checkLink(
          brokerConfirmAddressPage.useDifferentAddressLink(),
          `${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`,
          CONTENT_STRINGS.USE_DIFFERENT_ADDRESS,
        );
      });

      it(`should redirect to ${ALL_SECTIONS} page`, () => {
        brokerConfirmAddressPage.useDifferentAddressLink().click();

        cy.assertUrl(brokerDetailsUrl);
      });
    });

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
  });

  describe('when clicking the `save and back` button', () => {
    it(`should redirect to ${ALL_SECTIONS} page`, () => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();

      cy.assertUrl(allSectionsUrl);
    });
  });
});
