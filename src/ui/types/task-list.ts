interface TaskListDataTask {
  href?: string;
  title: string;
  id: string;
  fields: Array<string>;
  dependencies: Array<string>;
  status?: string;
}

type TaskListTask = {
  href?: string;
  title: string;
  id: string;
  status: string;
};

type TaskListDataGroup = {
  title: string;
  hint?: string;
  id: string;
  tasks: Array<TaskListDataTask>;
};

type TaskListGroup = {
  title: string;
  tasks: Array<TaskListTask>;
};

type TaskListData = Array<TaskListDataGroup>;

type TaskList = Array<TaskListGroup>;

interface CreatePrepareApplicationTasksParams {
  referenceNumber: number;
  otherGroups: TaskListData;
  policyType?: string;
  finalDestinationKnown?: boolean;
  jointlyInsuredParty?: boolean;
  isUsingBroker?: boolean;
  isAppointingLossPayee?: boolean;
  lossPayeeIsLocatedInUk?: boolean;
  lossPayeeIsLocatedInternationally?: boolean;
  hasDifferentTradingName?: boolean;
  connectionWithBuyer?: boolean;
  tradedWithBuyer?: boolean;
  outstandingPayments?: boolean;
  hasPreviousCreditInsuranceWithBuyer?: boolean;
  totalContractValueOverThreshold?: boolean;
  attemptedPrivateMarketCover?: boolean;
  isUsingAgent?: boolean;
  agentIsCharging?: boolean;
  agentChargeMethod?: string;
  awardMethodId?: string;
}

export { CreatePrepareApplicationTasksParams, TaskListData, TaskListDataTask, TaskListDataGroup, TaskListGroup, TaskListTask, TaskList };
