import partials from '../../e2e/partials';
import { COOKIES_CONSENT, PAGES } from '../../../content-strings';
import { ROUTES } from '../../../constants';

const clearCookies = () => {
  cy.clearCookie('optionalCookies');
};

const reject = () => {
  partials.cookieBanner.question.rejectButton().click();
  partials.cookieBanner.hideButton().click();
};

const checkHidden = () => {
  partials.cookieBanner.heading().should('not.be.visible');
  partials.cookieBanner.hideButton().should('not.be.visible');
  partials.cookieBanner.cookiesLink().should('not.be.visible');

  partials.cookieBanner.question.copy1().should('not.exist');
  partials.cookieBanner.question.copy2().should('not.exist');
  partials.cookieBanner.question.acceptButton().should('not.exist');
  partials.cookieBanner.question.rejectButton().should('not.exist');

  partials.cookieBanner.rejected.copy().should('not.be.visible');
};

const rejectAnalyticsCookies = () => {
  clearCookies();
  reject();
  checkHidden();
};

export default rejectAnalyticsCookies;
