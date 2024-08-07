import mapIntro from '.';
import FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { DATE_FORMAT } from '../../../../constants';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapPolicyType from './map-policy-type';
import formatDate from '../../../../helpers/format-date';
import getPopulatedApplication from '../../../../helpers/get-populated-application';
import { createFullApplication, getKeystoneContext, mapApplicationIds } from '../../../../test-helpers';
import { Application, Context } from '../../../../types';

const { FIELDS } = XLSX;

const {
  POLICY_TYPE,
  CONTRACT_POLICY: { REQUESTED_START_DATE },
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy/map-intro', () => {
  let populatedApplication: Application;
  let fullApplication: Application;
  let application: object;
  let context: Context;

  beforeAll(async () => {
    context = getKeystoneContext();

    fullApplication = await createFullApplication(context);

    application = mapApplicationIds(fullApplication);

    populatedApplication = await getPopulatedApplication.get({ context, application });
  });

  it('should return an array of mapped fields', () => {
    const { policy } = populatedApplication;

    const result = mapIntro(policy);

    const expected = [
      xlsxRow(String(FIELDS[POLICY_TYPE]), mapPolicyType(policy[POLICY_TYPE])),
      xlsxRow(String(FIELDS[REQUESTED_START_DATE]), formatDate(policy[REQUESTED_START_DATE], DATE_FORMAT.XLSX)),
    ];

    expect(result).toEqual(expected);
  });
});
