import getApplicationSubmittedEmailTemplateIds from '.';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import mockApplication from '../../test-mocks/mock-application';
import { Application } from '../../types';

const {
  APPLICATION: {
    SUBMISSION: { EXPORTER, UNDERWRITING_TEAM },
  },
} = EMAIL_TEMPLATE_IDS;

describe('helpers/get-application-submitted-email-template-ids', () => {
  let application: Application;

  test('it should return an object with the correct template IDs', async () => {
    application = mockApplication;

    const result = getApplicationSubmittedEmailTemplateIds(application);

    const expected = {
      account: EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY_AND_TRADING_HISTORY,
      underwritingTeam: UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY_AND_TRADING_HISTORY,
    };

    expect(result).toEqual(expected);
  });

  describe('when the declaration has an answer of false for hasAntiBriberyCodeOfConduct and buyer has exporterHasTradedWithBuyer answer of `Yes`', () => {
    beforeEach(() => {
      application = {
        ...mockApplication,
        declaration: {
          ...mockApplication.declaration,
          hasAntiBriberyCodeOfConduct: false,
        },
      };
    });

    test('it should return an object with the correct template IDs', async () => {
      const result = getApplicationSubmittedEmailTemplateIds(application);

      const expected = {
        account: EXPORTER.SEND_DOCUMENTS.TRADING_HISTORY,
        underwritingTeam: UNDERWRITING_TEAM.NOTIFICATION_TRADING_HISTORY,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the declaration has an answer of false for hasAntiBriberyCodeOfConduct and does NOT have exporterHasTradedWithBuyer', () => {
    beforeEach(() => {
      application = {
        ...mockApplication,
        declaration: {
          ...mockApplication.declaration,
          ...mockApplication.declaration,
          hasAntiBriberyCodeOfConduct: false,
        },
        buyer: {
          ...mockApplication.buyer,
          exporterHasTradedWithBuyer: false,
        },
      };
    });

    test('it should return an object with only a template ID for underwritingTeam', async () => {
      const result = getApplicationSubmittedEmailTemplateIds(application);

      const expected = {
        account: '',
        underwritingTeam: UNDERWRITING_TEAM.NO_DOCUMENTS,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the declaration has an answer of true for hasAntiBriberyCodeOfConduct and does NOT have exporterHasTradedWithBuyer', () => {
    beforeEach(async () => {
      application = {
        ...mockApplication,
        declaration: {
          ...mockApplication.declaration,
          hasAntiBriberyCodeOfConduct: true,
        },
        buyer: {
          ...mockApplication.buyer,
          exporterHasTradedWithBuyer: false,
        },
      };
    });

    test('it should return an object with the correct, empty template IDs', async () => {
      const result = getApplicationSubmittedEmailTemplateIds(application);

      const expected = {
        account: EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY,
        underwritingTeam: UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY,
      };

      expect(result).toEqual(expected);
    });
  });
});
