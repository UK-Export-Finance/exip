import { brokerPage } from '../../../../../../pages/insurance/policy';
import partials from '../../../../../../partials';
import {
  field as fieldSelector,
  yesRadio,
  noRadio,
  noRadioInput,
} from '../../../../../../pages/shared';
import { PAGES, ERROR_MESSAGES, LINKS } from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER;

const {
  USING_BROKER: FIELD_ID,
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: {
    BROKER_ROOT,
    BROKER_DETAILS_ROOT,
    LOSS_PAYEE_ROOT,
    ANOTHER_COMPANY,
  },
} = INSURANCE_ROUTES;

const ERROR_MESSAGE = ERROR_MESSAGES.INSURANCE.POLICY[FIELD_ID].IS_EMPTY;

const { APPROVED_BROKER_LIST } = LINKS.EXTERNAL;

const ERROR_ASSERTIONS = {
  numberOfExpectedErrors: 1,
  errorIndex: 0,
};

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Broker page - As an Exporter I want to confirm if I am using a broker for my export Insurance so that UKEF and I can easily collaborate and manage correspondence regarding my credit insurance', () => {
  let referenceNumber;
  let url;
  let lossPayeeUrl;
  let brokerDetailsUrl;

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

      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_ROOT}`;
      lossPayeeUrl = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_ROOT}`;
      brokerDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`;

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
      currentHref: `${ROOT}/${referenceNumber}${BROKER_ROOT}`,
      backLink: `${ROOT}/${referenceNumber}${ANOTHER_COMPANY}`,
      lightHouseThresholds: {
        // accessibility threshold is reduced here because
        // the radio component from design system has an invalid aria attribute.
        // this is out of our control
        accessibility: 90,
      },
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    describe(`${FIELD_ID} label and input`, () => {
      it('renders `yes` and `no` radio buttons in the correct order', () => {
        cy.assertYesNoRadiosOrder({ noRadioFirst: true });
      });

      it('renders `no` radio button', () => {
        cy.checkText(noRadio().label(), FIELD_VALUES.NO);

        cy.checkRadioInputNoAriaLabel(FIELDS.BROKER[FIELD_ID].LABEL);
      });

      it('renders `yes` radio button', () => {
        yesRadio().input().should('exist');

        cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

        cy.checkRadioInputYesAriaLabel(FIELDS.BROKER[FIELD_ID].LABEL);
      });
    });

    describe('when clicking the summary text', () => {
      it('should expand the collapsed `details` content', () => {
        brokerPage.summary().click();

        brokerPage.details().should('have.attr', 'open');

        cy.checkText(brokerPage.line1(), CONTENT_STRINGS.LINE_1);
        cy.checkText(brokerPage.line2(), `${CONTENT_STRINGS.LINE_2} ${CONTENT_STRINGS.LINK_TEXT}`);
        cy.checkText(brokerPage.line3(), CONTENT_STRINGS.LINE_3);
        cy.checkText(brokerPage.line4(), CONTENT_STRINGS.LINE_4);

        cy.checkLink(brokerPage.link(), APPROVED_BROKER_LIST, CONTENT_STRINGS.LINK_TEXT);
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

    describe('when submitting an empty form', () => {
      it(`should display validation errors if ${FIELD_ID} radio is not selected`, () => {
        cy.navigateToUrl(url);

        const { numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

        const radioField = {
          ...fieldSelector(FIELD_ID),
          input: noRadioInput,
        };

        cy.submitAndAssertRadioErrors(radioField, errorIndex, numberOfExpectedErrors, ERROR_MESSAGE);
      });
    });

    describe(`when selecting no for ${FIELD_ID}`, () => {
      it(`should redirect to ${LOSS_PAYEE_ROOT} page`, () => {
        cy.completeAndSubmitBrokerForm({ usingBroker: false });

        cy.assertUrl(lossPayeeUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted value', () => {
          cy.navigateToUrl(url);

          cy.assertNoRadioOptionIsChecked();
        });
      });
    });

    describe(`when selecting yes for ${FIELD_ID}`, () => {
      it(`should redirect to ${BROKER_DETAILS_ROOT} page`, () => {
        cy.completeAndSubmitBrokerForm({ usingBroker: true });

        cy.assertUrl(brokerDetailsUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted value', () => {
          cy.navigateToUrl(url);

          cy.assertYesRadioOptionIsChecked();
        });
      });
    });
  });
});
