import { CONTACT_DETAILS } from '../../constants';
import { LINKS } from '../links';

export const CUSTOMER_SERVICE_CONTACT_DETAILS = {
  TELEPHONE: {
    PREFIX: 'Telephone: ',
    VALUE: CONTACT_DETAILS.TELEPHONE,
  },
  EMAIL: {
    PREFIX: 'Email: ',
    VALUE: CONTACT_DETAILS.EMAIL.CUSTOMER_SERVICE,
  },
  OPENING_TIMES: 'Opening times: Monday to Friday, 9am to 5pm (excluding public holidays)',
  CALL_CHARGES: {
    TEXT: 'Call charges',
    HREF: LINKS.EXTERNAL.CALL_CHARGES,
  },
};
