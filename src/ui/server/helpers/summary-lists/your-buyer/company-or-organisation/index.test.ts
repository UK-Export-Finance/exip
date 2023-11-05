import generateCompanyOrOrganisationFields, { generateAddressObject, generateContactDetailsObject } from '.';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateMultipleFieldHtml from '../../../generate-multiple-field-html';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import replaceNewLineWithLineBreak from '../../../replace-new-line-with-line-break';
import mockApplication, { mockApplicationBuyer } from '../../../../test-mocks/mock-application';

const { YOUR_BUYER: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { COMPANY_OR_ORGANISATION_CHANGE, COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE },
  },
} = ROUTES;

const {
  COMPANY_OR_ORGANISATION: { NAME, ADDRESS, REGISTRATION_NUMBER, WEBSITE, FIRST_NAME, LAST_NAME, POSITION, EMAIL, CAN_CONTACT_BUYER },
} = FIELD_IDS;

const checkAndChange = false;

describe('server/helpers/summary-lists/your-buyer/company-or-organisation-fields', () => {
  describe('generateAddressObject', () => {
    describe(`when ${ADDRESS} is provided`, () => {
      it('should return a fully populated object', () => {
        const response = generateAddressObject(mockApplicationBuyer);

        const address = replaceNewLineWithLineBreak(mockApplicationBuyer[ADDRESS]);

        const expected = {
          address,
        };

        expect(response).toEqual(expected);
      });
    });
  });

  describe('generateContactDetailsObject', () => {
    describe(`when ${FIRST_NAME} and ${LAST_NAME} are provided`, () => {
      it('should return a fully populated object', () => {
        const response = generateContactDetailsObject(mockApplicationBuyer);

        const fullName = `${mockApplicationBuyer[FIRST_NAME]} ${mockApplicationBuyer[LAST_NAME]}`;
        const expected = {
          name: fullName,
          position: mockApplicationBuyer[POSITION],
          email: mockApplicationBuyer[EMAIL],
        };

        expect(response).toEqual(expected);
      });
    });
  });

  describe('generateCompanyOrOrganisationFields', () => {
    const mockAnswers = mockApplicationBuyer;

    const { referenceNumber } = mockApplication;

    const addressObject = generateAddressObject(mockAnswers);
    const contactDetailsObject = generateContactDetailsObject(mockAnswers);

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
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, FIRST_NAME),
          data: mockAnswers,
          href: generateChangeLink(
            COMPANY_OR_ORGANISATION_CHANGE,
            COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE,
            `#${FIRST_NAME}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        },
        generateMultipleFieldHtml(contactDetailsObject),
      ),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, CAN_CONTACT_BUYER),
          data: mockAnswers,
          href: generateChangeLink(
            COMPANY_OR_ORGANISATION_CHANGE,
            COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE,
            `#${CAN_CONTACT_BUYER}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        },
        mapYesNoField(mockAnswers[CAN_CONTACT_BUYER]),
      ),
    ];

    it('should return fields and values from the submitted data/answers', () => {
      const result = generateCompanyOrOrganisationFields(mockAnswers, referenceNumber, checkAndChange);

      expect(result).toEqual(expectedBase);
    });
  });
});
