import { COMPANY_DETAILS } from './exporter-business';

const SHARED = {
  HEADING_CAPTION: 'Your business',
};

const EXPORTER_BUSINESS = {
  COMPANY_DETAILS: {
    ...SHARED,
    ...COMPANY_DETAILS,
  },
};

export default EXPORTER_BUSINESS;
