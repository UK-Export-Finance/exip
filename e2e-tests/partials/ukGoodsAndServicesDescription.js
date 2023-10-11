const ukGoodsOrServicesDescription = {
  summary: () => cy.get('[data-cy="goods-services"] summary'),
  details: () => cy.get('[data-cy="goods-services"]'),
  includes: {
    intro: () => cy.get('[data-cy="goods-services-includes-intro"]'),
    listItem1: () => cy.get('[data-cy="goods-services-includes-item-1"]'),
    listItem2: () => cy.get('[data-cy="goods-services-includes-item-2"]'),
    listItem3: () => cy.get('[data-cy="goods-services-includes-item-3"]'),
    listItem3Link: () => cy.get('[data-cy="goods-services-includes-item-3-link"]'),
    listItem4: () => cy.get('[data-cy="goods-services-includes-item-4"]'),
    listItem4Link: () => cy.get('[data-cy="goods-services-includes-item-4-link"]'),
    canCountAs: () => cy.get('[data-cy="goods-services-includes-can-count-as"]'),
  },
  canAlsoCount: () => cy.get('[data-cy="goods-services-can-also-count-copy"]'),
  doesNotCount: {
    heading: () => cy.get('[data-cy="goods-services-does-not-count-heading"]'),
    copy: () => cy.get('[data-cy="goods-services-does-not-count-copy"]'),
  },
  staffingCosts: {
    heading: () => cy.get('[data-cy="goods-services-staffing-costs-heading"]'),
    copy: () => cy.get('[data-cy="goods-services-staffing-costs-copy"]'),
    listItem1: () => cy.get('[data-cy="goods-services-staffing-costs-list-item-1"]'),
    listItem2: () => cy.get('[data-cy="goods-services-staffing-costs-list-item-2"]'),
    listItem3: () => cy.get('[data-cy="goods-services-staffing-costs-list-item-3"]'),
  },
  nonPhysicalAssets: {
    heading: () => cy.get('[data-cy="goods-services-non-physical-assets-heading"]'),
    copy: () => cy.get('[data-cy="goods-services-non-physical-assets-copy"]'),
  },
  notSure: {
    heading: () => cy.get('[data-cy="goods-services-not-sure-heading"]'),
    details: () => cy.get('[data-cy="goods-services-not-sure"]'),
    detailsLink: () => cy.get('[data-cy="goods-services-not-sure-link"]'),
  },
  calculateThoroughly: () => cy.get('[data-cy="goods-services-will-calculate-thoroughly"]'),
};

export default ukGoodsOrServicesDescription;
