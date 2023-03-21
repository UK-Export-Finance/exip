import {
  headingCaption,
  submitButton,
  saveAndBackButton,
} from '../../../../pages/shared';
import { confidentialityPage } from '../../../../pages/insurance/declarations';
import partials from '../../../../partials';
import {
  BUTTONS,
  PAGES,
  ERROR_MESSAGES,
} from '../../../../../../content-strings';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/declarations';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import api from '../../../../../support/api';
import flattenKeystoneDocument from '../../../../../support/flatten-keystone-document';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.CONFIDENTIALITY;

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  DECLARATIONS: { CONFIDENTIALITY, ANTI_BRIBERY: { ROOT: ANTI_BRIBERY_ROOT } },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIDENTIALITY;

context('Insurance - Declarations - Confidentiality page - As an Exporter, I want to make confidentiality declaration for my export insurance application, So that UKEF can be assured of my agreement with regards to confidentiality while processing my export insurance application', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType();

      // go to the page we want to test.
      taskList.submitApplication.tasks.declarations.link().click();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
      lightHouseThresholds: {
        accessibility: 98,
      },
    });
  });

  describe('page tests', () => {
    let field;

    beforeEach(() => {
      cy.navigateToUrl(url);

      field = confidentialityPage[FIELD_ID];
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
        level3,
      } = confidentialityPage.listItems;

      before(() => {
        api.declarations.getLatestConfidentiality().then((data) => {
          content = flattenKeystoneDocument(data.content.document);
        });
      });

      it('renders an intro paragraph', () => {
        cy.checkText(intro(), content[0].text);
      });

      it('renders level 1 list items', () => {
        cy.checkText(level1.item1(), content[1].text);
        cy.checkText(level1.item2(), content[8].text);
        cy.checkText(level1.item3(), content[9].text);
      });

      it('renders level 2 list items', () => {
        cy.checkText(level2.item1(), content[2].text);
        cy.checkText(level2.item2(), content[3].text);
        cy.checkText(level2.item3(), content[4].text);
        cy.checkText(level2.item4(), content[5].text);
      });

      it('renders level 3 list items', () => {
        cy.checkText(level3.item1(), content[6].text);
        cy.checkText(level3.item2(), content[7].text);
      });
    });

    it("renders `I've read and agree` label and input", () => {
      field.label().should('exist');
      cy.checkText(field.label(), FIELDS[FIELD_ID].LABEL);

      field.input().should('exist');
    });

    it('renders a `save and back` button', () => {
      saveAndBackButton().should('exist');

      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      let field;

      beforeEach(() => {
        cy.navigateToUrl(url);

        field = confidentialityPage[FIELD_ID];
      });

      it('should render a validation error', () => {
        submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY;

        cy.checkText(partials.errorSummaryListItems().first(), expectedMessage);

        cy.checkText(field.errorMessage(), `Error: ${expectedMessage}`);
      });

      it('should focus on input when clicking summary error message', () => {
        submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        field.input().should('have.focus');
      });
    });

    describe('when submitting a fully completed form', () => {
      it(`should redirect to ${ANTI_BRIBERY_ROOT}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitDeclarationConfidentiality();

        const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ANTI_BRIBERY_ROOT}`;

        cy.url().should('eq', expectedUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted value', () => {
          cy.navigateToUrl(url);

          cy.completeAndSubmitDeclarationConfidentiality();

          cy.navigateToUrl(url);

          const field = confidentialityPage[FIELD_ID];

          field.input().should('be.checked');
        });
      });
    });
  });
});
