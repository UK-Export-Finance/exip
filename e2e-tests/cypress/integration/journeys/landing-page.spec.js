import landingPage from '../pages/landingPage';

context('Landing page', () => {
  before(() => {
    landingPage.visit();
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 90,
      'best-practices': 100,
      seo: 90,
    });
    cy.pa11y();
  });

  it('renders correct content', () => {
    landingPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal('Check if you can apply for export insurance');
    });

    landingPage.intro().invoke('text').then((text) => {
      const expected = 'We can help UK based exporters manage risks in challenging markets, ensuring that they get paid even where the private market is not able to offer insurance.';

      expect(text.trim()).equal(expected);
    });
  });
});
