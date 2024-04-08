import { field as fieldSelector, headingCaption } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/export-contract';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { assertCountryAutocompleteInput } from '../../../../../../shared-test-assertions';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_DETAILS;

const {
  ROOT: INSURANCE_ROOT,
  EXPORT_CONTRACT: { AGENT_DETAILS },
} = INSURANCE_ROUTES;

const {
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Agent details page - As an Exporter, I want to give details about the agent that helped me win the export contract, So that UKEF can contact the appropriate parties to find out more about the working relationship', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${AGENT_DETAILS}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${AGENT_DETAILS}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${AGENT_DETAILS}#`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it(`renders ${NAME} label and input`, () => {
      const fieldId = NAME;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELDS.AGENT_DETAILS[fieldId].LABEL);
      field.input().should('exist');
    });

    it(`renders ${FULL_ADDRESS} label, hint and input`, () => {
      const fieldId = FULL_ADDRESS;
      const fieldStrings = FIELDS.AGENT_DETAILS[fieldId];

      cy.assertTextareaRendering({
        fieldId,
        expectedLabel: fieldStrings.LABEL,
        maximumCharacters: fieldStrings.MAXIMUM,
      });
    });

    describe(`searchable autocomplete input (${COUNTRY_CODE})`, () => {
      assertCountryAutocompleteInput({ fieldId: COUNTRY_CODE });
    });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });
  });
});
