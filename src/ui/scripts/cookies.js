const hideButton = document.querySelector('.js-hide');
const cookieBanner = document.querySelector('.govuk-cookie-banner');
const acceptButton = document.querySelector('.js-cookies-button-accept');
const rejectButton = document.querySelector('.js-cookies-button-reject');
const changeCookiesSubmitButton = document.querySelector('.change-cookies-submit-button');
const https = window.location.protocol == 'https:';
// `__Secure` prefix will only work with Secure flag i.e. HTTPS
const cookieName = https ? '__Secure-optionalCookies' : 'optionalCookies';

/**
 * Sets cookie expiry timestamp
 * @returns String cookie expiry date
 */
const expiryDate = () => {
  const date = new Date();

  // 1 day.
  const oneDay = date.setDate(date.getDate() + 1);
  const utcString = new Date(oneDay).toUTCString();

  return 'expires=' + utcString + '; ';
};

/**
 * Sets cookie domain attribute
 * @returns String cookie domain
 */
const domain = () => {
  return 'domain=' + window.location.hostname;
};

/**
 * Set's cookie value
 * @param {Boolean} value cookie value
 */
const setCookie = (value) => {
  document.cookie = cookieName + '=' + value + '; path=/; SameSite=Strict; secure; ' + expiryDate() + domain();
};

/**
 * Initialise cookie banner and listeners
 */
const init = () => {
  // Shift focus to the cookie banner
  if (!document.cookie.includes(cookieName)) {
    cookieBanner.removeAttribute('hidden');
    cookieBanner.setAttribute('tabindex', '-1');
    cookieBanner.focus();
    cookieBanner.addEventListener('blur', () => {
      cookieBanner.removeAttribute('tabindex');
    });
  }

  // Cookie is rejected by the user
  if (rejectButton) {
    rejectButton.addEventListener('click', function (event) {
      setCookie(false);
    });
  }

  // Cookie is accepted by the user
  if (acceptButton) {
    acceptButton.addEventListener('click', function (event) {
      setCookie(true);
    });
  }

  // Hide cookie banner
  if (hideButton) {
    hideButton.addEventListener('click', function (event) {
      cookieBanner.setAttribute('hidden', 'hidden');
      event.preventDefault();
    });
  }


  if (changeCookiesSubmitButton) {
    changeCookiesSubmitButton.addEventListener('click', function (event) {
      const checkbox = document.querySelector('input[name="optionalCookies"]:checked');

      if (checkbox) {
        const answer = document.querySelector('input[name="optionalCookies"]:checked').value;

        if (answer === 'reject') {
          setCookie(false);
        }

        if (answer === 'accept') {
          setCookie(true);
        }
      }
    });
  }
};

// Call init when element is loaded
cookieBanner.addEventListener('load', () => {
  console.log('Loaded cookie');
  init();
});
