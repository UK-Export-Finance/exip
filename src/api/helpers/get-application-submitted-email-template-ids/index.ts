import { ANSWERS, EMAIL_TEMPLATE_IDS } from '../../constants';
import { Application } from '../../types';

const {
  APPLICATION: {
    SUBMISSION: { EXPORTER, UNDERWRITING_TEAM },
  },
} = EMAIL_TEMPLATE_IDS;

const getApplicationSubmittedEmailTemplateIds = (application: Application) => {
  const { buyer, declaration } = application;

  const templateIds = {
    underwritingTeam: '',
    exporter: '',
  };

  const hasAntiBriberyCodeOfConduct = declaration.hasAntiBriberyCodeOfConduct === ANSWERS.YES;

  if (hasAntiBriberyCodeOfConduct) {
    templateIds.exporter = EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY;
  }

  const isConectedWithBuyer = buyer.exporterIsConnectedWithBuyer && buyer.exporterIsConnectedWithBuyer === ANSWERS.YES;

  if (isConectedWithBuyer) {
    templateIds.exporter = EXPORTER.SEND_DOCUMENTS.TRADING_HISTORY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_TRADING_HISTORY;
  }

  if (hasAntiBriberyCodeOfConduct && isConectedWithBuyer) {
    templateIds.exporter = EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY_AND_TRADING_HISTORY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY_AND_TRADING_HISTORY;
  }

  return templateIds;
};

export default getApplicationSubmittedEmailTemplateIds;
