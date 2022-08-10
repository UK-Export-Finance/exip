import { ROUTES } from '../constants';

export const LINKS = {
  BACK: 'Back',
  CHANGE: 'Change',
  START_AGAIN: {
    TEXT: 'Start again',
    HREF: ROUTES.ROOT,
  },
  GIVE_FEEDBACK: {
    TEXT: 'Give feedback',
    HREF: ROUTES.FEEDBACK,
  },
  EXTERNAL: {
    GUIDANCE: 'http://localhost:1234/mock/guidance',
    BEFORE_YOU_START: 'http://localhost:1234/mock/before-you-start',
    EXPORT_FINANCE_MANAGERS: 'https://www.gov.uk/government/publications/find-an-export-finance-manager',
    APPROVED_BROKER_LIST: 'https://www.gov.uk/government/publications/uk-export-finance-insurance-list-of-approved-brokers',
    NBI_FORM: 'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/1041659/export-insurance-non-binding-indication-request-form_20170609.pdf',
  },
};
