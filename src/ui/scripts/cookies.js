var hideButton = document.querySelector('.js-hide');
var cookieBanner = document.querySelector('.govuk-cookie-banner');
var acceptButton = document.querySelector('.js-cookies-button-accept');
var rejectButton = document.querySelector('.js-cookies-button-reject');
var changeCookiesSubmitButton = document.querySelector('.change-cookies-submit-button');

var expiryDate = function () {
  const date = new Date();

  // 1 day.
  date.setDate(date.getDate() + 1);

  date.toGMTString();

  return date;
};

var createRejectCookie = function () {
  document.cookie = 'optionalCookies=false; path=/; SameSite=Lax; expires=' + expiryDate();
};

var createAcceptCookie = function () {
  document.cookie = 'optionalCookies=true; path=/; SameSite=Lax; expires=' + expiryDate();
};

if (rejectButton) {
  rejectButton.addEventListener('click', function (event) {
    createRejectCookie();
  });
}

if (acceptButton) {
  acceptButton.addEventListener('click', function (event) {
    createAcceptCookie();
  });
}

if (!document.cookie.includes('optionalCookies')) {
  cookieBanner.removeAttribute('hidden');

  // Shift focus to the banner
  cookieBanner.setAttribute('tabindex', '-1');
  cookieBanner.focus();
  cookieBanner.addEventListener('blur', function () {
    cookieBanner.removeAttribute('tabindex');
  });
}

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
        createRejectCookie();
      }

      if (answer === 'accept') {
        createAcceptCookie();
      }
    }
  });
}
