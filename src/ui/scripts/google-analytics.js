const id = document.querySelector('script[data-campaign-ga]').getAttribute('data-campaign-ga');

console.info('Intialising Google Analytics with ID:', id);

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', id);
