import agentFields, { agentDetailsFields, agentServiceFields, agentServiceChargeFields } from '.';
import { FORM_TITLES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_ROUTES } from '../../../../constants/routes/insurance/export-contract';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import getCountryByIsoCode from '../../../get-country-by-iso-code';
import generateChangeLink from '../../../generate-change-link';
import replaceNewLineWithLineBreak from '../../../replace-new-line-with-line-break';
import { mockApplication, mockCountries, referenceNumber } from '../../../../test-mocks';

const {
  EXPORT_CONTRACT: { AGENT: FORM_TITLE },
} = FORM_TITLES;

const {
  USING_AGENT,
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
  AGENT_SERVICE: { SERVICE_DESCRIPTION, IS_CHARGING },
  AGENT_CHARGES: { FIXED_SUM_AMOUNT, CHARGE_PERCENTAGE, PAYABLE_COUNTRY_CODE },
} = FIELD_IDS;

const {
  AGENT_CHANGE,
  AGENT_CHECK_AND_CHANGE,
  AGENT_DETAILS_CHANGE,
  AGENT_DETAILS_CHECK_AND_CHANGE,
  AGENT_SERVICE_CHANGE,
  AGENT_SERVICE_CHECK_AND_CHANGE,
  AGENT_CHARGES_CHANGE,
  AGENT_CHARGES_CHECK_AND_CHANGE,
} = EXPORT_CONTRACT_ROUTES;

