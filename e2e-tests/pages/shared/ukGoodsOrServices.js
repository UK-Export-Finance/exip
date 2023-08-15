import { FIELD_IDS } from '../../constants';

const FIELD_ID = FIELD_IDS.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES;

const ukGoodsOrServicesPage = {
  errorMessage: () => cy.get(`[data-cy="${FIELD_ID}-error-message"]`),
};

export default ukGoodsOrServicesPage;
