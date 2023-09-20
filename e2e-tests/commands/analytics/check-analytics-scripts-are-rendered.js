const checkAnalyticsScriptsAreRendered = () => {
  cy.document().then((document) => {
    const domElements = document.querySelectorAll('script');

    const scripts = Array.from(domElements)
      .map((script) => script.getAttribute('src'))
      .filter((s) => s);

    // Ensure GTM script exists
    const googleTagManagerScript = scripts.filter((script) => script.includes('googletagmanager') && script.includes('G-'));
    expect(googleTagManagerScript.length).to.equal(1);

    // Ensure GA script exists
    const googleAnalyticsScript = scripts.filter((script) => script.includes('googleAnalytics.js'));
    expect(googleAnalyticsScript.length).to.equal(1);

    // Ensure GA campaign attribute exists
    const dataCampaign = Array.from(domElements)
      .map((script) => script.getAttribute('data-campaign'))
      .filter((s) => s);
    expect(dataCampaign.length).to.equal(1);
  });
};

export default checkAnalyticsScriptsAreRendered;
