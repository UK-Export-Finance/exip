import { POLICY as FIELD_IDS } from '../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import { Application } from '../../../../types';

const {
  USING_BROKER,
  BROKER_DETAILS: { NAME: BROKER_NAME, EMAIL, FULL_ADDRESS },
} = FIELD_IDS;

const { FIELDS } = XLSX;

/**
 * mapBroker
 * Map an application's broker fields into an array of objects for XLSX generation
 * @param {Application}
 * @returns {Array} Array of objects for XLSX generation
 */
const mapBroker = (application: Application) => {
  const { broker } = application;

  let mapped = [xlsxRow(FIELDS[USING_BROKER], mapYesNoField({ answer: broker[USING_BROKER] }))];

  if (broker[USING_BROKER]) {
    mapped = [
      ...mapped,
      xlsxRow(FIELDS[BROKER_NAME], broker[BROKER_NAME]),
      xlsxRow(FIELDS[FULL_ADDRESS], broker[FULL_ADDRESS]),
      xlsxRow(FIELDS[EMAIL], broker[EMAIL]),
    ];
  }

  return mapped;
};

export default mapBroker;
