import landingPage from '../pages/landingPage';
import {
  ORGANISATION,
  LANDING_PAGE as CONTENT_STRINGS,
} from '../../../../content-strings';

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

  it('renders a page title, heading and description', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    landingPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });

    landingPage.description().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.DESCRIPTION);
    });
  });

  it('renders `cover against` content', () => {
    landingPage.coverAgainst.intro().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.COVERS_AGAINST.INTRO);
    });

    const expectedLength = CONTENT_STRINGS.COVERS_AGAINST.LIST.length;
    landingPage.coverAgainst.listItems().should('have.length', expectedLength);

    landingPage.coverAgainst.listItems().each(($element, index) => {
      expect($element.text().trim()).equal(CONTENT_STRINGS.COVERS_AGAINST.LIST[index].text);
    });
  });

  it('renders `use this service to` content', () => {
    landingPage.useServiceTo.intro().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.USE_SERVICE_TO.INTRO);
    });

    const expectedLength = CONTENT_STRINGS.USE_SERVICE_TO.LIST.length;
    landingPage.useServiceTo.listItems().should('have.length', expectedLength);

    landingPage.useServiceTo.listItems().each(($element, index) => {
      expect($element.text().trim()).equal(CONTENT_STRINGS.USE_SERVICE_TO.LIST[index].text);
    });
  });

  it('renders `completion time` copy', () => {
    landingPage.completionTime().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.COMPLETION_TIME);
    });
  });

  it('renders `before you start` content', () => {
    landingPage.beforeYouStart.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.BEFORE_YOU_START.HEADING);
    });
    landingPage.beforeYouStart.intro().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.BEFORE_YOU_START.INTRO);
    });

    const expectedLength = CONTENT_STRINGS.BEFORE_YOU_START.LIST.length;
    landingPage.beforeYouStart.listItems().should('have.length', expectedLength);

    landingPage.beforeYouStart.listItems().each(($element, index) => {
      expect($element.text().trim()).equal(CONTENT_STRINGS.BEFORE_YOU_START.LIST[index].text);
    });

    landingPage.beforeYouStart.listItemLinks().each(($element, index) => {
      expect($element.attr('href')).equal(CONTENT_STRINGS.BEFORE_YOU_START.LIST[index].href);
    });
  });
});
