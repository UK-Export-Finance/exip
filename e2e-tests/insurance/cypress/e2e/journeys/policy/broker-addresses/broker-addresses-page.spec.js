import { errorSummaryListItems, errorSummaryListItemLinks } from '../../../../../../partials';
import { field as fieldSelector, intro, radios } from '../../../../../../pages/shared';
import { brokerAddressesPage } from '../../../../../../pages/insurance/policy';
import { ORDNANCE_SURVEY_EXAMPLES } from '../../../../../../constants';
import { ERROR_MESSAGES, PAGES } from '../../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';

const {
  PAGE_TITLE,
  INTRO: { ADDRESS, FOUND_FOR, SEPARATOR, SEARCH_AGAIN },
} = PAGES.INSURANCE.POLICY.BROKER_ADDRESSES;

const {
  ROOT,
  POLICY: { BROKER_ADDRESSES_ROOT, BROKER_CONFIRM_ADDRESS_ROOT, BROKER_DETAILS_ROOT },
} = INSURANCE_ROUTES;

const {
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS: FIELD_ID },
} = POLICY_FIELD_IDS;

const { BROKER_ADDRESSES: FIELD_STRINGS } = FIELDS;

const { TREASURY } = ORDNANCE_SURVEY_EXAMPLES;

const baseUrl = Cypress.config('baseUrl');

const field = fieldSelector(FIELD_ID);

const optionValue = `${TREASURY.ADDRESS_LINE_1} ${TREASURY.ADDRESS_LINE_2}`;

const optionDataCy = `${FIELD_ID}-${optionValue}`;

context(
  'Insurance - Policy - Broker addresses page - As an exporter, I want to provide UKEF with my broker’s details, So that UKEF can communicate with the broker as needed whilst processing my application',
  () => {
    let referenceNumber;
    let url;
    let brokerConfirmAddressUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'brokerDetails', usingBroker: true, isBasedInUk: true });

        url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_ADDRESSES_ROOT}`;
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
        pageTitle: PAGE_TITLE,
        currentHref: `${ROOT}/${referenceNumber}${BROKER_ADDRESSES_ROOT}`,
        backLink: `${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a intro copy', () => {
        intro()
          .invoke('text')
          .then((text) => {
            expect(text.trim()).includes(`1 ${ADDRESS} ${FOUND_FOR} `);
            expect(text.trim()).includes(TREASURY.POSTCODE);
            expect(text.trim()).includes(` ${SEPARATOR} `);
            expect(text.trim()).includes('1.');
            expect(text.trim()).includes(SEARCH_AGAIN);
          });
      });

      it('renders a `search again` link', () => {
        const expectedHref = `${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`;

        cy.checkLink(brokerAddressesPage.searchAgainLink(), expectedHref, SEARCH_AGAIN);
      });

      describe(FIELD_ID, () => {
        it('renders a legend', () => {
          cy.checkText(field.label(), FIELD_STRINGS[FIELD_ID].LABEL);
        });

        it('renders an `address` radio label and input', () => {
          const { option } = radios(FIELD_ID, optionValue);

          cy.checkText(option.label(), optionValue);

          option.input().should('exist');
        });
      });

      it('should render an `enter address manually` link', () => {
        cy.assertEnterAddressManuallyLink({ referenceNumber });
      });
    });

    describe('form submission', () => {
      describe('when submitting an empty form', () => {
        const errorIndex = 0;
        const expectedErrorMessage = ERROR_MESSAGES.INSURANCE.POLICY[FIELD_ID].IS_EMPTY;

        beforeEach(() => {
          cy.navigateToUrl(url);
          cy.clickSubmitButton();
        });

        it('should render validation errors', () => {
          cy.checkErrorSummaryListHeading();
          cy.assertErrorSummaryListLength(1);

          cy.checkText(errorSummaryListItems().eq(errorIndex), expectedErrorMessage);

          cy.checkText(field.errorMessage(), `Error: ${expectedErrorMessage}`);
        });

        it('should focus on input when clicking summary error message', () => {
          errorSummaryListItemLinks().eq(errorIndex).click();

          fieldSelector(optionDataCy).input().should('have.focus');
        });
      });

      describe('when submitting a fully completed form', () => {
        it(`should redirect to ${BROKER_CONFIRM_ADDRESS_ROOT}`, () => {
          cy.navigateToUrl(url);

          cy.completeAndSubmitBrokerAddressesForm({ optionValue });

          cy.assertUrl(brokerConfirmAddressUrl);
        });

        describe('when going back to the page', () => {
          it('should have the submitted value', () => {
            cy.navigateToUrl(url);

            const { option } = radios(FIELD_ID, optionValue);

            cy.assertRadioOptionIsChecked(option.input());
          });
        });
      });
    });
  },
);
