import { headingCaption } from '../../../../../../partials';
import { field as fieldSelector, noRadio, yesRadio } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_DETAILS;

const {
  BROKER_DETAILS: { NAME, EMAIL, IS_BASED_IN_UK, POSTCODE, BUILDING_NUMBER_OR_NAME },
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

      describe(`renders ${IS_BASED_IN_UK} label and inputs`, () => {
        const fieldId = IS_BASED_IN_UK;

        it('renders `yes` and `no` radio buttons in the correct order', () => {
          cy.assertYesNoRadiosOrder({ noRadioFirst: true });
        });

        it('renders `no` radio button', () => {
          cy.checkText(noRadio().label(), FIELD_VALUES.NO);

          cy.checkRadioInputNoAriaLabel(FIELD_STRINGS[fieldId].LABEL);
        });

        it('renders `yes` radio button', () => {
          cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

          cy.checkRadioInputYesAriaLabel(FIELD_STRINGS[fieldId].LABEL);
        });
      });

      describe(POSTCODE, () => {
        const fieldId = POSTCODE;
        const field = fieldSelector(fieldId);

        it('should NOT by visible by default', () => {
          field.input().should('not.be.visible');
        });

        describe(`when clicking ${IS_BASED_IN_UK} 'yes' radio`, () => {
          it(`should render ${fieldId} input`, () => {
            cy.clickYesRadioInput();

            const fieldStrings = FIELD_STRINGS[fieldId];

            field.input().should('be.visible');

            cy.checkText(field.label(), fieldStrings.LABEL);
          });
        });
      });

      describe(BUILDING_NUMBER_OR_NAME, () => {
        const fieldId = BUILDING_NUMBER_OR_NAME;
        const field = fieldSelector(fieldId);

        it('should NOT by visible by default', () => {
          field.input().should('not.be.visible');
        });

        describe(`when clicking ${IS_BASED_IN_UK} 'yes' radio`, () => {
          it(`should render ${fieldId} input`, () => {
            cy.clickYesRadioInput();

            const fieldStrings = FIELD_STRINGS[fieldId];

            field.input().should('be.visible');

            cy.checkText(field.label(), fieldStrings.LABEL);
          });
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

      describe(`when submitting ${IS_BASED_IN_UK} as "no" and going back to the page`, () => {
        it('should have the submitted values', () => {
          cy.completeAndSubmitBrokerDetailsForm({ isBasedInUk: false });

          cy.navigateToUrl(url);

          cy.assertBrokerDetailsFieldValues({ isBasedInUk: false });
        });
      });

      describe(`when submitting ${IS_BASED_IN_UK} as "yes" and going back to the page`, () => {
        it('should have the submitted values', () => {
          cy.completeAndSubmitBrokerDetailsForm({ isBasedInUk: true });

          cy.navigateToUrl(url);

          cy.assertBrokerDetailsFieldValues({ isBasedInUk: true });
        });
      });
    });
  },
);
