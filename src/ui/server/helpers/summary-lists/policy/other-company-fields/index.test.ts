import { generateOtherCompanyFields, optionalOtherCompanyFields } from '.';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import getCountryByIsoCode from '../../../get-country-by-iso-code';
import mockApplication, { referenceNumber } from '../../../../test-mocks/mock-application';
import { mockCountries } from '../../../../test-mocks';

const {
  POLICY: { OTHER_COMPANY: FORM_TITLE },
} = FORM_TITLES;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED, COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE },
} = POLICY_FIELD_IDS;

const {
  POLICY: { ANOTHER_COMPANY_CHANGE, ANOTHER_COMPANY_CHECK_AND_CHANGE, OTHER_COMPANY_DETAILS_CHANGE, OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const { REQUESTED_JOINTLY_INSURED_PARTY } = POLICY_FIELDS;

const {
  policy: { jointlyInsuredParty: mockJointlyInsuredParty },
} = mockApplication;

describe('server/helpers/summary-lists/policy/other-company-fields', () => {
  describe('optionalOtherCompanyFields', () => {
    const checkAndChange = false;

    describe(`${REQUESTED} is true`, () => {
      it('should return fields from the submitted data/answers', () => {
        mockJointlyInsuredParty[REQUESTED] = true;

        const result = optionalOtherCompanyFields(mockJointlyInsuredParty, referenceNumber, mockCountries, checkAndChange);

        const expected = [
          fieldGroupItem({
            field: getFieldById(REQUESTED_JOINTLY_INSURED_PARTY, COMPANY_NAME),
            data: mockJointlyInsuredParty,
            href: generateChangeLink(
              OTHER_COMPANY_DETAILS_CHANGE,
              OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE,
              `#${COMPANY_NAME}-label`,
              referenceNumber,
              checkAndChange,
            ),
            renderChangeLink: true,
          }),
          fieldGroupItem(
            {
              field: getFieldById(REQUESTED_JOINTLY_INSURED_PARTY, COUNTRY_CODE),
              data: mockJointlyInsuredParty,
              href: generateChangeLink(
                OTHER_COMPANY_DETAILS_CHANGE,
                OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE,
                `#${COUNTRY_CODE}-label`,
                referenceNumber,
                checkAndChange,
              ),
              renderChangeLink: true,
            },
            getCountryByIsoCode(mockCountries, mockJointlyInsuredParty[COUNTRY_CODE]).name,
          ),
          fieldGroupItem({
            field: getFieldById(REQUESTED_JOINTLY_INSURED_PARTY, COMPANY_NUMBER),
            data: mockJointlyInsuredParty,
            href: generateChangeLink(
              OTHER_COMPANY_DETAILS_CHANGE,
              OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE,
              `#${COMPANY_NUMBER}-label`,
              referenceNumber,
              checkAndChange,
            ),
            renderChangeLink: true,
          }),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`${REQUESTED} is false`, () => {
      it('should return an empty array', () => {
        mockJointlyInsuredParty[REQUESTED] = false;

        const result = optionalOtherCompanyFields(mockJointlyInsuredParty, referenceNumber, mockCountries, checkAndChange);

        expect(result).toEqual([]);
      });
    });
  });

  describe('generateOtherCompanyFields', () => {
    const checkAndChange = false;

    it('should return a title and fields from the submitted data/answers', () => {
      mockJointlyInsuredParty[REQUESTED] = true;

      const result = generateOtherCompanyFields(mockJointlyInsuredParty, referenceNumber, mockCountries, checkAndChange);

      const expectedFields = [
        fieldGroupItem(
          {
            field: getFieldById(REQUESTED_JOINTLY_INSURED_PARTY, REQUESTED),
            data: mockJointlyInsuredParty,
            href: generateChangeLink(ANOTHER_COMPANY_CHANGE, ANOTHER_COMPANY_CHECK_AND_CHANGE, `#${REQUESTED}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          },
          mapYesNoField(mockJointlyInsuredParty[REQUESTED]),
        ),
        ...optionalOtherCompanyFields(mockJointlyInsuredParty, referenceNumber, mockCountries, checkAndChange),
      ];

      const expected = {
        title: FORM_TITLE,
        fields: expectedFields,
      };

      expect(result).toEqual(expected);
    });
  });
});
