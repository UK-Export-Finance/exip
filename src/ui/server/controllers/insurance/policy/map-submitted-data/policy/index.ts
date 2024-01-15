import { RequestBody } from '../../../../../../types';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import createTimestampFromNumbers from '../../../../../helpers/date/create-timestamp-from-numbers';

const {
  CONTRACT_POLICY: {
    REQUESTED_START_DATE,
    SINGLE: { CONTRACT_COMPLETION_DATE },
  },
  NEED_PRE_CREDIT_PERIOD,
  CREDIT_PERIOD_WITH_BUYER,
} = POLICY_FIELD_IDS;

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

  /**
   * If REQUESTED_START_DATE and/or CONTRACT_COMPLETION_DATE fields are provided,
   * transform the day/month/year fields into a timestamp.
   */
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

  /**
   * If NEED_PRE_CREDIT_PERIOD is answered as "no",
   * wipe the CREDIT_PERIOD_WITH_BUYER field.
   */
  if (formBody[NEED_PRE_CREDIT_PERIOD] === 'false') {
    populatedData[CREDIT_PERIOD_WITH_BUYER] = '';
  }

  return populatedData;
};

export default mapSubmittedData;
