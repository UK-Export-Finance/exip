import { errorSummaryListItems, errorSummaryListItemLinks } from '../../../../../../partials';
import { body, field as fieldSelector, radios } from '../../../../../../pages/shared';
import { ERROR_MESSAGES, PAGES } from '../../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_ADDRESSES;

const {
  ROOT,
  POLICY: { BROKER_ADDRESSES_ROOT, BROKER_CONFIRM_ADDRESS_ROOT },
} = INSURANCE_ROUTES;

const {
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS: FIELD_ID },
} = POLICY_FIELD_IDS;

const { BROKER_ADDRESSES: FIELD_STRINGS } = FIELDS;

const baseUrl = Cypress.config('baseUrl');

const expectedFieldValue = 'BRITISH BROADCASTING CORPORATION WOGAN HOUSE PORTLAND PLACE';

const optionId = `${FIELD_ID}-${expectedFieldValue}`;

context('Insurance - Policy - Broker addresses page', () => {
  let referenceNumber;
  let url;
  let brokerConfirmAddressUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_ADDRESSES_ROOT}`;
      brokerConfirmAddressUrl = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_CONFIRM_ADDRESS_ROOT}`;

      cy.navigateToUrl(url);
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
      currentHref: `${ROOT}/${referenceNumber}${BROKER_ADDRESSES_ROOT}`,
      backLink: `${ROOT}/${referenceNumber}${BROKER_ADDRESSES_ROOT}#`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders body copy', () => {
      const expected = `1 ${CONTENT_STRINGS.BODY} W1A 1AA`;

      cy.checkText(body(), expected);
    });

    describe(FIELD_ID, () => {
      const field = fieldSelector(FIELD_ID);

      it('renders a legend', () => {
        cy.checkText(field.label(), FIELD_STRINGS[FIELD_ID].LABEL);
      });

      it('renders an `address` radio label and input', () => {
        const { option } = radios(FIELD_ID, expectedFieldValue);

        cy.checkText(option.label(), expectedFieldValue);
      });
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
        const field = fieldSelector(FIELD_ID);

        cy.checkErrorSummaryListHeading();
        cy.assertErrorSummaryListLength(1);

        cy.checkText(errorSummaryListItems().eq(errorIndex), expectedErrorMessage);

        cy.checkText(field.errorMessage(), `Error: ${expectedErrorMessage}`);
      });

      it('should focus on input when clicking summary error message', () => {
        errorSummaryListItemLinks().eq(errorIndex).click();

        fieldSelector(optionId).input().should('have.focus');
      });
    });

    it(`should redirect to ${BROKER_CONFIRM_ADDRESS_ROOT}`, () => {
      cy.navigateToUrl(url);

      radios(optionId).option.label().click();

      cy.clickSubmitButton();

      cy.assertUrl(brokerConfirmAddressUrl);
    });
  });
});
