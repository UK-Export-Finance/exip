import { expandable } from '../../../../../../partials';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.MODERN_SLAVERY.EXPANDABLE.VERSIONS[0];

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: { MODERN_SLAVERY },
} = INSURANCE_ROUTES;

const { INTRO, TABLE } = CONTENT_STRINGS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Declarations - Modern slavery page - expandable `definition` content', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitDeclarationsForms({ formToStopAt: 'exportingWithCodeOfConduct', referenceNumber });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY}`;

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

      it('renders `definition` column', () => {
        cy.checkText(row.definition(), content.DEFINITION[0].TEXT);
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

      it('renders `definition` column', () => {
        row
          .definitionListItemChild(1, 1)
          .invoke('text')
          .then((text) => {
            expect(text).includes(content.DEFINITION[0].CHILDREN[0].TEXT);
          });

        cy.checkLink(row.definitionListItemChild(1, 2), '#', content.DEFINITION[0].CHILDREN[1].TEXT);

        cy.checkText(row.definitionListItemChild(1, 3), content.DEFINITION[0].CHILDREN[2].TEXT);
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
        row
          .definitionListItemChild(1, 1)
          .invoke('text')
          .then((text) => {
            expect(text).includes(content.DEFINITION[0].CHILDREN[0].TEXT);
          });

        cy.checkLink(row.definitionListItemChild(1, 2), '#', content.DEFINITION[0].CHILDREN[1].TEXT);

        row
          .definitionListItemChild(1, 3)
          .invoke('text')
          .then((text) => {
            expect(text).includes(content.DEFINITION[0].CHILDREN[2].TEXT);
          });

        cy.checkLink(row.definitionListItemChild(1, 4), '#', content.DEFINITION[0].CHILDREN[3].TEXT);

        row
          .definitionListItemChild(1, 5)
          .invoke('text')
          .then((text) => {
            expect(text).includes(content.DEFINITION[0].CHILDREN[4].TEXT);
          });
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

      it('renders `definition` column', () => {
        cy.checkText(row.definition(), content.DEFINITION[0].TEXT);
      });
    });
  });
});
