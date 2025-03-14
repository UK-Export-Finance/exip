import { useDifferentAddressLink } from '../../../../../../partials';
import { insetTextHtml, insetTextHtmlLineBreak, headingCaption } from '../../../../../../pages/shared';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import {
  ADDRESS_LOOKUP_INPUT_EXAMPLES,
  EXPECTED_TREASURY_SINGLE_LINE_STRING,
  EXPECTED_UNDERGROUND_STATION_SINGLE_LINE_STRING,
  ORDNANCE_SURVEY_EXAMPLES,
} from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';

const { TREASURY, WESTMINSTER_BRIDGE_STREET } = ADDRESS_LOOKUP_INPUT_EXAMPLES;
const { UNDERGROUND_STATION } = ORDNANCE_SURVEY_EXAMPLES.WESTMINSTER_BRIDGE_STREET;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_CONFIRM_ADDRESS;

const {
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { BROKER_CONFIRM_ADDRESS_ROOT, BROKER_DETAILS_ROOT, LOSS_PAYEE_ROOT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  "Insurance - Policy - Broker confirm address - As an exporter, I want to be able to review the broker's contact details that I have provided, So that I can confirm my input or amend any errors if needed",
  () => {
    let referenceNumber;
    let url;
    let lossPayeeUrl;
    let brokerDetailsUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.completeAndSubmitPolicyForms({
          stopSubmittingAfter: 'brokerDetails',
          usingBroker: true,
          isBasedInUk: true,
          postcode: TREASURY.POSTCODE,
          buildingNumberOrName: TREASURY.BUILDING_NAME,
        });

        url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_CONFIRM_ADDRESS_ROOT}`;
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
        currentHref: `${ROOT}/${referenceNumber}${BROKER_CONFIRM_ADDRESS_ROOT}`,
        backLink: `${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`,
        submitButtonCopy: BUTTONS.USE_THIS_ADDRESS,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      describe('inset text', () => {
        /**
         * NOTE: Cypress text assertion does not pick up HTML characters such as <br/>.
         * Therefore, we have to assert the text without line breaks
         * and instead, assert the line breaks separately via the following commands:
         * cy.assertLength(insetTextHtmlLineBreak() expectedLineBreaks);
         */

        describe('when an address is entered manually', () => {
          it(`should render ${FULL_ADDRESS} exactly as submitted, with line break elements`, () => {
            cy.checkText(insetTextHtml(), EXPECTED_TREASURY_SINGLE_LINE_STRING);

            const expectedLineBreaks = 4;

            cy.assertLength(insetTextHtmlLineBreak(), expectedLineBreaks);
          });
        });

        describe('when an address is obtained from Ordnance Survey', () => {
          beforeEach(() => {
            cy.navigateToUrl(url);

            cy.clickUseDifferentAddressLink();

            cy.completeAndSubmitBrokerDetailsForm({
              isBasedInUk: true,
              postcode: WESTMINSTER_BRIDGE_STREET.POSTCODE,
              buildingNumberOrName: WESTMINSTER_BRIDGE_STREET.BUILDING_NAME,
            });

            const optionValue = `${UNDERGROUND_STATION.ADDRESS_LINE_1} ${UNDERGROUND_STATION.ADDRESS_LINE_2}`;

            cy.completeAndSubmitBrokerAddressesForm({ optionValue });
          });

          it('should render the address with line break elements', () => {
            cy.checkText(insetTextHtml(), EXPECTED_UNDERGROUND_STATION_SINGLE_LINE_STRING);

            const expectedLineBreaks = 4;

            cy.assertLength(insetTextHtmlLineBreak(), expectedLineBreaks);
          });
        });
      });

      describe('`use a different address` link', () => {
        it('should render', () => {
          const expectedUrl = `${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`;
          const expectedText = CONTENT_STRINGS.USE_DIFFERENT_ADDRESS;

          cy.checkLink(useDifferentAddressLink(), expectedUrl, expectedText);
        });

        it(`should redirect to ${BROKER_DETAILS_ROOT}`, () => {
          cy.clickUseDifferentAddressLink();

          cy.assertUrl(brokerDetailsUrl);
        });
      });

      it('should render an `enter address manually` link', () => {
        cy.assertEnterAddressManuallyLink({ referenceNumber });
      });
    });

    describe('form submission', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${LOSS_PAYEE_ROOT} page`, () => {
        cy.clickSubmitButton();

        cy.assertUrl(lossPayeeUrl);
      });
    });

    describe('when clicking the `save and back` button', () => {
      it('should redirect to `all sections`', () => {
        cy.navigateToUrl(url);

        cy.clickSaveAndBackButton();

        cy.assertAllSectionsUrl(referenceNumber);
      });
    });
  },
);
