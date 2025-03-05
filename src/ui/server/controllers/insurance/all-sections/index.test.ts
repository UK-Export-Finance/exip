import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import generateGroupsAndTasks from '../../../helpers/task-list/generate-groups-and-tasks';
import generateTaskList from '../../../helpers/task-list';
import flattenApplicationData from '../../../helpers/flatten-application-data';
import mapApplicationToFormFields from '../../../helpers/mappings/map-application-to-form-fields';
import { Request, ResponseInsurance } from '../../../../types';
import { mockReq, mockResInsurance, mockApplication } from '../../../test-mocks';

describe('controllers/insurance/all-sections', () => {
  let req: Request;
  let res: ResponseInsurance;

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ALL_SECTIONS);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const { broker, buyer, company, declaration, exportContract, nominatedLossPayee, policy, referenceNumber, totalContractValueOverThreshold } =
        mockApplication;

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

      const flatApplicationData = flattenApplicationData(mockApplication);

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

      const expectedTaskListData = generateTaskList(taskListStructure, flatApplicationData);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ALL_SECTIONS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        taskListData: expectedTaskListData,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.ALL_SECTIONS, expectedVariables);
    });
  });
});
