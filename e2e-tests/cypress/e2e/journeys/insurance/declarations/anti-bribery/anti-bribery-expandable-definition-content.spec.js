import { antiBriberyPage } from '../../../../pages/insurance/declarations';
import partials from '../../../../partials';
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

const assertTermColumn = (selector, content) => {
  cy.checkText(selector, content.TERM);
};

context('Insurance - Declarations - Anti-bribery page - expandable `definition` content', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType();

      // go to the page we want to test.
      taskList.submitApplication.tasks.declarations.link().click();

      cy.completeAndSubmitDeclarationConfidentiality();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ANTI_BRIBERY_ROOT}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteAccount();
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
    let row;
    let content;

    it('renders table headers', () => {
      expandable.summary().click();

      cy.checkText(expandable.table.headers.term(), TABLE.HEADERS.TERM);
      cy.checkText(expandable.table.headers.definition(), TABLE.HEADERS.DEFINITION);
    });

    describe('body row 1', () => {
      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(1);

        content = TABLE.BODY[0];
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

        content = TABLE.BODY[1];
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

        content = TABLE.BODY[2];
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

        content = TABLE.BODY[3];
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

        content = TABLE.BODY[4];
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

        content = TABLE.BODY[5];
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

        content = TABLE.BODY[6];
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

        content = TABLE.BODY[7];
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

        content = TABLE.BODY[8];
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

        content = TABLE.BODY[9];
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
