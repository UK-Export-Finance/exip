import { insurance } from '../../../../pages';
import { submitButton } from '../../../../pages/shared';
import { BUTTONS, PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const CONTENT_STRINGS = PAGES.INSURANCE.START;

const { startPage } = insurance;

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

    it('renders an intro', () => {
      cy.checkText(startPage.intro(), CONTENT_STRINGS.INTRO);
    });

    describe('`you will need` list', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders an intro', () => {
        cy.checkText(startPage.list.intro(), CONTENT_STRINGS.LIST.INTRO);
      });

      it('renders list items', () => {
        cy.checkText(startPage.list.item1(), CONTENT_STRINGS.LIST.ITEMS[0]);

        cy.checkText(startPage.list.item2(), CONTENT_STRINGS.LIST.ITEMS[1]);

        cy.checkText(startPage.list.item3(), CONTENT_STRINGS.LIST.ITEMS[2]);

        cy.checkText(startPage.list.item4(), CONTENT_STRINGS.LIST.ITEMS[3]);
      });
    });

    it('renders a body text', () => {
      cy.checkText(startPage.body1(), CONTENT_STRINGS.BODY_1);

      cy.checkText(startPage.body2(), CONTENT_STRINGS.BODY_2);

      cy.checkText(startPage.body3(), CONTENT_STRINGS.BODY_3);

      cy.checkText(startPage.body4(), CONTENT_STRINGS.BODY_4);
    });

    it('renders a "sign-in" body text', () => {
      const { SIGN_IN } = CONTENT_STRINGS;
      const { signIn } = startPage;

      cy.checkText(signIn.youCan(), SIGN_IN.YOU_CAN);

      cy.checkLink(signIn.link(), SIGN_IN.LINK.HREF, SIGN_IN.LINK.TEXT);

      cy.checkText(signIn.toContinueApplication(), SIGN_IN.TO_CONTINUE_APPLICATION);
    });

    it('renders a "find out more" body text', () => {
      const { FIND_OUT_MORE } = CONTENT_STRINGS;
      const { findOutMore } = startPage;

      cy.checkText(findOutMore.youCan(), FIND_OUT_MORE.YOU_CAN);

      cy.checkLink(findOutMore.link(), FIND_OUT_MORE.LINK.HREF, FIND_OUT_MORE.LINK.TEXT);

      cy.checkText(findOutMore.toFindOutMore(), FIND_OUT_MORE.TO_FIND_OUT_MORE);
    });

    it('renders a "get a quote" body text', () => {
      const { QUOTE } = CONTENT_STRINGS;
      const { getAQuote } = startPage;

      cy.checkText(getAQuote.youCan(), QUOTE.YOU_CAN);

      cy.checkLink(getAQuote.link(), QUOTE.LINK.HREF, QUOTE.LINK.TEXT);

      cy.checkText(getAQuote.ifYouNeed(), QUOTE.IF_YOU_NEED);
    });
  });

  context('form submission', () => {
    it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE}`, () => {
      cy.navigateToUrl(url);

      submitButton().click();

      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE}`;

      cy.assertUrl(expected);
    });
  });
});
