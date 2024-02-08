import partials from '../../../../../../partials';
import { field as fieldSelector } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_DETAILS;

const {
  BROKER_DETAILS: {
    NAME,
    EMAIL,
    FULL_ADDRESS,
  },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: {
    BROKER_ROOT,
    BROKER_DETAILS_ROOT,
  },
} = INSURANCE_ROUTES;

const { BROKER_DETAILS: FIELD_STRINGS } = FIELDS;

const baseUrl = Cypress.config('baseUrl');

context("Insurance - Policy - Broker details page - As an exporter, I want to provide UKEF with my broker's details, So that UKEF can communicate with the broker as needed whilst processing my application'", () => {
  let referenceNumber;
  let url;

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

      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`;

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
      currentHref: `${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`,
      backLink: `${ROOT}/${referenceNumber}${BROKER_ROOT}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders intro text', () => {
      cy.checkIntroText(CONTENT_STRINGS.INTRO);
    });

    it(`renders ${NAME} label and input`, () => {
      const fieldId = NAME;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELD_STRINGS[fieldId].LABEL);
      field.input().should('exist');
    });

    it(`renders ${EMAIL} label and input`, () => {
      const fieldId = EMAIL;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELD_STRINGS[fieldId].LABEL);
      field.input().should('exist');
    });

    it(`renders ${FULL_ADDRESS} label and textarea`, () => {
      const fieldId = FULL_ADDRESS;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELD_STRINGS[fieldId].LABEL);
      field.textarea().should('exist');
    });

    it('should display save and go back button', () => {
      cy.assertSaveAndBackButton();
    });
  });
});
