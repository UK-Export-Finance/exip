import { FIELD_IDS } from '../../../../constants';

const ukGoodsOrServicesPage = {
  errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES}-error-message"]`),
};

export default ukGoodsOrServicesPage;
