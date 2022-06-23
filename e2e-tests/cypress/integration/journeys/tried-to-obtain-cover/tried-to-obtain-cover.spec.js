import {
  buyerBasedPage,
  triedToObtainCoverPage,
} from '../../pages';
import partials from '../../partials';
import {
  ORGANISATION,
  BUTTONS,
  FIELDS,
  LINKS,
  PAGES,
  ERROR_MESSAGES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

const CONTENT_STRINGS = PAGES.TRIED_TO_OBTAIN_COVER_PAGE;
const { FIELD_IDS, ROUTES } = CONSTANTS;

context('Tried to obtain private cover page', () => {
  beforeEach(() => {
    cy.visit(ROUTES.BUYER_BASED, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    buyerBasedPage.searchInput().type('Fra');
    const results = buyerBasedPage.results();
    results.first().click();
    buyerBasedPage.submitButton().click();

    cy.url().should('include', ROUTES.TRIED_TO_OBTAIN_COVER);
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 80,
      'best-practices': 100,
      seo: 75,
    });
  });

  it('renders a back button with correct link', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    cy.url().should('include', ROUTES.BUYER_BASED);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    triedToObtainCoverPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  it('renders `yes` radio button', () => {
    const fieldId = FIELD_IDS.TRIED_PRIVATE_COVER;
    const yesRadio = triedToObtainCoverPage[fieldId].yes();
    yesRadio.should('exist');

    yesRadio.invoke('text').then((text) => {
      const expected = FIELDS[fieldId].OPTIONS.YES.TEXT;
      expect(text.trim()).equal(expected);
    });
  });

  it('renders `no` radio button', () => {
    const fieldId = FIELD_IDS.TRIED_PRIVATE_COVER;
    const noRadio = triedToObtainCoverPage[fieldId].no();
    noRadio.should('exist');

    noRadio.invoke('text').then((text) => {
      const expected = FIELDS[fieldId].OPTIONS.NO.TEXT;
      expect(text.trim()).equal(expected);
    });
  });

  it('renders `not tried` radio button', () => {
    const fieldId = FIELD_IDS.TRIED_PRIVATE_COVER;
    const notTriedRadio = triedToObtainCoverPage[fieldId].notTried();
    notTriedRadio.should('exist');

    notTriedRadio.invoke('text').then((text) => {
      const expected = FIELDS[fieldId].OPTIONS.NOT_TRIED.TEXT;
      expect(text.trim()).equal(expected);
    });
  });

  it('renders a submit button', () => {
    const button = triedToObtainCoverPage.submitButton();
    button.should('exist');

    button.invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        triedToObtainCoverPage.submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.TRIED_PRIVATE_COVER];

        partials.errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        triedToObtainCoverPage[FIELD_IDS.TRIED_PRIVATE_COVER].errorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });
    });

    describe('when submitting the answer as `yes`', () => {
      it(`should redirect to ${ROUTES.UK_CONTENT_PERCENTAGE}`, () => {
        triedToObtainCoverPage[FIELD_IDS.TRIED_PRIVATE_COVER].yes().click();
        triedToObtainCoverPage.submitButton().click();

        cy.url().should('include', ROUTES.UK_CONTENT_PERCENTAGE);
      });
    });
  });
});
