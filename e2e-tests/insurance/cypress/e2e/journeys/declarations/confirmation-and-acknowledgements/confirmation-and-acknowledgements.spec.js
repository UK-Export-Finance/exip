import { headingCaption, singleInputField } from '../../../../../../pages/shared';
import { confirmationAndAcknowledgementsPage } from '../../../../../../pages/insurance/declarations';
import partials from '../../../../../../partials';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/declarations';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

import api from '../../../../../../commands/api';
import flattenKeystoneDocument from '../../../../../../commands/flatten-keystone-document';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.CONFIRMATION_AND_ACKNOWLEDGEMENTS;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    HOW_YOUR_DATA_WILL_BE_USED,
    ANTI_BRIBERY: { EXPORTING_WITH_CODE_OF_CONDUCT },
    CONFIRMATION_AND_ACKNOWLEDGEMENTS,
  },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIRMATION_ACKNOWLEDGEMENTS;

const baseUrl = Cypress.config('baseUrl');

const field = singleInputField(FIELD_ID);

context("Insurance - Declarations - Confirmation and acknowledgements page - As an Exporter, I want the system to provide the details of my application's confirmation and acknowledgement, So that, I can readily confirm my credit insurance application", () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      // go to the page we want to test.
      taskList.submitApplication.tasks.declarationsAndSubmit.link().click();

      cy.completeAndSubmitDeclarationConfidentiality();
      cy.completeAndSubmitDeclarationAntiBribery();
      cy.completeAndSubmitDeclarationAntiBriberyCodeOfConduct();
      cy.completeAndSubmitDeclarationAntiBriberyExportingWithCodeOfConduct();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${EXPORTING_WITH_CODE_OF_CONDUCT}`,
      assertBackLink: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    describe('latest confidentiality content', () => {
      let content;

      const {
        intro,
        level1,
        level2,
      } = confirmationAndAcknowledgementsPage.listItems;

      before(() => {
        api.declarations.getLatestConfirmationAndAcknowledgements().then((data) => {
          content = flattenKeystoneDocument(data.content.document);
        });
      });

      it('renders an intro paragraph', () => {
        cy.checkText(intro(), content[0].text);
      });

      it('renders level 1 list items', () => {
        cy.checkText(level1.item(1), content[1].text);
        cy.checkText(level1.item(2), content[2].text);
      });

      it('renders level 2 list items', () => {
        cy.checkText(level2.item(1), content[3].text);
        cy.checkText(level2.item(2), content[4].text);
        cy.checkText(level2.item(3), content[5].text);
      });
    });

    it("renders `I've read and agree` label and input", () => {
      cy.checkText(field.label(), FIELDS[FIELD_ID].LABEL);

      field.input().should('exist');
    });

    it('renders a submit button and `save and back` button', () => {
      cy.assertSubmitAndSaveButtons();
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render a validation error', () => {
        const expectedErrorsCount = 1;

        cy.submitAndAssertRadioErrors(
          field,
          0,
          expectedErrorsCount,
          ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY,
          false,
        );
      });
    });

    describe('when submitting a fully completed form', () => {
      it(`should redirect to ${HOW_YOUR_DATA_WILL_BE_USED}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitDeclarationConfirmationAndAcknowledgements();

        const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${HOW_YOUR_DATA_WILL_BE_USED}`;

        cy.assertUrl(expectedUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted value', () => {
          cy.navigateToUrl(url);

          field.input().should('be.checked');
        });
      });
    });
  });
});
