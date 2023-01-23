import generatePolicyAndDateFields, { requestedStartDateChangeLink } from '.';
import { POLICY_AND_EXPORTS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import { mockApplication } from '../../../../test-mocks';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      TYPE_OF_POLICY: { POLICY_TYPE },
      CONTRACT_POLICY: { REQUESTED_START_DATE },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY_AND_EXPORTS: { TYPE_OF_POLICY_CHANGE, SINGLE_CONTRACT_POLICY_CHANGE, MULTIPLE_CONTRACT_POLICY_CHANGE },
  },
} = ROUTES;

describe('server/helpers/summary-lists/policy-and-export/policy-and-date-fields', () => {
  const { referenceNumber } = mockApplication;

  describe('requestedStartDateChangeLink', () => {
    describe('when the policy type is single policy type', () => {
      it('should return renderChangeLink with correct link', () => {
        const result = requestedStartDateChangeLink(FIELD_VALUES.POLICY_TYPE.SINGLE, referenceNumber);

        const expected = {
          renderChangeLink: true,
          href: `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_CHANGE}#${REQUESTED_START_DATE}-label`,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when the policy type is multiple policy type', () => {
      it('should return renderChangeLink with correct link', () => {
        const result = requestedStartDateChangeLink(FIELD_VALUES.POLICY_TYPE.MULTI, referenceNumber);

        const expected = {
          renderChangeLink: true,
          href: `${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_CHANGE}#${REQUESTED_START_DATE}-label`,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when the policy type is not single or multiple', () => {
      it('should render renderChangeLink as false', () => {
        const result = requestedStartDateChangeLink('Mock', referenceNumber);

        const expected = {
          renderChangeLink: false,
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('generatePolicyAndDateFields', () => {
    const mockAnswers = mockApplication.policyAndExport;

    it('should return fields and values from the submitted data/answers', () => {
      const result = generatePolicyAndDateFields(mockAnswers, referenceNumber);

      const expected = [
        fieldGroupItem({
          field: getFieldById(FIELDS, POLICY_TYPE),
          data: mockAnswers,
          href: `${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_CHANGE}#heading`,
          renderChangeLink: true,
        }),
        fieldGroupItem(
          {
            field: getFieldById(FIELDS.CONTRACT_POLICY, REQUESTED_START_DATE),
            ...requestedStartDateChangeLink(mockAnswers[POLICY_TYPE], referenceNumber),
          },
          formatDate(mockAnswers[REQUESTED_START_DATE]),
        ),
      ];

      expect(result).toEqual(expected);
    });
  });
});
