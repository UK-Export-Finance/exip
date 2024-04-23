import agentChargesFields from '.';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_ROUTES } from '../../../../../constants/routes/insurance/export-contract';
import fieldGroupItem from '../../../generate-field-group-item';
import getFieldById from '../../../../get-field-by-id';
import mapYesNoField from '../../../../mappings/map-yes-no-field';
import mapPercentage from '../../../../map-percentage';
import getCountryByIsoCode from '../../../../get-country-by-iso-code';
import generateChangeLink from '../../../../generate-change-link';
import { mockExportContractAgentService, mockCountries, referenceNumber } from '../../../../../test-mocks';

const {
  AGENT_SERVICE: { IS_CHARGING },
  AGENT_CHARGES: { FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE, PAYABLE_COUNTRY_CODE },
} = FIELD_IDS;

const { AGENT_SERVICE_CHANGE, AGENT_SERVICE_CHECK_AND_CHANGE } = EXPORT_CONTRACT_ROUTES;
const { AGENT_CHARGES_CHANGE, AGENT_CHARGES_CHECK_AND_CHANGE } = EXPORT_CONTRACT_ROUTES;

describe('server/helpers/summary-lists/export-contract/agent-fields/agent-charges', () => {
  const mockAnswersChargingTrue = {
    ...mockExportContractAgentService,
    [IS_CHARGING]: true,
  };

  const mockAnswersChargingFalse = {
    ...mockExportContractAgentService,
    [IS_CHARGING]: false,
  };

  const checkAndChange = false;

  describe(`when ${IS_CHARGING} is false`, () => {
    it(`should return ${IS_CHARGING} field and value`, () => {
      const result = agentChargesFields(mockAnswersChargingFalse, referenceNumber, mockCountries, checkAndChange);

      const expected = [
        fieldGroupItem(
          {
            field: getFieldById(FIELDS.AGENT_SERVICE, IS_CHARGING),
            data: mockAnswersChargingFalse,
            href: generateChangeLink(AGENT_SERVICE_CHANGE, AGENT_SERVICE_CHECK_AND_CHANGE, `#${IS_CHARGING}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          },
          mapYesNoField(mockAnswersChargingFalse[IS_CHARGING]),
        ),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${IS_CHARGING} is true and ${FIXED_SUM_AMOUNT} is provided`, () => {
    const mockAnswers = {
      ...mockAnswersChargingTrue,
      charge: {
        ...mockAnswersChargingTrue.charge,
        [PERCENTAGE_CHARGE]: null,
        [FIXED_SUM_AMOUNT]: 10,
      },
    };

    it('should return all agent service charge fields and values', () => {
      const result = agentChargesFields(mockAnswers, referenceNumber, mockCountries, checkAndChange);

      const expected = [
        fieldGroupItem(
          {
            field: getFieldById(FIELDS.AGENT_SERVICE, IS_CHARGING),
            data: mockAnswers,
            href: generateChangeLink(AGENT_SERVICE_CHANGE, AGENT_SERVICE_CHECK_AND_CHANGE, `#${IS_CHARGING}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          },
          mapYesNoField(mockAnswers[IS_CHARGING]),
        ),
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

  describe(`when ${IS_CHARGING} is true and ${PERCENTAGE_CHARGE} is provided`, () => {
    const mockAnswers = {
      ...mockAnswersChargingTrue,
      charge: {
        ...mockAnswersChargingTrue.charge,
        [FIXED_SUM_AMOUNT]: null,
        [PERCENTAGE_CHARGE]: 10,
      },
    };

    it('should return all agent service charge fields and values', () => {
      const result = agentChargesFields(mockAnswers, referenceNumber, mockCountries, checkAndChange);

      const expected = [
        fieldGroupItem(
          {
            field: getFieldById(FIELDS.AGENT_SERVICE, IS_CHARGING),
            data: mockAnswers,
            href: generateChangeLink(AGENT_SERVICE_CHANGE, AGENT_SERVICE_CHECK_AND_CHANGE, `#${IS_CHARGING}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          },
          mapYesNoField(mockAnswers[IS_CHARGING]),
        ),
        fieldGroupItem(
          {
            field: getFieldById(FIELDS.AGENT_CHARGES, PERCENTAGE_CHARGE),
            data: mockAnswers.charge,
            href: generateChangeLink(AGENT_CHARGES_CHANGE, AGENT_CHARGES_CHECK_AND_CHANGE, `#${PERCENTAGE_CHARGE}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          },
          mapPercentage(mockAnswers.charge[PERCENTAGE_CHARGE]),
        ),
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
