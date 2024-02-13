import generateCompanyOrOrganisationFields from '.';
import generateAddressObject from '../../generate-address-object';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateMultipleFieldHtml from '../../../generate-multiple-field-html';
import generateChangeLink from '../../../generate-change-link';
import mockApplication, { mockApplicationBuyer } from '../../../../test-mocks/mock-application';

const { YOUR_BUYER: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  YOUR_BUYER: { COMPANY_DETAILS: FORM_TITLE },
} = FORM_TITLES;

const {
  INSURANCE: {
    YOUR_BUYER: { COMPANY_OR_ORGANISATION_CHANGE, COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE },
  },
} = ROUTES;

const {
  COMPANY_OR_ORGANISATION: { NAME, ADDRESS, REGISTRATION_NUMBER, WEBSITE },
} = FIELD_IDS;

const checkAndChange = false;

describe('server/helpers/summary-lists/your-buyer/company-or-organisation-fields', () => {
  describe('generateCompanyOrOrganisationFields', () => {
    const mockAnswers = mockApplicationBuyer;
    const mockAddress = mockAnswers[ADDRESS];

    const { referenceNumber } = mockApplication;

    const addressObject = generateAddressObject(mockAddress);

    const expectedBase = [
      fieldGroupItem({
        field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, NAME),
        data: mockAnswers,
        href: generateChangeLink(COMPANY_OR_ORGANISATION_CHANGE, COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      }),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, ADDRESS),
          data: mockAnswers,
          href: generateChangeLink(
            COMPANY_OR_ORGANISATION_CHANGE,
            COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE,
            `#${ADDRESS}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        },
        generateMultipleFieldHtml(addressObject),
      ),
      fieldGroupItem({
        field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, REGISTRATION_NUMBER),
        data: mockAnswers,
        href: generateChangeLink(
          COMPANY_OR_ORGANISATION_CHANGE,
          COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE,
          `#${REGISTRATION_NUMBER}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      }),
      fieldGroupItem({
        field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, WEBSITE),
        data: mockAnswers,
        href: generateChangeLink(
          COMPANY_OR_ORGANISATION_CHANGE,
          COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE,
          `#${WEBSITE}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      }),
    ];

    it('should return fields and values from the submitted data/answers', () => {
      const result = generateCompanyOrOrganisationFields(mockAnswers, referenceNumber, checkAndChange);

      const expected = {
        title: FORM_TITLE,
        fields: expectedBase,
      };

      expect(result).toEqual(expected);
    });
  });
});
