import accessibleAutocomplete from 'accessible-autocomplete';

const init = () => {
  window.accessibleAutocomplete = accessibleAutocomplete;

  var countryCode = document.getElementById('countryCode');
  var buyerCountry = document.getElementById('buyerCountry');
  var finalDestinationCountryCode = document.getElementById('finalDestinationCountryCode');
  var alternativeCurrency = document.getElementById('alternativeCurrencyCode');

  accessibleAutocomplete.enhanceSelectElement({
    selectElement: countryCode || buyerCountry || finalDestinationCountryCode || alternativeCurrency,
    defaultValue: '',
  });

  return accessibleAutocomplete;
};

export default init();
