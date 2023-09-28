import { antiBriberyPage } from '../../../../../../pages/insurance/declarations';
import partials from '../../../../../../partials';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.ANTI_BRIBERY;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: {
      ROOT: ANTI_BRIBERY_ROOT,
    },
  },
} = INSURANCE_ROUTES;

const { expandable } = antiBriberyPage;

const { INTRO, TABLE } = CONTENT_STRINGS.EXPANDABLE;

const baseUrl = Cypress.config('baseUrl');

const assertTermColumn = (selector, content) => {
  cy.checkText(selector, content.TERM);
};

context('Insurance - Declarations - Anti-bribery page - expandable `definition` content', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.deleteAccount();

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

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders summary text', () => {
    expandable.summary().should('exist');

    cy.checkText(expandable.summary(), INTRO);
  });

  it('clicking summary text reveals details', () => {
    expandable.summary().click();

    expandable.table.headers.term().should('be.visible');
    expandable.table.headers.definition().should('be.visible');
  });

  describe('table', () => {
    const { BODY, HEADERS } = TABLE;

    let row;
    let content;

    it('renders table headers', () => {
      expandable.summary().click();

      cy.checkText(expandable.table.headers.term(), HEADERS.TERM);
      cy.checkText(expandable.table.headers.definition(), HEADERS.DEFINITION);
    });

    describe('body row 1', () => {
      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(1);

        const { 0: contentRow } = BODY;
        content = contentRow;
      });

      it('renders `term` column', () => {
        assertTermColumn(row.term(), content);
      });

      it('renders `definition` column', () => {
        cy.checkText(row.definition(), content.DEFINITION[0]);
      });
    });

    describe('body row 2', () => {
      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(2);

        const { 1: contentRow } = BODY;
        content = contentRow;
      });

      it('renders `term` column', () => {
        assertTermColumn(row.term(), content);
      });

      it('renders `definition` column list items', () => {
        cy.checkText(row.definitionListItem(1), content.DEFINITION[0]);
        cy.checkText(row.definitionListItem(2), content.DEFINITION[1]);
      });
    });

    describe('body row 3', () => {
      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(3);

        const { 2: contentRow } = BODY;
        content = contentRow;
      });

      it('renders `term` column', () => {
        assertTermColumn(row.term(), content);
      });

      it('renders `definition` column list items', () => {
        cy.checkText(row.definitionListItem(1), content.DEFINITION[0]);
        cy.checkText(row.definitionListItem(2), content.DEFINITION[1]);
        cy.checkText(row.definitionListItem(3), content.DEFINITION[2]);
        cy.checkText(row.definitionListItem(4), content.DEFINITION[3]);
      });
    });

    describe('body row 4', () => {
      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(4);

        const { 3: contentRow } = BODY;
        content = contentRow;
      });

      it('renders `term` column', () => {
        assertTermColumn(row.term(), content);
      });

      it('renders `definition` column', () => {
        cy.checkText(row.definition(), content.DEFINITION[0]);
      });
    });

    describe('body row 5', () => {
      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(5);

        const { 4: contentRow } = BODY;
        content = contentRow;
      });

      it('renders `term` column', () => {
        assertTermColumn(row.term(), content);
      });

      it('renders `definition` column list items', () => {
        cy.checkText(row.definitionListItem(1), content.DEFINITION[0]);
        cy.checkText(row.definitionListItem(2), content.DEFINITION[1]);
      });
    });

    describe('body row 6', () => {
      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(6);

        const { 5: contentRow } = BODY;
        content = contentRow;
      });

      it('renders `term` column', () => {
        assertTermColumn(row.term(), content);
      });

      it('renders `definition` column', () => {
        cy.checkText(row.definition(), content.DEFINITION[0]);
      });
    });

    describe('body row 7', () => {
      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(7);

        const { 6: contentRow } = BODY;
        content = contentRow;
      });

      it('renders `term` column', () => {
        assertTermColumn(row.term(), content);
      });

      it('renders `definition` column list items', () => {
        cy.checkText(row.definitionListItem(1), content.DEFINITION[0]);
        cy.checkText(row.definitionListItem(2), content.DEFINITION[1]);
      });
    });

    describe('body row 8', () => {
      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(8);

        const { 7: contentRow } = BODY;
        content = contentRow;
      });

      it('renders `term` column', () => {
        assertTermColumn(row.term(), content);
      });

      it('renders `definition` column', () => {
        cy.checkText(row.definition(), content.DEFINITION[0]);
      });
    });

    describe('body row 9', () => {
      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(9);

        const { 8: contentRow } = BODY;
        content = contentRow;
      });

      it('renders `term` column', () => {
        assertTermColumn(row.term(), content);
      });

      it('renders `definition` column', () => {
        cy.checkText(row.definition(), content.DEFINITION[0]);
      });
    });

    describe('body row 10', () => {
      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(10);

        const { 9: contentRow } = BODY;
        content = contentRow;
      });

      it('renders `term` column', () => {
        assertTermColumn(row.term(), content);
      });

      it('renders `definition` column list items', () => {
        cy.checkText(row.definitionListItem(1), content.DEFINITION[0]);
        cy.checkText(row.definitionListItem(2), content.DEFINITION[1]);
        cy.checkText(row.definitionListItem(3), content.DEFINITION[2]);
      });
    });
  });
});
