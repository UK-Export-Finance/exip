import accessibleAutocomplete from 'accessible-autocomplete';

const init = () => {
  window.accessibleAutocomplete = accessibleAutocomplete;

  var buyerCountry = document.getElementById('buyerCountry');
  var finalDestinationCountryCode = document.getElementById('finalDestinationCountryCode');
  var alternativeCurrency = document.getElementById('alternativeCurrencyCode');

  accessibleAutocomplete.enhanceSelectElement({
    selectElement: buyerCountry || finalDestinationCountryCode || alternativeCurrency,
    defaultValue: '',
  });

  return accessibleAutocomplete;
};

export default init();
