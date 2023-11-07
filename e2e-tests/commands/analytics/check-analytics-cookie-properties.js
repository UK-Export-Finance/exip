import { COOKIE } from '../../constants';

const checkAnalyticsCookieProperties = () => {
  cy.getCookie(COOKIE.NAME.OPTION).then((cookie) => {
    cy.getCookie(COOKIE.NAME.OPTION).should('have.property', 'name', COOKIE.NAME.OPTION);
    cy.getCookie(COOKIE.NAME.OPTION).should('have.property', 'path', '/');
    cy.getCookie(COOKIE.NAME.OPTION).should('have.property', 'sameSite', 'strict');
    cy.getCookie(COOKIE.NAME.OPTION).should('have.property', 'httpOnly', false);
    cy.getCookie(COOKIE.NAME.OPTION).should('have.property', 'secure', true);

    const date = new Date(cookie.expiry * 1000);
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();

    const today = new Date();
    const tomorrow = today.setDate(today.getDate() + 1);

    const expectedDay = new Date(tomorrow).getDate();
    const expectedMonth = new Date(tomorrow).getMonth();
    const expectedYear = new Date(tomorrow).getFullYear();

    expect(day).to.equal(expectedDay);
    expect(month).to.equal(expectedMonth);
    expect(year).to.equal(expectedYear);

    cy.location('hostname').then((hostname) => {
      cy.getCookie(COOKIE.NAME.OPTION).should('have.property', 'domain', hostname);
    });
  });
};

export default checkAnalyticsCookieProperties;
