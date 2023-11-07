import partials from '../../partials';

const checkCookiesConsentBannerIsNotVisible = () => {
  partials.cookieBanner.heading().should('not.be.visible');
  partials.cookieBanner.hideButton().should('not.be.visible');
  partials.cookieBanner.cookiesLink().should('not.be.visible');

  partials.cookieBanner.question.copy1().should('not.exist');
  partials.cookieBanner.question.copy2().should('not.exist');
  partials.cookieBanner.question.acceptButton().should('not.exist');
  partials.cookieBanner.question.rejectButton().should('not.exist');
};

export default checkCookiesConsentBannerIsNotVisible;
