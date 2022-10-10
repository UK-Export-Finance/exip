import partials from '../../e2e/partials';
import { ROUTES } from '../../../constants';
import { COOKIES_CONSENT } from '../../../content-strings';

const checkCookiesConsentBannerIsVisible = () => {
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


export default checkCookiesConsentBannerIsVisible;
