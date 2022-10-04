var hideButton = document.querySelector('.js-hide');
var cookieBanner = document.querySelector('.govuk-cookie-banner');
var acceptButton = document.querySelector('.js-cookies-button-accept');
var rejectButton = document.querySelector('.js-cookies-button-reject');

var expiryDate = function () {
  const date = new Date();

  // 1 day.
  date.setDate(date.getDate() + 1);

  date.toGMTString();

  return date;
};

if (acceptButton) {
  acceptButton.addEventListener('click', function (event) {
    document.cookie = 'optionalCookies=true; SameSite=Lax; expires=' + expiryDate();
  });
}

if (rejectButton) {
  rejectButton.addEventListener('click', function (event) {
    document.cookie = 'optionalCookies=false; SameSite=Lax; expires=' + expiryDate();
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
