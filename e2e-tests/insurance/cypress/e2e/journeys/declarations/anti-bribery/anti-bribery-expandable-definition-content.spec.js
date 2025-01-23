import { expandable } from '../../../../../../partials';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.ANTI_BRIBERY.VERSIONS[1];

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: { ROOT: ANTI_BRIBERY_ROOT },
  },
} = INSURANCE_ROUTES;

const { INTRO, TABLE } = CONTENT_STRINGS.EXPANDABLE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Declarations - Anti-bribery page - expandable `definition` content', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.deleteAccount();

    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      cy.completeAndSubmitDeclarationsForms({ stopSubmittingAfter: 'confidentiality', referenceNumber });

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

    it('renders table headers', () => {
      expandable.summary().click();

      cy.checkText(expandable.table.headers.term(), HEADERS.TERM);
      cy.checkText(expandable.table.headers.definition(), HEADERS.DEFINITION);
    });

    describe('body row 1', () => {
      const { 0: content } = BODY;

      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(1);
      });

      it('renders `term` column', () => {
        cy.checkText(row.term(), content.TERM);
      });

      it('renders `definition` column', () => {
        cy.checkText(row.definition(), content.DEFINITION[0].TEXT);
      });
    });

    describe('body row 2', () => {
      const { 1: content } = BODY;

      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(2);
      });

      it('renders `term` column', () => {
        cy.checkText(row.term(), content.TERM);
      });

      it('renders `definition` column list items', () => {
        cy.checkText(row.definitionListItem(1), content.DEFINITION[0].TEXT);
        cy.checkText(row.definitionListItem(2), content.DEFINITION[1].TEXT);
      });
    });

    describe('body row 3', () => {
      const { 2: content } = BODY;

      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(3);
      });

      it('renders `term` column', () => {
        cy.checkText(row.term(), content.TERM);
      });

      it('renders `definition` column list items', () => {
        cy.checkText(row.definitionListItem(1), content.DEFINITION[0].TEXT);
        cy.checkText(row.definitionListItem(2), content.DEFINITION[1].TEXT);
        cy.checkText(row.definitionListItem(3), content.DEFINITION[2].TEXT);
        cy.checkText(row.definitionListItem(4), content.DEFINITION[3].TEXT);
        cy.checkText(row.definitionListItem(5), content.DEFINITION[4].TEXT);
        cy.checkText(row.definitionListItem(6), content.DEFINITION[5].TEXT);
        cy.checkText(row.definitionListItem(7), content.DEFINITION[6].TEXT);
        cy.checkText(row.definitionListItem(8), content.DEFINITION[7].TEXT);
      });
    });

    describe('body row 4', () => {
      const { 3: content } = BODY;

      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(4);
      });

      it('renders `term` column', () => {
        cy.checkText(row.term(), content.TERM);
      });

      it('renders `definition` column', () => {
        cy.checkText(row.definition(), content.DEFINITION[0].TEXT);
      });
    });

    describe('body row 5', () => {
      const { 4: content } = BODY;

      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(5);
      });

      it('renders `term` column', () => {
        cy.checkText(row.term(), content.TERM);
      });

      it('renders `definition` column list items', () => {
        cy.checkText(row.definitionListItem(1), content.DEFINITION[0].TEXT);
        cy.checkText(row.definitionListItem(2), content.DEFINITION[1].TEXT);
        cy.checkText(row.definitionListItem(3), content.DEFINITION[2].TEXT);
        cy.checkText(row.definitionListItem(4), content.DEFINITION[3].TEXT);
      });
    });

    describe('body row 6', () => {
      const { 5: content } = BODY;

      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(6);
      });

      it('renders `term` column', () => {
        cy.checkText(row.term(), content.TERM);
      });

      it('renders `definition` column', () => {
        cy.checkText(row.definition(), content.DEFINITION[0].TEXT);
      });
    });

    describe('body row 7', () => {
      const { 6: content } = BODY;

      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(7);
      });

      it('renders `term` column', () => {
        cy.checkText(row.term(), content.TERM);
      });

      it('renders `definition` column list items', () => {
        cy.checkText(row.definitionListItem(1), content.DEFINITION[0].TEXT);
      });
    });

    describe('body row 8', () => {
      const { 7: content } = BODY;

      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(8);
      });

      it('renders `term` column', () => {
        cy.checkText(row.term(), content.TERM);
      });

      it('renders `definition` column', () => {
        cy.checkText(row.definition(), content.DEFINITION[0].TEXT);
      });
    });

    describe('body row 9', () => {
      const { 8: content } = BODY;

      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(9);
      });

      it('renders `term` column', () => {
        cy.checkText(row.term(), content.TERM);
      });

      it('renders `definition` column', () => {
        cy.checkText(row.definition(), content.DEFINITION[0].TEXT);
      });
    });

    describe('body row 10', () => {
      const { 9: content } = BODY;

      beforeEach(() => {
        expandable.summary().click();

        row = expandable.table.body.row(10);
      });

      it('renders `term` column', () => {
        cy.checkText(row.term(), content.TERM);
      });

      it('renders `definition` column list items', () => {
        cy.checkText(row.definitionListItem(1), content.DEFINITION[0].TEXT);
        cy.checkText(row.definitionListItem(2), content.DEFINITION[1].TEXT);
        cy.checkText(row.definitionListItem(3), content.DEFINITION[2].TEXT);
      });
    });
  });
});
