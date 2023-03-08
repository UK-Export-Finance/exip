import generateCompanyOrOrganisationFields, { generateAddressObject, generateContactDetailsObject } from '.';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateMultipleFieldHtml from '../../../generate-multiple-field-html';
import mockApplication, { mockApplicationBuyer } from '../../../../test-mocks/mock-application';

const { YOUR_BUYER: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    YOUR_BUYER: { COMPANY_OR_ORGANISATION_CHANGE },
  },
} = ROUTES;

const {
  COMPANY_OR_ORGANISATION: { NAME, ADDRESS, COUNTRY, REGISTRATION_NUMBER, WEBSITE, FIRST_NAME, LAST_NAME, POSITION, EMAIL, CAN_CONTACT_BUYER },
} = FIELD_IDS;

describe('server/helpers/summary-lists/your-buyer/company-or-organisation-fields', () => {
  describe('generateAddressObject', () => {
    describe(`when ${ADDRESS} and ${COUNTRY} are provided`, () => {
      it('should return a fully populated object', () => {
        const response = generateAddressObject(mockApplicationBuyer);

        const expected = {
          address: mockApplicationBuyer[ADDRESS],
          country: mockApplicationBuyer[COUNTRY].name,
        };

        expect(response).toEqual(expected);
      });
    });

    describe(`when ${ADDRESS} is provided but ${COUNTRY} is null`, () => {
      it('should return a populated object', () => {
        mockApplicationBuyer[COUNTRY] = null;

        const response = generateAddressObject(mockApplicationBuyer);

        const expected = {
          address: mockApplicationBuyer[ADDRESS],
          country: undefined,
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
    mockAnswers.country = {
      isoCode: 'GBR',
      name: 'United Kingdom',
    };

    const { referenceNumber } = mockApplication;

    const addressObject = generateAddressObject(mockAnswers);
    const contactDetailsObject = generateContactDetailsObject(mockAnswers);

    const expectedBase = [
      fieldGroupItem({
        field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, NAME),
        data: mockAnswers,
        href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION_CHANGE}#${NAME}-label`,
        renderChangeLink: true,
      }),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, ADDRESS),
          data: mockAnswers,
          href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION_CHANGE}#${ADDRESS}-label`,
          renderChangeLink: true,
        },
        generateMultipleFieldHtml(addressObject),
      ),
      fieldGroupItem({
        field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, REGISTRATION_NUMBER),
        data: mockAnswers,
        href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION_CHANGE}#${REGISTRATION_NUMBER}-label`,
        renderChangeLink: true,
      }),
      fieldGroupItem({
        field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, WEBSITE),
        data: mockAnswers,
        href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION_CHANGE}#${WEBSITE}-label`,
        renderChangeLink: true,
      }),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, FIRST_NAME),
          data: mockAnswers,
          href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION_CHANGE}#${FIRST_NAME}-label`,
          renderChangeLink: true,
        },
        generateMultipleFieldHtml(contactDetailsObject),
      ),
      fieldGroupItem({
        field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, CAN_CONTACT_BUYER),
        data: mockAnswers,
        href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION_CHANGE}#${CAN_CONTACT_BUYER}-label`,
        renderChangeLink: true,
      }),
    ];

    it('should return fields and values from the submitted data/answers', () => {
      mockAnswers.country = {
        isoCode: 'GBR',
        name: 'United Kingdom',
      };

      const result = generateCompanyOrOrganisationFields(mockAnswers, referenceNumber);

      expect(result).toEqual(expectedBase);
    });
  });
});
