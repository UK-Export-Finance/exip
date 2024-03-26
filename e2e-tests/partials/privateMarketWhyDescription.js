import FIELD_IDS from '../constants/field-ids/insurance/export-contract';

const {
  PRIVATE_MARKET: { ATTEMPTED },
} = FIELD_IDS;

const privateMarketWhyDescription = {
  summary: () => cy.get(`[data-cy="${ATTEMPTED}-why-description"] summary`),
  details: () => cy.get(`[data-cy="${ATTEMPTED}-why-description"]`),
  weOffer: () => cy.get(`[data-cy="${ATTEMPTED}-why-description-we-offer"]`),
  hereToHelp: () => cy.get(`[data-cy="${ATTEMPTED}-why-description-here-to-help"]`),
  sharingInformation: () => cy.get(`[data-cy="${ATTEMPTED}-why-description-sharing-information"]`),
};

export default privateMarketWhyDescription;
