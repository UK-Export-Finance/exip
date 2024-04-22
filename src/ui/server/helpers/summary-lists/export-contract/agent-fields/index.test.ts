import agentFields, { agentDetailsFields, agentServiceFields } from '.';
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
import agentChargesFields from './agent-charges';
import { mockApplication, mockCountries, referenceNumber } from '../../../../test-mocks';

const {
  EXPORT_CONTRACT: { AGENT: FORM_TITLE },
} = FORM_TITLES;

const {
  USING_AGENT,
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
  AGENT_SERVICE: { SERVICE_DESCRIPTION },
} = FIELD_IDS;

const { AGENT_CHANGE, AGENT_CHECK_AND_CHANGE } = EXPORT_CONTRACT_ROUTES;
const { AGENT_DETAILS_CHANGE, AGENT_DETAILS_CHECK_AND_CHANGE } = EXPORT_CONTRACT_ROUTES;
const { AGENT_SERVICE_CHANGE, AGENT_SERVICE_CHECK_AND_CHANGE } = EXPORT_CONTRACT_ROUTES;

describe('server/helpers/summary-lists/export-contract/agent-fields', () => {
  const mockAnswersUsingAgentTrue = {
    ...mockApplication.exportContract.agent,
    [USING_AGENT]: true,
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
            ...agentChargesFields(mockAnswersUsingAgentTrue.service, referenceNumber, mockCountries, checkAndChange),
          ],
        };

        expect(result).toEqual(expected);
      });
    });
  });
});
