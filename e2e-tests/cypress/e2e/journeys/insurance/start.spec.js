import { insurance } from '../../pages';
import { submitButton } from '../../pages/shared';
import partials from '../../partials';
import { BUTTONS, PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const CONTENT_STRINGS = PAGES.INSURANCE.START;

context('Insurance Eligibility - start page', () => {
  const url = ROUTES.INSURANCE.START;

  before(() => {
    cy.navigateToUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: url,
      backLink: `${url}#`,
      submitButtonCopy: BUTTONS.START_NOW,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render a header with href to insurance start', () => {
      partials.header.serviceName().should('have.attr', 'href', url);
    });

    it('renders an intro', () => {
      cy.checkText(insurance.startPage.intro(), CONTENT_STRINGS.INTRO);
    });

    describe('`you will need` list', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders an intro', () => {
        cy.checkText(insurance.startPage.list.intro(), CONTENT_STRINGS.LIST.INTRO);
      });

      it('renders list items', () => {
        cy.checkText(insurance.startPage.list.item1(), CONTENT_STRINGS.LIST.ITEMS[0]);

        cy.checkText(insurance.startPage.list.item2(), CONTENT_STRINGS.LIST.ITEMS[1]);

        cy.checkText(insurance.startPage.list.item3(), CONTENT_STRINGS.LIST.ITEMS[2]);

        cy.checkText(insurance.startPage.list.item4(), CONTENT_STRINGS.LIST.ITEMS[3]);
      });
    });

    it('renders a body text', () => {
      cy.checkText(insurance.startPage.body1(), CONTENT_STRINGS.BODY_1);

      cy.checkText(insurance.startPage.body2(), CONTENT_STRINGS.BODY_2);

      cy.checkText(insurance.startPage.body3(), CONTENT_STRINGS.BODY_3);

      cy.checkText(insurance.startPage.body4(), CONTENT_STRINGS.BODY_4);
    });
  });

  context('form submission', () => {
    it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE}`, () => {
      cy.navigateToUrl(url);

      submitButton().click();

      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE}`;

      cy.url().should('eq', expected);
    });
  });
});
