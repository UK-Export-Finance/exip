import partials from '../../partials';

const checkCookiesConsentBannerDoesNotExist = () => {
  partials.cookieBanner.heading().should('not.exist');
  partials.cookieBanner.hideButton().should('not.exist');
  partials.cookieBanner.cookiesLink().should('not.exist');

  partials.cookieBanner.question.copy1().should('not.exist');
  partials.cookieBanner.question.copy2().should('not.exist');
  partials.cookieBanner.question.acceptButton().should('not.exist');
  partials.cookieBanner.question.rejectButton().should('not.exist');

  partials.cookieBanner.accepted.copy().should('not.exist');
};

export default checkCookiesConsentBannerDoesNotExist;
