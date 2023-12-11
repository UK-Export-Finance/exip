/**
 * getDomScriptSrc
 * Get a particular script's SRC attribute from the DOM.
 * @param {Array}: Script SRCs
 * @param {String}: SRC name
 * @returns {String} Script SRC
 */
const getDomScriptSrc = (srcs, name) => {
  const scriptSrc = srcs.filter((src) => src.includes(name));

  return scriptSrc;
};

/**
 * getDomScriptAttribute
 * Get a particular script attribute from the DOM.
 * @param {Array}: domElements
 * @param {String}: attribute
 * @returns {Array} DOM elemnets that have the provided attribute.
 */
const getDomScriptAttribute = (domElements, attribute) =>
  Array.from(domElements)
    .map((script) => script.getAttribute(attribute))
    .filter((s) => s);


/**
 * checkAnalyticsScriptsAreRendered
 * Check that GA and GTM scripts are rendered
 */
const checkAnalyticsScriptsAreRendered = () => {
  cy.document().then((document) => {
    const domElements = document.querySelectorAll('script');

    const scriptSrcs = Array.from(domElements)
      .map((script) => script.getAttribute('src'))
      .filter((s) => s);

    // Ensure GA script exists
    const gaSrc = getDomScriptSrc(scriptSrcs, 'googleAnalytics.js');

    expect(gaSrc.length).to.equal(1);

    // Ensure GA script has a data campaign
    const dataCampaignGA = getDomScriptAttribute(domElements, 'data-campaign-ga');

    expect(dataCampaignGA.length).to.equal(1);
    expect(dataCampaignGA[0].includes('GA')).to.equal(true);

    // Ensure GTM script exists
    const gtmSrc = getDomScriptSrc(scriptSrcs, 'googleTagManager.js');
    expect(gtmSrc.length).to.equal(1);

    // Ensure GTM script has a data campaign
    const dataCampaignGTM = getDomScriptAttribute(domElements, 'data-campaign-gtm');

    expect(dataCampaignGTM.length).to.equal(1);
    expect(dataCampaignGTM[0].includes('GTM')).to.equal(true);
  });
};

export default checkAnalyticsScriptsAreRendered;
