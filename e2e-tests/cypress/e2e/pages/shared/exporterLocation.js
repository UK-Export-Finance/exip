import { FIELD_IDS } from '../../../../constants';

const exporterLocationPage = {
  [FIELD_IDS.VALID_EXPORTER_LOCATION]: {
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.VALID_EXPORTER_LOCATION}-error-message"]`),
  },
};

export default exporterLocationPage;
