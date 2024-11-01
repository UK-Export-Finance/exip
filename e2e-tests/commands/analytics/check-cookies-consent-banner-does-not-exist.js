import { cookieBanner } from '../../partials';

const checkCookiesConsentBannerDoesNotExist = () => {
  cookieBanner.heading().should('not.exist');
  cookieBanner.hideButton().should('not.exist');
  cookieBanner.cookiesLink().should('not.exist');

  cookieBanner.question.copy().should('not.exist');
  cookieBanner.question.acceptButton().should('not.exist');
  cookieBanner.question.rejectButton().should('not.exist');

  cookieBanner.accepted.copy().should('not.exist');
};

export default checkCookiesConsentBannerDoesNotExist;
