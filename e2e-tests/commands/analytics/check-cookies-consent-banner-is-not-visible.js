import { cookieBanner } from '../../partials';

const checkCookiesConsentBannerIsNotVisible = () => {
  cookieBanner.heading().should('not.be.visible');
  cookieBanner.hideButton().should('not.be.visible');
  cookieBanner.cookiesLink().should('not.be.visible');

  cookieBanner.question.copy().should('not.exist');
  cookieBanner.question.acceptButton().should('not.exist');
  cookieBanner.question.rejectButton().should('not.exist');
};

export default checkCookiesConsentBannerIsNotVisible;
