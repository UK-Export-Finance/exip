import { INSURANCE_FIELD_IDS } from '../constants/field-ids/insurance';

const {
  COMPANIES_HOUSE: { INDUSTRY_SECTOR_NAME },
} = INSURANCE_FIELD_IDS;

const mockSicCodes = [
  {
    code: '64999',
    [INDUSTRY_SECTOR_NAME]: 'Financial intermediation not elsewhere classified',
  },
  {
    code: '01440',
    [INDUSTRY_SECTOR_NAME]: 'Raising of camels and camelids',
  },
  {
    code: '13100',
    [INDUSTRY_SECTOR_NAME]: 'Preparation and spinning of textile fibres',
  },
  {
    code: '55209',
    [INDUSTRY_SECTOR_NAME]: 'Other holiday and other collective accommodation',
  },
  {
    code: '56102',
    [INDUSTRY_SECTOR_NAME]: 'Unlicensed restaurants and cafes',
  },
];

export default mockSicCodes;
