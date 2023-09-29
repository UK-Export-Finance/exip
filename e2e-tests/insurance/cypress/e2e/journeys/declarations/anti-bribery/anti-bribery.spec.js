import { headingCaption, singleInputField } from '../../../../../../pages/shared';
import { antiBriberyPage } from '../../../../../../pages/insurance/declarations';
import partials from '../../../../../../partials';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/declarations';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

import api from '../../../../../../commands/api';
import flattenKeystoneDocument from '../../../../../../commands/flatten-keystone-document';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.ANTI_BRIBERY;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    CONFIDENTIALITY,
    ANTI_BRIBERY: {
      ROOT: ANTI_BRIBERY_ROOT,
      CODE_OF_CONDUCT,
    },
  },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_ANTI_BRIBERY;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Declarations - Anti-bribery page - As an Exporter, I want the system to provide the details of the anti-bribery and corruption declaration for my export insurance application, So that, while processing my export insurance application. I have clarity on my anti-bribery and corruption declarations', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      // go to the page we want to test.
      taskList.submitApplication.tasks.declarationsAndSubmit.link().click();

      cy.completeAndSubmitDeclarationConfidentiality();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ANTI_BRIBERY_ROOT}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${ANTI_BRIBERY_ROOT}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`,
    });
  });

  describe('page tests', () => {
    let field;

    beforeEach(() => {
      cy.navigateToUrl(url);

      field = singleInputField(FIELD_ID);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    describe('latest confidentiality content', () => {
      let content;

      const {
        intro,
        level1,
        firstLevel2,
        secondLevel2,
      } = antiBriberyPage.listItems;

      before(() => {
        api.declarations.getLatestAntiBribery().then((data) => {
          content = flattenKeystoneDocument(data.content.document);
        });
      });

      it('renders an intro paragraph', () => {
        cy.checkText(intro(), content[0].text);
      });

      it('renders level 1 list items', () => {
        cy.checkText(level1.item(1), content[1].text);
        cy.checkText(level1.item(2), content[2].text);
        cy.checkText(level1.item(3), content[3].text);

        cy.checkText(level1.item(4), content[7].text);
        cy.checkText(level1.item(5), content[8].text);
        cy.checkText(level1.item(6), content[9].text);
        cy.checkText(level1.item(7), content[10].text);

        cy.checkText(level1.item(8), content[14].text);
        cy.checkText(level1.item(9), content[15].text);
      });

      it('renders level 2 list items', () => {
        cy.checkText(firstLevel2.item(1), content[4].text);
        cy.checkText(firstLevel2.item(2), content[5].text);
        cy.checkText(firstLevel2.item(3), content[6].text);

        cy.checkText(secondLevel2.item(1), content[11].text);
        cy.checkText(secondLevel2.item(2), content[12].text);
        cy.checkText(secondLevel2.item(3), content[13].text);
      });
    });

    describe('expandable details - definition of terms', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      const { expandable } = antiBriberyPage;

      it('should render summary text with collapsed conditional `details` content', () => {
        cy.checkText(expandable.summary(), CONTENT_STRINGS.EXPANDABLE.INTRO);

        expandable.details().should('not.have.attr', 'open');
      });

      describe('when clicking the summary text', () => {
        it('should expand the collapsed `details` content', () => {
          expandable.summary().click();

          expandable.details().should('have.attr', 'open');
        });
      });
    });

    it("renders `I've read and agree` label and input", () => {
      field.label().should('exist');
      cy.checkText(field.label(), FIELDS[FIELD_ID].LABEL);

      field.input().should('exist');
    });

    it('renders a submit button and `save and back` button', () => {
      cy.assertSubmitAndSaveButtons();
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      let field;

      beforeEach(() => {
        cy.navigateToUrl(url);

        field = singleInputField(FIELD_ID);
      });

      it('should render a validation error', () => {
        const expectedErrorsCount = 1;

        cy.submitAndAssertFieldErrors(
          field,
          null,
          0,
          expectedErrorsCount,
          ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY,
          false,
        );
      });
    });

    describe('when submitting a fully completed form', () => {
      it(`should redirect to ${CODE_OF_CONDUCT}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitDeclarationAntiBribery();

        const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CODE_OF_CONDUCT}`;

        cy.assertUrl(expectedUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted value', () => {
          cy.navigateToUrl(url);

          cy.completeAndSubmitDeclarationAntiBribery();

          cy.navigateToUrl(url);

          singleInputField(FIELD_ID).input().should('be.checked');
        });
      });
    });
  });
});
