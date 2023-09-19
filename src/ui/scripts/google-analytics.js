const id = document.querySelector('script[data-campaign]').getAttribute('data-campaign');
console.info('Intialising Google Analytics with ID:', id);

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', id);
