import { field as fieldSelector, headingCaption } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_DETAILS;

const {
  BROKER_DETAILS: { NAME, EMAIL, FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { BROKER_ROOT, BROKER_DETAILS_ROOT, BROKER_CONFIRM_ADDRESS_ROOT },
} = INSURANCE_ROUTES;

const { BROKER_DETAILS: FIELD_STRINGS } = FIELDS;

const baseUrl = Cypress.config('baseUrl');

context(
  "Insurance - Policy - Broker details page - As an exporter, I want to provide UKEF with my broker's details, So that UKEF can communicate with the broker as needed whilst processing my application'",
  () => {
    let referenceNumber;
    let url;
    let brokerConfirmAddressUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'broker', usingBroker: true });

        url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`;
        brokerConfirmAddressUrl = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_CONFIRM_ADDRESS_ROOT}`;

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
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
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

        cy.checkEmailFieldRendering({
          fieldId,
          contentStrings: FIELD_STRINGS[fieldId],
        });
      });

      it(`renders ${FULL_ADDRESS} textarea`, () => {
        const fieldId = FULL_ADDRESS;
        const fieldStrings = FIELD_STRINGS[fieldId];

        cy.assertTextareaRendering({
          fieldId,
          expectedLabel: fieldStrings.LABEL,
          maximumCharacters: fieldStrings.MAXIMUM,
        });
      });
    });

    describe('form submission', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${BROKER_CONFIRM_ADDRESS_ROOT} page`, () => {
        cy.completeAndSubmitBrokerDetailsForm({});

        cy.assertUrl(brokerConfirmAddressUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted values', () => {
          cy.navigateToUrl(url);

          cy.assertBrokerDetailsFieldValues({});
        });
      });
    });
  },
);
