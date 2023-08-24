import accessibleAutocomplete from 'accessible-autocomplete';

const init = () => {
  window.accessibleAutocomplete = accessibleAutocomplete;

  var buyerCountry = document.getElementById('buyerCountry');
  var finalDestinationCountryCode = document.getElementById('finalDestinationCountryCode');

  accessibleAutocomplete.enhanceSelectElement({
    selectElement: buyerCountry || finalDestinationCountryCode,
    defaultValue: '',
  });

  return accessibleAutocomplete;
};

export default init();
