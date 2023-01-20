import { COMPANY_DETAILS } from './exporter-business';

const SHARED = {
  HEADING_CAPTION: 'Your business',
};

const EXPORTER_BUSINESS = {
  COMPANY_DETAILS: {
    ...SHARED,
    ...COMPANY_DETAILS,
  },
  NATURE_OF_YOUR_BUSINESS: {
    ...SHARED,
    PAGE_TITLE: 'Nature of your business',
  },
};

export default EXPORTER_BUSINESS;
