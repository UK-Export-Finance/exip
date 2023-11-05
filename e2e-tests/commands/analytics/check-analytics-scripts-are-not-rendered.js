const checkAnalyticsScriptsAreNotRendered = () => {
  cy.document().then((document) => {
    const domElements = document.querySelectorAll('script');

    const srcs = [...domElements].map((script) => script.getAttribute('src'));

    const scripts = srcs.filter((s) => s);

    const googleTagManagerScripts = scripts.filter((s) => s.includes('google') && s.includes('G-'));

    expect(googleTagManagerScripts.length).to.equal(0);

    const lastScript = domElements[domElements.length - 1].innerHTML;

    expect(lastScript.includes('window.dataLayer')).to.equal(false);
    expect(lastScript.includes('G-')).to.equal(false);
  });
};

export default checkAnalyticsScriptsAreNotRendered;
