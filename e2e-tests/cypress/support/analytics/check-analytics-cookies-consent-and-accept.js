import partials from '../../e2e/partials';
import { COOKIES_CONSENT, PAGES } from '../../../content-strings';
import { ROUTES } from '../../../constants';

const checkVisibility = () => {
  partials.cookieBanner.heading().should('exist');

  partials.cookieBanner.question.copy1().should('exist');
  partials.cookieBanner.question.copy1().invoke('text').then((text) => {
    expect(text.trim()).equal(COOKIES_CONSENT.QUESTION.COPY_1);
  });

  partials.cookieBanner.question.copy2().should('exist');
  partials.cookieBanner.question.copy2().invoke('text').then((text) => {
    expect(text.trim()).equal(COOKIES_CONSENT.QUESTION.COPY_2);
  });

  partials.cookieBanner.question.acceptButton().should('exist');
  partials.cookieBanner.question.acceptButton().invoke('text').then((text) => {
    expect(text.trim()).equal(COOKIES_CONSENT.QUESTION.ACCEPT_BUTTON);
  });

  partials.cookieBanner.question.rejectButton().should('exist');
  partials.cookieBanner.question.rejectButton().invoke('text').then((text) => {
    expect(text.trim()).equal(COOKIES_CONSENT.QUESTION.REJECT_BUTTON);
  });

  partials.cookieBanner.cookiesLink().should('exist');
  partials.cookieBanner.cookiesLink().invoke('text').then((text) => {
    expect(text.trim()).equal(COOKIES_CONSENT.QUESTION.VIEW_COOKIES);
  });

  partials.cookieBanner.cookiesLink().should('have.attr', 'href', ROUTES.COOKIES);
};

const accept = () => {
  partials.cookieBanner.question.acceptButton().click();
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

  partials.cookieBanner.accepted.copy().should('not.be.visible');
};

const checkAnalyticsCookiesConsentAndAccept = () => {  
  checkVisibility();
  accept();
  checkHidden();
};

export default checkAnalyticsCookiesConsentAndAccept;
