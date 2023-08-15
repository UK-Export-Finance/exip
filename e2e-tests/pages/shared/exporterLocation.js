import { FIELD_IDS } from '../../constants';

const FIELD_ID = FIELD_IDS.ELIGIBILITY.VALID_EXPORTER_LOCATION;

const exporterLocationPage = {
  [FIELD_ID]: {
    errorMessage: () => cy.get(`[data-cy="${FIELD_ID}-error-message"]`),
  },
};

export default exporterLocationPage;
