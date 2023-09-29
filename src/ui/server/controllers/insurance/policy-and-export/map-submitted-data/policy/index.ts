import { RequestBody } from '../../../../../../types';
import { FIELD_IDS } from '../../../../../constants';
import createTimestampFromNumbers from '../../../../../helpers/date/create-timestamp-from-numbers';

const {
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
    },
  },
} = FIELD_IDS.INSURANCE;

/**
 * mapSubmittedData
 * Check form data and map any fields that need to be sent to the API/DB in a different format or structure.
 * @param {Express.Request.body} Form data
 * @returns {Object} Page variables
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

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

    populatedData[REQUESTED_START_DATE] = createTimestampFromNumbers(day, month, year);
  }

  if (formBody[end.day] && formBody[end.month] && formBody[end.year]) {
    const day = Number(formBody[end.day]);
    const month = Number(formBody[end.month]);
    const year = Number(formBody[end.year]);

    populatedData[CONTRACT_COMPLETION_DATE] = createTimestampFromNumbers(day, month, year);
  }

  return populatedData;
};

export default mapSubmittedData;
