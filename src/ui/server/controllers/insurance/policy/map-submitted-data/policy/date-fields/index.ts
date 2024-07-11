import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import createTimestampFromNumbers from '../../../../../../helpers/date/create-timestamp-from-numbers';
import { RequestBody } from '../../../../../../../types';

const {
  CONTRACT_POLICY: {
    REQUESTED_START_DATE,
    SINGLE: { CONTRACT_COMPLETION_DATE },
  },
} = FIELD_IDS;

/**
 * mapDateFields
 * Map the "policy" section date fields.
 * If REQUESTED_START_DATE and/or CONTRACT_COMPLETION_DATE fields are provided,
 * transform the day/month/year fields into a timestamp.
 * @param {RequestBody} formBody: Form data
 * @returns {Object} Mapped data
 */
const mapDateFields = (formBody: RequestBody) => {
  const mapped = formBody;

  const dateFieldIds = {
    start: {
      day: `${REQUESTED_START_DATE}-day`,
      month: `${REQUESTED_START_DATE}-month`,
      year: `${REQUESTED_START_DATE}-year`,
    },
    end: {
      day: `${CONTRACT_COMPLETION_DATE}-day`,
      month: `${CONTRACT_COMPLETION_DATE}-month`,
      year: `${CONTRACT_COMPLETION_DATE}-year`,
    },
  };

  const { start, end } = dateFieldIds;

  if (formBody[start.day] && formBody[start.month] && formBody[start.year]) {
    const day = Number(formBody[start.day]);
    const month = Number(formBody[start.month]);
    const year = Number(formBody[start.year]);

    mapped[REQUESTED_START_DATE] = createTimestampFromNumbers(day, month, year);
  }

  if (formBody[end.day] && formBody[end.month] && formBody[end.year]) {
    const day = Number(formBody[end.day]);
    const month = Number(formBody[end.month]);
    const year = Number(formBody[end.year]);

    mapped[CONTRACT_COMPLETION_DATE] = createTimestampFromNumbers(day, month, year);
  }

  return mapped;
};

export default mapDateFields;
