import getApplicationSubmittedEmailTemplateIds from '.';
import { ANSWERS, EMAIL_TEMPLATE_IDS } from '../../constants';
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
      exporter: EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY_AND_TRADING_HISTORY,
      underwritingTeam: UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY_AND_TRADING_HISTORY,
    };

    expect(result).toEqual(expected);
  });

  describe('when the declaration has an answer of `No` for hasAntiBriberyCodeOfConduct and buyer has exporterHasTradedWithBuyer answer of `Yes`', () => {
    beforeEach(() => {
      application = {
        ...mockApplication,
        declaration: {
          ...mockApplication.declaration,
          hasAntiBriberyCodeOfConduct: ANSWERS.NO,
        },
      };
    });

    test('it should return an object with the correct template IDs', async () => {
      const result = getApplicationSubmittedEmailTemplateIds(application);

      const expected = {
        exporter: EXPORTER.SEND_DOCUMENTS.TRADING_HISTORY,
        underwritingTeam: UNDERWRITING_TEAM.NOTIFICATION_TRADING_HISTORY,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the declaration has an answer of `No` for hasAntiBriberyCodeOfConduct and does NOT have exporterHasTradedWithBuyer', () => {
    beforeEach(() => {
      application = {
        ...mockApplication,
        declaration: {
          ...mockApplication.declaration,
          ...mockApplication.declaration,
          hasAntiBriberyCodeOfConduct: ANSWERS.NO,
        },
        buyer: {
          ...mockApplication.buyer,
          exporterHasTradedWithBuyer: ANSWERS.NO,
        },
      };
    });

    test('it should return an object with the correct, empty template IDs', async () => {
      const result = getApplicationSubmittedEmailTemplateIds(application);

      const expected = {
        exporter: '',
        underwritingTeam: '',
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the declaration has an answer of `Yes` for hasAntiBriberyCodeOfConduct and does NOT have exporterHasTradedWithBuyer', () => {
    beforeEach(async () => {
      application = {
        ...mockApplication,
        declaration: {
          ...mockApplication.declaration,
          hasAntiBriberyCodeOfConduct: ANSWERS.YES,
        },
        buyer: {
          ...mockApplication.buyer,
          exporterHasTradedWithBuyer: ANSWERS.NO,
        },
      };
    });

    test('it should return an object with the correct, empty template IDs', async () => {
      const result = getApplicationSubmittedEmailTemplateIds(application);

      const expected = {
        exporter: EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY,
        underwritingTeam: UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY,
      };

      expect(result).toEqual(expected);
    });
  });
});
