import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ObjectType } from '../../../../../types/object';

const { CHECK_YOUR_ANSWERS } = FIELD_IDS;

const { ELIGIBILITY, EXPORTER_BUSINESS, BUYER, EXPORT_CONTRACT, POLICY } = CHECK_YOUR_ANSWERS;

export const CHECK_YOUR_ANSWERS_FIELDS: ObjectType = {
  [ELIGIBILITY]: {
    VALUE: true,
  },
  [EXPORTER_BUSINESS]: {
    VALUE: true,
  },
  [BUYER]: {
    VALUE: true,
  },
  [POLICY]: {
    VALUE: true,
  },
  [EXPORT_CONTRACT]: {
    VALUE: true,
  },
};
