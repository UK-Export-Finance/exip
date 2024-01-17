import accessibleAutocomplete from 'accessible-autocomplete';

const init = () => {
  window.accessibleAutocomplete = accessibleAutocomplete;

  var buyerCountry = document.getElementById('buyerCountry');
  var finalDestinationCountryCode = document.getElementById('finalDestinationCountryCode');
  var alternativeCurrency = document.getElementById('alternativeCurrencyCode');
  var alternativePolicyCurrency = document.getElementById('alternativePolicyCurrencyCode');

  accessibleAutocomplete.enhanceSelectElement({
    selectElement: buyerCountry || finalDestinationCountryCode || alternativeCurrency || alternativePolicyCurrency,
    defaultValue: '',
  });

  return accessibleAutocomplete;
};

export default init();
