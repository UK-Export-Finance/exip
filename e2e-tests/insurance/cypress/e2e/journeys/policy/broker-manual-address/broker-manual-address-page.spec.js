import { headingCaption } from '../../../../../../partials';
import { brokerManualAddressPage } from '../../../../../../pages/insurance/policy';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import application from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_MANUAL_ADDRESS;

const {
  BROKER_DETAILS: { NAME },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { BROKER_DETAILS_ROOT, BROKER_MANUAL_ADDRESS_ROOT, LOSS_PAYEE_ROOT },
} = INSURANCE_ROUTES;

const { BROKER_MANUAL_ADDRESS: FIELD_STRINGS } = FIELDS;

const baseUrl = Cypress.config('baseUrl');

context(
  "Insurance - Policy - Broker manual address page - As an exporter, I want to provide UKEF with my broker's details So that UKEF can communicate with the broker as needed whilst processing my application",
  () => {
    let referenceNumber;
    let url;
    let lossPayeeUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.completeAndSubmitPolicyForms({
          stopSubmittingAfter: 'brokerDetails',
          usingBroker: true,
          isBasedInUk: false,
          buildingNumberOrName: '123456789',
        });

        url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`;
        lossPayeeUrl = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_ROOT}`;

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
        currentHref: `${ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`,
        backLink: `${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`,
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

      it('renders `broker name` text', () => {
        cy.checkText(brokerManualAddressPage.brokerName(), application.BROKER[NAME]);
      });

      it(`renders ${FIELD_ID} textarea`, () => {
        const fieldId = FIELD_ID;
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

      it(`should redirect to ${LOSS_PAYEE_ROOT} page`, () => {
        cy.completeAndSubmitBrokerManualAddressForm({});

        cy.assertUrl(lossPayeeUrl);
      });
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToUrl(url);

        cy.checkTextareaValue({
          fieldId: FIELD_ID,
          expectedValue: application.BROKER[FIELD_ID],
        });
      });
    });
  },
);
