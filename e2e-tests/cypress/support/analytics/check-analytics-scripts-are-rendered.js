const checkAnalyticsScriptsAreRendered = () => {
  cy.document().then((document) => {
    const domElements = document.querySelectorAll('script');

    const srcs = [...domElements].map(script => script.getAttribute('src'))

    const scripts = srcs.filter((s) => s);

    const googleTagManagerScripts = scripts.filter((s) => s.includes('google') && s.includes('G-'));

    expect(googleTagManagerScripts.length).to.equal(1);

    const analyticsDataLayer = domElements[domElements.length - 1].innerHTML;

    expect(analyticsDataLayer.includes('window.dataLayer')).to.equal(true);
    expect(analyticsDataLayer.includes('G-')).to.equal(true);  
  });
};

export default checkAnalyticsScriptsAreRendered;
