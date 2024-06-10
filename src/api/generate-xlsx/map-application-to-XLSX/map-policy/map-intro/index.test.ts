import mapIntro from '.';
import FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import formatDate from '../../../../helpers/format-date';
import getPopulatedApplication from '../../../../helpers/get-populated-application';
import { createFullApplication, getKeystoneContext, mapApplicationIds } from '../../../../test-helpers';
import { Application, Context } from '../../../../types';

const { FIELDS, SECTION_TITLES } = XLSX;

const {
  POLICY_TYPE,
  CONTRACT_POLICY: { REQUESTED_START_DATE },
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy/map-intro', () => {
  let populatedApplication: Application;
  let application: Application;
  let applicationIds: object;
  let context: Context;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = await createFullApplication(context);

    applicationIds = mapApplicationIds(application);

    populatedApplication = await getPopulatedApplication(context, applicationIds);
  });

  it('should return an array of mapped fields', () => {
    const { policy } = populatedApplication;

    const result = mapIntro(policy);

    const expected = [
      xlsxRow(SECTION_TITLES.POLICY, ''),
      xlsxRow(String(FIELDS[POLICY_TYPE]), policy[POLICY_TYPE]),
      xlsxRow(String(FIELDS[REQUESTED_START_DATE]), formatDate(policy[REQUESTED_START_DATE], 'dd-MMM-yy')),
    ];

    expect(result).toEqual(expected);
  });
});
