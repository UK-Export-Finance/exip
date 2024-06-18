import accessibleAutocomplete from 'accessible-autocomplete';

const init = () => {
  window.accessibleAutocomplete = accessibleAutocomplete;

  var countryCode = document.getElementById('countryCode');
  var buyerCountry = document.getElementById('buyerCountry');
  var finalDestinationCountryCode = document.getElementById('finalDestinationCountryCode');
  var alternativeCurrency = document.getElementById('alternativeCurrencyCode');
  var payableCountryCode = document.getElementById('payableCountryCode');

  accessibleAutocomplete.enhanceSelectElement({
    selectElement: countryCode || buyerCountry || finalDestinationCountryCode || alternativeCurrency || payableCountryCode,
    defaultValue: '',
  });

  return accessibleAutocomplete;
};

export default init();