describe('server/helpers/summary-lists/export-contract/agent-fields', () => {
  const mockAnswersUsingAgentTrue = {
    ...mockApplication.exportContract.agent,
    [USING_AGENT]: true,
  };

  const mockAnswersUsingAgentTrueAgentChargingTrue = {
    ...mockAnswersUsingAgentTrue.service,
    [IS_CHARGING]: true,
  };

  const mockAnswersUsingAgentTrueAgentChargingFalse = {
    ...mockAnswersUsingAgentTrue.service,
    [IS_CHARGING]: false,
  };

  const mockAnswersUsingAgentFalse = {
    ...mockApplication.exportContract.agent,
    [USING_AGENT]: false,
  };

  const checkAndChange = false;

  describe('agentDetailsFields', () => {
    it('should return all agent details fields and values', () => {
      const result = agentDetailsFields(mockAnswersUsingAgentTrue, referenceNumber, mockCountries, checkAndChange);

      const expected = [
        fieldGroupItem({
          field: getFieldById(FIELDS.AGENT_DETAILS, NAME),
          data: mockAnswersUsingAgentTrue,
          href: generateChangeLink(AGENT_DETAILS_CHANGE, AGENT_DETAILS_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
          renderChangeLink: true,
        }),
        fieldGroupItem(
          {
            field: getFieldById(FIELDS.AGENT_DETAILS, FULL_ADDRESS),
            data: mockAnswersUsingAgentTrue,
            href: generateChangeLink(AGENT_DETAILS_CHANGE, AGENT_DETAILS_CHECK_AND_CHANGE, `#${FULL_ADDRESS}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          },
          replaceNewLineWithLineBreak(mockAnswersUsingAgentTrue[FULL_ADDRESS]),
        ),
        fieldGroupItem(
          {
            field: getFieldById(FIELDS.AGENT_DETAILS, COUNTRY_CODE),
            data: mockAnswersUsingAgentTrue,
            href: generateChangeLink(AGENT_DETAILS_CHANGE, AGENT_DETAILS_CHECK_AND_CHANGE, `#${COUNTRY_CODE}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          },
          getCountryByIsoCode(mockCountries, mockAnswersUsingAgentTrue[COUNTRY_CODE]).name,
        ),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('agentServiceFields', () => {
    it('should return all agent service fields and values', () => {
      const result = agentServiceFields(mockAnswersUsingAgentTrue.service, referenceNumber, checkAndChange);

      const expected = [
        fieldGroupItem(
          {
            field: getFieldById(FIELDS.AGENT_SERVICE, SERVICE_DESCRIPTION),
            data: mockAnswersUsingAgentTrue,
            href: generateChangeLink(AGENT_SERVICE_CHANGE, AGENT_SERVICE_CHECK_AND_CHANGE, `#${SERVICE_DESCRIPTION}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          },
          replaceNewLineWithLineBreak(mockAnswersUsingAgentTrue.service[SERVICE_DESCRIPTION]),
        ),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('agentServiceChargeFields', () => {
    describe(`when ${IS_CHARGING} is false`, () => {
      it(`should return ${IS_CHARGING} field and value`, () => {
        const result = agentServiceChargeFields(mockAnswersUsingAgentTrueAgentChargingFalse, referenceNumber, mockCountries, checkAndChange);

        const expected = [
          fieldGroupItem({
            field: getFieldById(FIELDS.AGENT_SERVICE, IS_CHARGING),
            data: mockAnswersUsingAgentTrueAgentChargingFalse,
            href: generateChangeLink(AGENT_SERVICE_CHANGE, AGENT_SERVICE_CHECK_AND_CHANGE, `#${IS_CHARGING}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          }),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${IS_CHARGING} is true and ${FIXED_SUM_AMOUNT} is provided`, () => {
      const mockAnswers = {
        ...mockAnswersUsingAgentTrueAgentChargingTrue,
        charge: {
          ...mockAnswersUsingAgentTrueAgentChargingTrue.charge,
          [CHARGE_PERCENTAGE]: null,
          [FIXED_SUM_AMOUNT]: 10,
        },
      };

      it('should return all agent service charge fields and values', () => {
        const result = agentServiceChargeFields(mockAnswers, referenceNumber, mockCountries, checkAndChange);

        const expected = [
          fieldGroupItem({
            field: getFieldById(FIELDS.AGENT_SERVICE, IS_CHARGING),
            data: mockAnswers,
            href: generateChangeLink(AGENT_SERVICE_CHANGE, AGENT_SERVICE_CHECK_AND_CHANGE, `#${IS_CHARGING}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          }),
          fieldGroupItem({
            field: getFieldById(FIELDS.AGENT_CHARGES, FIXED_SUM_AMOUNT),
            data: mockAnswers.charge,
            href: generateChangeLink(AGENT_CHARGES_CHANGE, AGENT_CHARGES_CHECK_AND_CHANGE, `#${FIXED_SUM_AMOUNT}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          }),
          fieldGroupItem(
            {
              field: getFieldById(FIELDS.AGENT_CHARGES, PAYABLE_COUNTRY_CODE),
              data: mockAnswers.charge,
              href: generateChangeLink(AGENT_CHARGES_CHANGE, AGENT_CHARGES_CHECK_AND_CHANGE, `#${PAYABLE_COUNTRY_CODE}-label`, referenceNumber, checkAndChange),
              renderChangeLink: true,
            },
            getCountryByIsoCode(mockCountries, mockAnswers.charge[PAYABLE_COUNTRY_CODE]).name,
          ),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${IS_CHARGING} is true and ${CHARGE_PERCENTAGE} is provided`, () => {
      const mockAnswers = {
        ...mockAnswersUsingAgentTrueAgentChargingTrue,
        charge: {
          ...mockAnswersUsingAgentTrueAgentChargingTrue.charge,
          [FIXED_SUM_AMOUNT]: null,
          [CHARGE_PERCENTAGE]: 10,
        },
      };

      it('should return all agent service charge fields and values', () => {
        const result = agentServiceChargeFields(mockAnswers, referenceNumber, mockCountries, checkAndChange);

        const expected = [
          fieldGroupItem({
            field: getFieldById(FIELDS.AGENT_SERVICE, IS_CHARGING),
            data: mockAnswers,
            href: generateChangeLink(AGENT_SERVICE_CHANGE, AGENT_SERVICE_CHECK_AND_CHANGE, `#${IS_CHARGING}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          }),
          fieldGroupItem({
            field: getFieldById(FIELDS.AGENT_CHARGES, CHARGE_PERCENTAGE),
            data: mockAnswers.charge,
            href: generateChangeLink(AGENT_CHARGES_CHANGE, AGENT_CHARGES_CHECK_AND_CHANGE, `#${CHARGE_PERCENTAGE}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          }),
          fieldGroupItem(
            {
              field: getFieldById(FIELDS.AGENT_CHARGES, PAYABLE_COUNTRY_CODE),
              data: mockAnswers.charge,
              href: generateChangeLink(AGENT_CHARGES_CHANGE, AGENT_CHARGES_CHECK_AND_CHANGE, `#${PAYABLE_COUNTRY_CODE}-label`, referenceNumber, checkAndChange),
              renderChangeLink: true,
            },
            getCountryByIsoCode(mockCountries, mockAnswers.charge[PAYABLE_COUNTRY_CODE]).name,
          ),
        ];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('agentFields', () => {
    describe(`when ${USING_AGENT} is false`, () => {
      it(`should return one ${USING_AGENT} field and value`, () => {
        const result = agentFields(mockAnswersUsingAgentFalse, referenceNumber, mockCountries, checkAndChange);

        const expected = {
          title: FORM_TITLE,
          fields: [
            fieldGroupItem(
              {
                field: getFieldById(FIELDS, USING_AGENT),
                data: mockAnswersUsingAgentFalse,
                href: generateChangeLink(AGENT_CHANGE, AGENT_CHECK_AND_CHANGE, `#${USING_AGENT}-label`, referenceNumber, checkAndChange),
                renderChangeLink: true,
              },
              mapYesNoField(mockAnswersUsingAgentFalse[USING_AGENT]),
            ),
          ],
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${USING_AGENT} is true`, () => {
      it(`should return ${USING_AGENT} and agentDetailsFields`, () => {
        const result = agentFields(mockAnswersUsingAgentTrue, referenceNumber, mockCountries, checkAndChange);

        const expected = {
          title: FORM_TITLE,
          fields: [
            fieldGroupItem(
              {
                field: getFieldById(FIELDS, USING_AGENT),
                data: mockAnswersUsingAgentTrue,
                href: generateChangeLink(AGENT_CHANGE, AGENT_CHECK_AND_CHANGE, `#${USING_AGENT}-label`, referenceNumber, checkAndChange),
                renderChangeLink: true,
              },
              mapYesNoField(mockAnswersUsingAgentTrue[USING_AGENT]),
            ),
            ...agentDetailsFields(mockAnswersUsingAgentTrue, referenceNumber, mockCountries, checkAndChange),
            ...agentServiceFields(mockAnswersUsingAgentTrue.service, referenceNumber, checkAndChange),
            ...agentServiceChargeFields(mockAnswersUsingAgentTrue.service, referenceNumber, mockCountries, checkAndChange),
          ],
        };

        expect(result).toEqual(expected);
      });
    });
  });
});
