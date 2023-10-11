const ukGoodsOrServicesCalculateDescription = {
  summary: () => cy.get('[data-cy="goods-and-services-calculate"] summary'),
  details: () => cy.get('[data-cy="goods-and-services-calculate"]'),
  list: {
    intro: () => cy.get('[data-cy="goods-and-services-calculate-list-intro"]'),
    item1: () => cy.get('[data-cy="goods-and-services-calculate-list-item-1"]'),
    item2: () => cy.get('[data-cy="goods-and-services-calculate-list-item-2"]'),
    item2ChildList: {
      item1: () => cy.get('[data-cy="goods-and-services-calculate-list-item-2-child-list-item-1"]'),
      item2: () => cy.get('[data-cy="goods-and-services-calculate-list-item-2-child-list-item-2"]'),
    },
    item3: () => cy.get('[data-cy="goods-and-services-calculate-list-item-3"]'),
    item4: () => cy.get('[data-cy="goods-and-services-calculate-list-item-4"]'),
  },
};

export default ukGoodsOrServicesCalculateDescription;
