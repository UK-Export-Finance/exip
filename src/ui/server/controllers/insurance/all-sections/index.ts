import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import generateGroupsAndTasks from '../../../helpers/task-list/generate-groups-and-tasks';
import generateTaskList from '../../../helpers/task-list';
import flattenApplicationData from '../../../helpers/flatten-application-data';
import mapApplicationToFormFields from '../../../helpers/mappings/map-application-to-form-fields';
import { Request, ResponseInsurance } from '../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.ALL_SECTIONS;

/**
 * get
 * Render the All sections page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} All sections page
 */
export const get = (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  const { broker, buyer, company, declaration, exportContract, nominatedLossPayee, policy, referenceNumber, totalContractValueOverThreshold } = application;

  const { policyType, jointlyInsuredParty } = policy;

  const {
    isAppointed: isAppointingLossPayee,
    isLocatedInUk: lossPayeeIsLocatedInUk,
    isLocatedInternationally: lossPayeeIsLocatedInternationally,
  } = nominatedLossPayee;

  const {
    finalDestinationKnown,
    privateMarket: { attempted: attemptedPrivateMarketCover },
    agent: {
      isUsingAgent,
      service: {
        agentIsCharging,
        charge: { method: agentChargeMethod },
      },
    },
  } = exportContract;

  const { isUsingBroker, isBasedInUk: brokerIsBasedInUk, fullAddress: brokerFullAddress } = broker;
  const { hasDifferentTradingName } = company;
  const { buyerTradingHistory, relationship } = buyer;
  const { exporterIsConnectedWithBuyer, exporterHasPreviousCreditInsuranceWithBuyer } = relationship;
  const { outstandingPayments, exporterHasTradedWithBuyer } = buyerTradingHistory;
  const { awardMethod } = exportContract;

  const flatApplicationData = flattenApplicationData(application);

  const taskListStructure = generateGroupsAndTasks(
    referenceNumber,
    declaration,
    policyType,
    finalDestinationKnown,
    jointlyInsuredParty.requested,
    isUsingBroker,
    brokerIsBasedInUk,
    brokerFullAddress,
    isAppointingLossPayee,
    lossPayeeIsLocatedInUk,
    lossPayeeIsLocatedInternationally,
    hasDifferentTradingName,
    exporterIsConnectedWithBuyer,
    exporterHasTradedWithBuyer,
    outstandingPayments,
    exporterHasPreviousCreditInsuranceWithBuyer,
    totalContractValueOverThreshold,
    attemptedPrivateMarketCover,
    isUsingAgent,
    agentIsCharging,
    agentChargeMethod,
    awardMethod?.id,
  );

  const taskListData = generateTaskList(taskListStructure, flatApplicationData);

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ALL_SECTIONS,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
    application: mapApplicationToFormFields(application),
    taskListData,
  });
};
