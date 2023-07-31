var EXIP;
!(function () {
  var t = document.getElementById('form'),
    e = document.getElementById('submit-button');
  t &&
    t.addEventListener('submit', function () {
      e.setAttribute('disabled', 'true'), e.setAttribute('aria-disabled', 'true'), e.classList.add('govuk-button--disabled');
    }),
    ((EXIP = void 0 === EXIP ? {} : EXIP).submitButton = {});
})();
//# sourceMappingURL=submitButton.js.map
