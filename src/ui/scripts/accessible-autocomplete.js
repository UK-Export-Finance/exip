import accessibleAutocomplete from 'accessible-autocomplete';

const init = () => {
  window.accessibleAutocomplete = accessibleAutocomplete;

  const countryCode = document.getElementById('countryCode');
  const buyerCountry = document.getElementById('buyerCountry');
  const finalDestinationCountryCode = document.getElementById('finalDestinationCountryCode');
  const alternativeCurrency = document.getElementById('alternativeCurrencyCode');
  const payableCountryCode = document.getElementById('payableCountryCode');

  accessibleAutocomplete.enhanceSelectElement({
    selectElement: countryCode || buyerCountry || finalDestinationCountryCode || alternativeCurrency || payableCountryCode,
    defaultValue: '',
  });

  return accessibleAutocomplete;
};

export default init();
